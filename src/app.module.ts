import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { handleRetry, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { EngageModule } from './engage/engage.module';
import { Engage } from './engage/entities/engage.entity';
import { TaskModule } from './task/task.module';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryModule } from 'modules/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        ssl: { rejectUnauthorized: false },
        entities: [User, Engage],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EngageModule,
    TaskModule,
    CloudinaryModule
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    this.configureCloudinary();
  }

  private configureCloudinary() {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }
}
