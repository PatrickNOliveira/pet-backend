import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RelacionaUsuarioEmpresa')
export class Empresa {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('uuid')
  empresaId: string;

  @Column('uuid')
  usuarioId: string;
}
