import { Test, TestingModule } from '@nestjs/testing';
import { FotosPetController } from '../fotos-pet.controller';
import { FotosPetService } from '../fotos-pet.service';

describe('FotosPetController', () => {
  let controller: FotosPetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FotosPetController],
      providers: [FotosPetService],
    }).compile();

    controller = module.get<FotosPetController>(FotosPetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
