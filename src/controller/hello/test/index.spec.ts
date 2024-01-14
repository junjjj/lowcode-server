import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './../../../controller/hello';
import { HelloService } from './../../../service/hello';

describe('HelloController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(HelloController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
