interface User {
    id: string;
    name: string;
    email: string;
}

class UserStorage {
    private user: User | null = null;

    getUser() {
        const user = localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
        }
        return this.user;
    }

    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
    }

    clearUser() {
        localStorage.removeItem('user');
        this.user = null;
    }
}

export const userStorage = new UserStorage();