import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { handleRetry, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EngageModule } from './engage/engage.module';
import { Engage } from './engage/entities/engage.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     JwtModule.register({
        secret:"1234",
        signOptions:{expiresIn:"1d"},
        global:true
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
        entities: [User,Engage], 
        autoLoadEntities: true, 
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EngageModule,
  
  ],
  providers: []
})
export class AppModule {}
