import { Module } from '@nestjs/common';
import { EngageService } from './engage.service';
import { EngageController } from './engage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engage } from './entities/engage.entity';
import { User } from 'src/user/entities/user.entity';
import { jwtGuards } from 'src/Roles/jwt.guards';
import { JwtStrategy } from 'src/sratagies/jwt.stratagy';

@Module({
  imports:[TypeOrmModule.forFeature([Engage, User])],
  controllers: [EngageController],
  providers: [EngageService,JwtStrategy],
})
export class EngageModule {}
