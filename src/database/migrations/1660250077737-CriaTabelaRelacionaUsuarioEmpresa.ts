import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriaTabelaRelacionaUsuarioEmpresa1660250077737
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'RelacionaUsuarioEmpresa',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'empresaId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'usuarioId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'RelacionaUsuarioEmpresa',
      new TableForeignKey({
        columnNames: ['empresaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Empresas',
      }),
    );
    await queryRunner.createForeignKey(
      'RelacionaUsuarioEmpresa',
      new TableForeignKey({
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuarios',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('RelacionaUsuarioEmpresa');
    const foreignKey = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('empresaId') !== -1 ||
        fk.columnNames.indexOf('usuarioId') !== -1,
    );
    for (let i = 0; i < foreignKey.length; i++) {
      await queryRunner.dropForeignKey(
        'RelacionaUsuarioEmpresa',
        foreignKey[i],
      );
    }
    await queryRunner.dropTable('RelacionaUsuarioEmpresa');
  }
}
