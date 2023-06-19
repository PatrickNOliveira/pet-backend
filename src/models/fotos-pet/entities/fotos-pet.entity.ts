import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';

@Entity('FotosPet')
export class FotosPet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column('uuid')
  petId: string;

  @ManyToOne(() => Pet, (pet) => pet.fotos)
  @JoinColumn({ name: 'petId' })
  pet: Pet;
}
