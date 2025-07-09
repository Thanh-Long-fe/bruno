import { IsNotEmpty, IsString } from 'class-validator';


export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsString()
  birth?: string;

  @IsString()
  passportNumber?: string;

  @IsString()
  socialSecurity?: string;

  @IsString()
  phoneNumber?: string;

  @IsString()
  cardNumber?: string;

  @IsString()
  address?: string;

  @IsString()
  result?: string;

  @IsString()
  status?: string;

  @IsString()
  note?: string;
}
