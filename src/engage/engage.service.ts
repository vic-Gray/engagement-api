import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
  
  async create({ link, category, description }: CreateEngageDto, user: any) {
    console.log('User from JWT:', { id: user.id, email: user.email });
  
    const userValid = await this.userRepo.findOneBy({ id: user.id });
    if (!userValid) {
      throw new UnauthorizedException('User not found');
    }
  
    console.log('User from Database:', { id: userValid.id, email: userValid.email });
  

    if (userValid.role !== 'ADMIN') {
      throw new ForbiddenException('You do not have permission to create this event');
    }
  

    const newEvent = this.engageRepo.create({
      link,
      category,
      description,
      user: userValid,
    });
  
    const latest = await this.engageRepo.save(newEvent);
  
    console.log('Saved Event:', { id: latest.id, category: latest.category, link: latest.link });
  
    return {
      userProfile: [userValid.firstName, userValid.email],
      latest,
    };
  }
  
  

  async updateProfilePicture(id: number, profilePictureUrl: string) {
   const engagement  = await this.engageRepo.findOneBy({id})
      if(!engagement){
        throw new NotFoundException('Engagement not found');
      }
     
      engagement.engagementPhoto= profilePictureUrl;  

      await this.engageRepo.save(engagement);

      return {
        message: 'Profile picture updated successfully!',
        url: profilePictureUrl,
      };
  }

  async findAllEngagement() {
    return await this.engageRepo.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} engage`;
  }

  update(id: number, updateEngageDto: UpdateEngageDto) {
    return `This action updates a #${id} engage`;
  }

 async remove(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const user = await this.engageRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.engageRepo.delete({ id });

    return {
      message: ' engagement has been deleted successfully',
    };
  }
}
