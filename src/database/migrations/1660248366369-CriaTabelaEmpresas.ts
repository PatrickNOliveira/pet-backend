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
          },
          {
            name: 'Nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Endereco',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Cidade',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Estado',
            type: 'varchar',
            isNullable: false,
            length: '2',
          },
          {
            name: 'Pais',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Polo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Responsavel',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Telefone',
            type: 'varchar',
            isNullable: false,
            length: '10',
          },
          {
            name: 'Email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'OutrasNormasTecnicas',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'StatusAptidaoFinal',
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
