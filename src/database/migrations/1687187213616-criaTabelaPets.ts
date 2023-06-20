import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class criaTabelaPets1687187213616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Pets',
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
            name: 'nascimento',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'pelagem',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'corPelagem',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'especie',
            type: 'enum',
            enum: ['Cachorro', 'Gato'],
          },
          {
            name: 'raca',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'castrado',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'vivo',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'microchip',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'obs',
            type: 'text',
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
      'Pets',
      new TableForeignKey({
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuarios',
        onDelete: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Pets');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('usuarioId') !== -1,
    );
    await queryRunner.dropForeignKey('Pets', foreignKey);
    await queryRunner.dropTable('Pets');
  }
}
