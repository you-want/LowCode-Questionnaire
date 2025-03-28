import { Test, TestingModule } from '@nestjs/testing';
import { FormdataService } from './formdata.service';

describe('FormdataService', () => {
  let service: FormdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormdataService],
    }).compile();

    service = module.get<FormdataService>(FormdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
