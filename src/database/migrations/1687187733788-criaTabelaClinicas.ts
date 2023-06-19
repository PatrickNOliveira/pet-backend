import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class criaTabelaClinicas1687187733788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Clinicas',
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
            name: 'cpfcnpj',
            type: 'varchar',
            length: '14',
            isNullable: true,
          },
          {
            name: 'inscMunicipal',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '8',
            isNullable: false,
          },
          {
            name: 'logradouro',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'bairro',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cidade',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'complemento',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'uf',
            type: 'char',
            length: '2',
            isNullable: false,
          },
          {
            name: 'numero',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'telefone1',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'telefone2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'telefone3',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'site',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'logo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'usuarioId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'Clinicas',
      new TableForeignKey({
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuarios',
        onDelete: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Clinicas');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('usuarioId') !== -1,
    );
    await queryRunner.dropForeignKey('Clinicas', foreignKey);
    await queryRunner.dropTable('Clinicas');
  }
}
