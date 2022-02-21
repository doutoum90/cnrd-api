import { Test, TestingModule } from '@nestjs/testing';
import { AdherantController } from './adherant.controller';
import { AdherantService } from './adherant.service';

describe('AdherantController', () => {
  let controller: AdherantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdherantController],
      providers: [AdherantService],
    }).compile();

    controller = module.get<AdherantController>(AdherantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
