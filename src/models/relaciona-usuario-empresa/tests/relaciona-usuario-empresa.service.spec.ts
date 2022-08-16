import { Test, TestingModule } from '@nestjs/testing';
import { RelacionaUsuarioEmpresaService } from '../relaciona-usuario-empresa.service';

describe('RelacionaUsuarioEmpresaService', () => {
  let service: RelacionaUsuarioEmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelacionaUsuarioEmpresaService],
    }).compile();

    service = module.get<RelacionaUsuarioEmpresaService>(
      RelacionaUsuarioEmpresaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
