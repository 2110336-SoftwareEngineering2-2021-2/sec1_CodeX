import { Test, TestingModule } from '@nestjs/testing';
import { TutorReqService } from './tutor-req.service';

describe('TutorReqService', () => {
  let service: TutorReqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorReqService],
    }).compile();

    service = module.get<TutorReqService>(TutorReqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
