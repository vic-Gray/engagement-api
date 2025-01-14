import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EngageService } from './engage.service';
import { CreateEngageDto } from './dto/create-engage.dto';
import { UpdateEngageDto } from './dto/update-engage.dto';
import { jwtGuards } from 'src/Roles/jwt.guards';
import { dtoId } from 'src/Dto/dto.user';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('engage')
export class EngageController {
  constructor(private readonly engageService: EngageService) {}


  @UseGuards(jwtGuards)
  @Post('create')
  async createEvent(@Body() createEventDto: CreateEngageDto, @Request() req) {
    console.log('Authenticated User:', { id: req.user.id, email: req.user.email });
    return this.engageService.create(createEventDto, req.user);
  }
  

   @UseGuards(jwtGuards)
     @Post('upload-engage-profile-picture')
     @UseInterceptors(FileInterceptor('image', {
       storage: diskStorage({
         destination: './uploads/profile-pictures', 
         filename: (req, file, cb) => {
           const ext = extname(file.originalname);
           const fileName = `${req.params.id}-${Date.now()}${ext}`;
           cb(null, fileName);
         }
       }),
       fileFilter: (req, file, cb) => {
     
         if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
           return cb(new Error('Only image files are allowed!'), false);
         }
         cb(null, true);
       }
     }))
     async uploadProfilePicture(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
       const profilePictureUrl = `/uploads/profile-pictures/${file.filename}`;
       await this.engageService.updateProfilePicture(id, profilePictureUrl);
       return {
         message: 'Profile picture uploaded successfully!',
         url: profilePictureUrl,
       };
     }

  @Get()
  indAllEngagement() {
    return this.engageService.findAllEngagement();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEngageDto: UpdateEngageDto) {
    return this.engageService.update(+id, updateEngageDto);
  }

  @Delete(':id')
  remove(@Param() {id}: dtoId, ) {
    return this.engageService.remove(id);
  }
}
