import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriaTabelaUsuarios1660248781902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Usuarios',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sobrenome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'enum',
            enum: ['Pessoa física', 'Pessoa Jurídica'],
          },
          {
            name: 'nascimento',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'cpfcnpj',
            type: 'varchar',
            length: '14',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'senha',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'rg',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'conjugue',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'comoConheceu',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'codigoRecuperarSenha',
            type: 'char',
            length: '6',
            isNullable: true,
          },
          {
            name: 'codigoSenhaExpiracao',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'mercadoPagoId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'escopo',
            type: 'enum',
            enum: ['Clinica', 'Cliente', 'Admin'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Usuarios');
  }
}
