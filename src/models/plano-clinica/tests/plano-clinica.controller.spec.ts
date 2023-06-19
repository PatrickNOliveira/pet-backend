import { Test, TestingModule } from '@nestjs/testing';
import { PlanoClinicaController } from '../plano-clinica.controller';
import { PlanoClinicaService } from '../plano-clinica.service';

describe('PlanoClinicaController', () => {
  let controller: PlanoClinicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanoClinicaController],
      providers: [PlanoClinicaService],
    }).compile();

    controller = module.get<PlanoClinicaController>(PlanoClinicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
