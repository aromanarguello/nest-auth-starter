import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
import { MaterialModule } from './material/material.module';
import { MaterialColorModule } from './material/material-color/material-color.module';
import { MaterialTextureModule } from './material/material-texture/material-texture.module';
import { MaterialUsageModule } from './material/material-usage/material-usage.module';
import { MaterialFinishModule } from './material/material-finish/material-finish.module';
import { ProviderMaterialsModule } from './provider-materials/provider-materials.module';
import { ProviderModule } from './provider/provider.module';
import { MaterialCertificationModule } from './material/material-certification/material-certification.module';
import { UserFavoritesModule } from './user/user-favorites/user-favorites.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { UserProfileModule } from './user/user-profile/user-profile.module';

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
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
    } as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
    ProjectModule,
    MaterialModule,
    MaterialColorModule,
    MaterialTextureModule,
    MaterialUsageModule,
    MaterialFinishModule,
    ProviderMaterialsModule,
    ProviderModule,
    MaterialCertificationModule,
    UserFavoritesModule,
    CartModule,
    CartItemsModule,
    UserProfileModule,
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
