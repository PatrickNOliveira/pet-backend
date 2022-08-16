import { Test, TestingModule } from '@nestjs/testing';
import { RelacionaUsuarioEmpresaController } from '../relaciona-usuario-empresa.controller';

describe('RelacionaUsuarioEmpresaController', () => {
  let controller: RelacionaUsuarioEmpresaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelacionaUsuarioEmpresaController],
    }).compile();

    controller = module.get<RelacionaUsuarioEmpresaController>(
      RelacionaUsuarioEmpresaController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
