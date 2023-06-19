import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class criaTabelaEnderecos1687186433227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Enderecos',
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
            name: 'usuarioId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'Enderecos',
      new TableForeignKey({
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuarios',
        onDelete: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Enderecos');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('usuarioId') !== -1,
    );
    await queryRunner.dropForeignKey('Enderecos', foreignKey);
    await queryRunner.dropTable('Enderecos');
  }
}
