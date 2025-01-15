import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UnauthorizedException, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { dtoId } from 'src/Dto/dto.user';
import { User } from './entities/user.entity';
import { logInDto } from 'src/Dto/logIn.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UserGuard } from 'src/Roles/user.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: logInDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(UserGuard)
  @Post('upload-user-profile-picture')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  async uploadProfilePicture(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    const uploadedImage = await this.userService.uploadToCloudinary(file);
    await this.userService.updateProfilePicture(id, uploadedImage.secure_url);

    return {
      message: 'Profile picture uploaded successfully!',
      url: uploadedImage.secure_url,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: dtoId) {
    return this.userService.findOne(id);
  }

  @Patch(':id/update')
  update(@Param() { id }: dtoId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: dtoId) {
    return this.userService.remove(id);
  }

  @Get('name/:name')
  async searchUserByName(@Param('name') name: string): Promise<User[]> {
    const existingUsers = await this.userService.searchUserByName(name);

    if (existingUsers.length === 0) {
      throw new UnauthorizedException('No users found with this name');
    }

    return existingUsers;
  }
}
