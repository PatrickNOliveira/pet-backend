import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriaTabelaRelacionaEtapaEmpresa1660250968608
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'RelacionaEtapaEmpresa',
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
            name: 'etapaId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'RelacionaEtapaEmpresa',
      new TableForeignKey({
        columnNames: ['empresaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Empresas',
      }),
    );
    await queryRunner.createForeignKey(
      'RelacionaEtapaEmpresa',
      new TableForeignKey({
        columnNames: ['etapaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'EtapasSGS',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('RelacionaEtapaEmpresa');
    const foreignKey = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('empresaId') !== -1 ||
        fk.columnNames.indexOf('etapaId') !== -1,
    );
    for (let i = 0; i < foreignKey.length; i++) {
      await queryRunner.dropForeignKey('RelacionaEtapaEmpresa', foreignKey[i]);
    }
    await queryRunner.dropTable('RelacionaEtapaEmpresa');
  }
}