import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import {Usuario} from "../../usuario/usuario.entity";
import {PlanoClinica} from "../../plano-clinica/entities/plano-clinica.entity";

@Entity('Clinicas')
export class Clinica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 254 })
  nome: string;

  @Column({ length: 14, nullable: true })
  cpfcnpj: string;

  @Column({ length: 254, nullable: true })
  inscMunicipal: string;

  @Column({ length: 8 })
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ length: 2 })
  uf: string;

  @Column()
  numero: string;

  @Column()
  telefone1: string;

  @Column({ nullable: true })
  telefone2: string;

  @Column({ nullable: true })
  telefone3: string;

  @Column({ nullable: true })
  site: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  logo: string;

  @Column('uuid')
  usuarioId: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.clinicas)
  @JoinColumn({ name: 'usuarioid' })
  usuario: Usuario;

  @OneToMany(() => PlanoClinica, (e) => e.clinica)
  planoDesconto?: PlanoClinica[];
}
