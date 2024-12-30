import { Injectable } from '@nestjs/common';
import { CreateEngageDto } from './dto/create-engage.dto';
import { UpdateEngageDto } from './dto/update-engage.dto';
import { Engage } from './entities/engage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EngageService {

  constructor(
    @InjectRepository(Engage) private readonly engageRepo:Repository<Engage>, @InjectRepository(User) private readonly userRepo:Repository<User>
  )
  {}
  async create({category, link, description}: CreateEngageDto, id:number) {
     const userValid = await this.userRepo.findOneBy({id})
     console.log(userValid);
     
  }

  findAll() {
    return `This action returns all engage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} engage`;
  }

  update(id: number, updateEngageDto: UpdateEngageDto) {
    return `This action updates a #${id} engage`;
  }

  remove(id: number) {
    return `This action removes a #${id} engage`;
  }
}
