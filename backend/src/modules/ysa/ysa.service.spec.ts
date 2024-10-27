import { Test, TestingModule } from '@nestjs/testing';
import { YsaService } from './ysa.service';

describe('YsaService', () => {
  let service: YsaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YsaService],
    }).compile();

    service = module.get<YsaService>(YsaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
