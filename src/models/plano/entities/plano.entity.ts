import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PlanoClinica } from '../../plano-clinica/entities/plano-clinica.entity';

@Entity('Planos')
export class Plano {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column('decimal')
  valor: number;

  @Column()
  idMercadoPago: string;

  @OneToMany(() => PlanoClinica, (e) => e.plano)
  descontoClinica?: PlanoClinica[];
}
