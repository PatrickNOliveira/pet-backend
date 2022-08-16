import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UsuarioModule } from './models/usuario/usuario.module';
import { EmpresaModule } from './models/empresa/empresa.module';
import { APP_PIPE } from '@nestjs/core';
import { RelacionaUsuarioEmpresaModule } from './models/relaciona-usuario-empresa/relaciona-usuario-empresa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsuarioModule,
    EmpresaModule,
    RelacionaUsuarioEmpresaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
