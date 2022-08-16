import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriaTabelaUsuarios1660248781902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Usuarios',
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
            name: 'telefone',
            type: 'varchar',
            isNullable: false,
            length: '11',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'login',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'senha',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'escopo',
            type: 'enum',
            enum: ['GestorSGS', 'ConsultorSGS', 'AuditorMasterSGS'],
          },
          {
            name: 'refreshToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'empresaId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Usuarios',
      new TableForeignKey({
        columnNames: ['empresaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Empresas',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Usuarios');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('empresaId') !== -1,
    );
    await queryRunner.dropForeignKey('Usuarios', foreignKey);
    await queryRunner.dropTable('Usuarios');
  }
}
