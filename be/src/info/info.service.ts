import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person, PersonDocument } from './entities/info.entity';
import { PaginateModel } from 'mongoose';
import { UpdatePersonDto } from './dto/update-info.dto';
import { CreatePersonDto } from './dto/create-info.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person.name)
    private personModel: PaginateModel<PersonDocument>,
  ) {}

  async create(dto: CreatePersonDto): Promise<Person> {
    const existing = await this.personModel.findOne({ code: dto.code }).exec();
    if (existing) throw new BadRequestException('Mã đã tồn tại');
    const person = new this.personModel(dto);
    return person.save();
  }

  async findAll(page = 1, limit = 10) {
    return this.personModel.paginate({}, { page, limit });
  }

  async findOne(id: string): Promise<Person> {
    const person = await this.personModel.findById(id).exec();
    if (!person) throw new NotFoundException('Person not found');
    return person;
  }
  async updateResult(result: string): Promise<any> {
    const updated = await this.personModel
      .updateMany({}, { result }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Person not found');
    return updated;
  }

  async getResult(code: string): Promise<any> {
    const result = await this.personModel.findOne({ code: code }).exec();
    if (!result) throw new NotFoundException('Person not found');
    return result;
  }

  async update(id: string, dto: UpdatePersonDto): Promise<Person> {
    const updated = await this.personModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Person not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.personModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Person not found');
    return { message: 'Deleted successfully' };
  }
}
