import { Module } from '@nestjs/common';
import { HelloController } from './controller/hello';
import { HelloService } from './service/hello';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class AppModule {}
