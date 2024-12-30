import { PartialType } from '@nestjs/mapped-types';
import { CreateEngageDto } from './create-engage.dto';

export class UpdateEngageDto extends PartialType(CreateEngageDto) {}
