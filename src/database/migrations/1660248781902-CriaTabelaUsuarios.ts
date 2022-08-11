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
          },
          {
            name: 'Nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Telefone',
            type: 'varchar',
            isNullable: false,
            length: '10',
          },
          {
            name: 'Email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Login',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Senha',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'Escopo',
            type: 'enum',
            enum: ['GestorSGS', 'ConsultorSGS', 'AuditorMasterSGS'],
          },
          {
            name: 'RefreshToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'EmpresaId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Usuarios',
      new TableForeignKey({
        columnNames: ['EmpresaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Empresas',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Usuarios');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('EmpresaId') !== -1,
    );
    await queryRunner.dropForeignKey('Usuarios', foreignKey);
    await queryRunner.dropTable('Usuarios');
  }
}
