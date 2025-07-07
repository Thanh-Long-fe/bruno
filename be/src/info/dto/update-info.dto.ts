import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-info.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
