import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriaTabelaRequisitoSGS1660251126054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'RequisitoSGS',
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
            isNullable: true,
          },
          {
            name: 'EtapaId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'RequisitoSGS',
      new TableForeignKey({
        columnNames: ['EtapaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'EtapasSGS',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('RequisitoSGS');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('EtapaId') !== -1,
    );
    await queryRunner.dropForeignKey('RequisitoSGS', foreignKey);
    await queryRunner.dropTable('RequisitoSGS');
  }
}
