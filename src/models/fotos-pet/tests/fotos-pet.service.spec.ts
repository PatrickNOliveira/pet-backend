import { Test, TestingModule } from '@nestjs/testing';
import { FotosPetService } from '../fotos-pet.service';

describe('FotosPetService', () => {
  let service: FotosPetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotosPetService],
    }).compile();

    service = module.get<FotosPetService>(FotosPetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
