import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plano } from '../../plano/entities/plano.entity';
import { Clinica } from '../../clinica/entities/clinica.entity';

@Entity('PlanoClinica')
export class PlanoClinica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  planoID: string;

  @Column('decimal')
  desconto: number;

  @Column('uuid')
  clinicaId: string;

  @ManyToOne(() => Plano, (pet) => pet.descontoClinica)
  @JoinColumn({ name: 'planoId' })
  plano: Plano;

  @ManyToOne(() => Clinica, (pet) => pet.planoDesconto)
  @JoinColumn({ name: 'clinicaId' })
  clinica: Clinica;
}
