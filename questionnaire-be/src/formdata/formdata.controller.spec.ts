import { Test, TestingModule } from '@nestjs/testing';
import { FormdataController } from './formdata.controller';

describe('FormdataController', () => {
  let controller: FormdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormdataController],
    }).compile();

    controller = module.get<FormdataController>(FormdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
