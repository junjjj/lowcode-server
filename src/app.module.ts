import { Module } from '@nestjs/common';
// 控制器
import { HelloController } from './controller/hello';
import { CompilerController } from './controller/lowcode/compiler';
// 服务
import { HelloService } from './service/hello';
import { CompilerService } from './service/lowcode/compiler';

@Module({
  imports: [],
  controllers: [HelloController, CompilerController],
  providers: [HelloService, CompilerService],
})
export class AppModule {}
