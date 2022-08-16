import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriaTabelaEmpresas1660248366369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Empresas',
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
            name: 'endereco',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cidade',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'estado',
            type: 'varchar',
            isNullable: false,
            length: '11',
          },
          {
            name: 'pais',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'polo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'responsavel',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'telefone',
            type: 'varchar',
            isNullable: false,
            length: '11',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'outrasNormasTenicas',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'statusAptidaoFinal',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Empresas');
  }
}
