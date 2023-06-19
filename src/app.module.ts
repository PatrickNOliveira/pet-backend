import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UsuarioModule } from './models/usuario/usuario.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { ClinicaModule } from './models/clinica/clinica.module';
import { TelefoneModule } from './models/telefone/telefone.module';
import { EnderecoModule } from './models/endereco/endereco.module';
import { PetModule } from './models/pet/pet.module';
import { FotosPetModule } from './models/fotos-pet/fotos-pet.module';
import { PlanoClinicaModule } from './models/plano-clinica/plano-clinica.module';
import { PlanoModule } from './models/plano/plano.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsuarioModule,
    AuthModule,
    ClinicaModule,
    TelefoneModule,
    EnderecoModule,
    PetModule,
    FotosPetModule,
    PlanoModule,
    PlanoClinicaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
