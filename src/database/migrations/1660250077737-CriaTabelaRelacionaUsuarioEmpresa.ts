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
            name: 'EmpresaId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'UsuarioId',
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
        columnNames: ['EmpresaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Empresas',
      }),
    );
    await queryRunner.createForeignKey(
      'RelacionaUsuarioEmpresa',
      new TableForeignKey({
        columnNames: ['UsuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuarios',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('RelacionaUsuarioEmpresa');
    const foreignKey = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('EmpresaId') !== -1 ||
        fk.columnNames.indexOf('UsuarioId') !== -1,
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
