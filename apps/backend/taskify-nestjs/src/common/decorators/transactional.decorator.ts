import { getConnection } from 'typeorm';

/**
 * Transactional decorator
 * Wraps a method in a database transaction
 * Automatically commits on success, rolls back on error
 * 
 * @param repositoryKey - The name of the repository property in the service (default: 'repository')
 * 
 * Usage:
 * @Transactional('userRepository')
 * async myMethod() { ... }
 * 
 * Or with default:
 * @Transactional()
 * async myMethod() { ... }
 */
export function Transactional(repositoryKey: string = 'repository') {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            // Get the repository from the service instance
            const repository = this[repositoryKey];

            if (!repository) {
                throw new Error(
                    `@Transactional decorator: Repository property '${repositoryKey}' not found in service. ` +
                    `Make sure your service has a property named '${repositoryKey}'.`
                );
            }

            const queryRunner = repository.manager.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                // Store original repository
                const originalRepo = this[repositoryKey];

                // Create a proxy repository that uses the transaction manager
                this[repositoryKey] = {
                    ...originalRepo,
                    create: (...createArgs: any[]) => originalRepo.create(...createArgs),
                    save: async (...saveArgs: any[]) => queryRunner.manager.save(...saveArgs),
                    findOne: async (...findArgs: any[]) => queryRunner.manager.findOne(...findArgs),
                    find: async (...findArgs: any[]) => queryRunner.manager.find(...findArgs),
                    remove: async (...removeArgs: any[]) => queryRunner.manager.remove(...removeArgs),
                    delete: async (...deleteArgs: any[]) => queryRunner.manager.delete(...deleteArgs),
                    update: async (...updateArgs: any[]) => queryRunner.manager.update(...updateArgs),
                    manager: queryRunner.manager,
                };

                // Execute the original method
                const result = await originalMethod.apply(this, args);

                // Commit transaction
                await queryRunner.commitTransaction();

                // Restore original repository
                this[repositoryKey] = originalRepo;

                return result;
            } catch (error) {
                // Rollback transaction on error
                await queryRunner.rollbackTransaction();
                throw error;
            } finally {
                // Release query runner
                await queryRunner.release();
            }
        };

        return descriptor;
    };
}
