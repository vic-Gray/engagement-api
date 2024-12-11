import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';

@Module({
  imports: [UserModule, 
  
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'), 
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'), 
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'), 
        ssl: { rejectUnauthorized: false },
       entities:[User],
        autoLoadEntities: true,
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
  ],
  providers: []
})
export class AppModule {}
