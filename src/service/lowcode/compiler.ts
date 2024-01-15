import { Injectable } from '@nestjs/common';

@Injectable()
export class CompilerService {
  getCompiler(): string {
    return '低代码!';
  }
}
