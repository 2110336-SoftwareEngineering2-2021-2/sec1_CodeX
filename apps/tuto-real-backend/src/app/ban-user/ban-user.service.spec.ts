import { Test, TestingModule } from '@nestjs/testing';
import { BanUserService } from './ban-user.service';

describe('BanUserService', () => {
  let service: BanUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BanUserService],
    }).compile();

    service = module.get<BanUserService>(BanUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
