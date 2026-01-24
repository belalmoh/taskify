import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
