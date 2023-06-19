import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class criaTabelaFotosPet1687187552490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'FotosPet',
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
            name: 'url',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'petId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'FotosPet',
      new TableForeignKey({
        columnNames: ['petId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Pets',
        onDelete: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('FotosPet');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('petId') !== -1,
    );
    await queryRunner.dropForeignKey('FotosPet', foreignKey);
    await queryRunner.dropTable('FotosPet');
  }
}
