import { Test, TestingModule } from '@nestjs/testing';
import { CopyController } from './copy.controller';

describe('CopyController', () => {
  let controller: CopyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CopyController],
    }).compile();

    controller = module.get<CopyController>(CopyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
