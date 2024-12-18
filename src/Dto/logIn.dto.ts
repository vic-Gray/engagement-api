import { IsEmail, IsNotEmpty } from 'class-validator';

export class logInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
