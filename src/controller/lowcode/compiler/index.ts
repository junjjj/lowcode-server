import { Controller, Post, Get, Body } from '@nestjs/common';
import { CompilerService } from '../../../service/lowcode/compiler';
import { compile } from './../../../utils/compile';

@Controller('lowcode')
export class CompilerController {
  constructor(private readonly compilerService: CompilerService) {}

  @Post('compile')
  compile(@Body() req): string {
    console.log(req);
    // 进行编译
    const { filename, fileJSON } = req;
    compile(fileJSON);
    return this.compilerService.getCompiler();
  }
}
