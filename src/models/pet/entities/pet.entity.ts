import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EspecieAnimal } from '../../../common/types/EspecieAnimal';
import { Usuario } from '../../usuario/usuario.entity';
import { FotosPet } from '../../fotos-pet/entities/fotos-pet.entity';

@Entity('Pets')
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numero: string;

  @Column({ type: 'date', nullable: true })
  nascimento: Date;

  @Column()
  pelagem: string;

  @Column()
  corPelagem: string;

  @Column({
    type: 'enum',
    enum: EspecieAnimal,
  })
  especie: EspecieAnimal;

  @Column()
  raca: string;

  @Column({ default: false })
  castrado: boolean;

  @Column({ default: true })
  vivo: boolean;

  @Column()
  microchip: string;

  @Column({ type: 'text', nullable: true })
  obs: string;

  @Column('uuid')
  usuarioId: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.pets)
  @JoinColumn({ name: 'usuarioid' })
  usuario: Usuario;

  @OneToMany(() => FotosPet, (e) => e.pet)
  fotos?: FotosPet[];
}
