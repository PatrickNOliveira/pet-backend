import { Test, TestingModule } from '@nestjs/testing';
import { PlanoClinicaService } from '../plano-clinica.service';

describe('PlanoClinicaService', () => {
  let service: PlanoClinicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanoClinicaService],
    }).compile();

    service = module.get<PlanoClinicaService>(PlanoClinicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
