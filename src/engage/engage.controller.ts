import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req, UseGuards } from '@nestjs/common';
import { EngageService } from './engage.service';
import { CreateEngageDto } from './dto/create-engage.dto';
import { UpdateEngageDto } from './dto/update-engage.dto';
import { jwtGuards } from 'src/Roles/jwt.guards';
import { dtoId } from 'src/Dto/dto.user';

@Controller('engage')
export class EngageController {
  constructor(private readonly engageService: EngageService) {}


  @UseGuards(jwtGuards)
  @Post('create')
  async createEvent(@Body() createEventDto: CreateEngageDto, @Request() req) {
    console.log(req.user);
    return this.engageService.create(createEventDto, req.user);
  
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
