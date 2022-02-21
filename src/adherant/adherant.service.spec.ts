import { Test, TestingModule } from '@nestjs/testing';
import { AdherantService } from './adherant.service';

describe('AdherantService', () => {
  let service: AdherantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdherantService],
    }).compile();

    service = module.get<AdherantService>(AdherantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
