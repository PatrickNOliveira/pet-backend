import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class criaTabelaTelefones1687186233366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Telefones',
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
            name: 'codigoRecuperarSenha',
            type: 'char',
            length: '2',
            isNullable: false,
          },
          {
            name: 'numero',
            type: 'varchar',
            length: '9',
            isNullable: false,
          },
          {
            name: 'nomeContato',
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
      'Telefones',
      new TableForeignKey({
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuarios',
        onDelete: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Telefones');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('usuarioId') !== -1,
    );
    await queryRunner.dropForeignKey('Telefones', foreignKey);
    await queryRunner.dropTable('Telefones');
  }
}
