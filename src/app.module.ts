import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeormConfigService } from './database/typeorm-config.service';
import { UserModule } from './user/user.module';
import { configValidationSchema } from './validation/schema.validation';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
