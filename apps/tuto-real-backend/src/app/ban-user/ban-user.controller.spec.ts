import { Test, TestingModule } from '@nestjs/testing';
import { BanUserController } from './ban-user.controller';

describe('BanUserController', () => {
  let controller: BanUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BanUserController],
    }).compile();

    controller = module.get<BanUserController>(BanUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
