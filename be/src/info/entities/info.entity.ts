import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type PersonDocument = Person & Document;

@Schema()
export class Person {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  birth: string;

  @Prop()
  passportNumber: string;

  @Prop()
  socialSecurity: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  cardNumber: string;
  @Prop()

  address: string;

  @Prop()
  result: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);

PersonSchema.plugin(mongoosePaginate);
