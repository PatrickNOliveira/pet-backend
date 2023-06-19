import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class criaTabelaPlanoClinica1687188250266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PlanoClinica',
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
            name: 'planoID',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'desconto',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'clinicaId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'PlanoClinica',
      new TableForeignKey({
        columnNames: ['planoID'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Planos',
        onDelete: 'cascade',
      }),
    );
    await queryRunner.createForeignKey(
      'PlanoClinica',
      new TableForeignKey({
        columnNames: ['clinicaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Clinicas',
        onDelete: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('PlanoClinica');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('planoId') !== -1,
    );
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('clinicaId') !== -1,
    );
    await queryRunner.dropForeignKey('PlanoClinica', foreignKey);
    await queryRunner.dropForeignKey('PlanoClinica', foreignKey2);
    await queryRunner.dropTable('PlanoClinica');
  }
}
