import { Test, TestingModule } from '@nestjs/testing';
import { TutorReqController } from './tutor-req.controller';

describe('TutorReqController', () => {
  let controller: TutorReqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorReqController],
    }).compile();

    controller = module.get<TutorReqController>(TutorReqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
