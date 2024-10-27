import { Test, TestingModule } from '@nestjs/testing';
import { YsaController } from './ysa.controller';

describe('YsaController', () => {
  let controller: YsaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YsaController],
    }).compile();

    controller = module.get<YsaController>(YsaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
