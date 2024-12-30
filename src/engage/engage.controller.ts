import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req, UseGuards } from '@nestjs/common';
import { EngageService } from './engage.service';
import { CreateEngageDto } from './dto/create-engage.dto';
import { UpdateEngageDto } from './dto/update-engage.dto';
import { jwtGuards } from 'src/Roles/jwt.guards';

@Controller('engage')
export class EngageController {
  constructor(private readonly engageService: EngageService) {}


@UseGuards(jwtGuards)
  @Post("create")
  create(@Body() createEngageDto: CreateEngageDto,id, @Request() req) {
    return this.engageService.create(createEngageDto,id);
  }

  @Get()
  findAll() {
    return this.engageService.findAll();
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
  remove(@Param('id') id: string) {
    return this.engageService.remove(+id);
  }
}
