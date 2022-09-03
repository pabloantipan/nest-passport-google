import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  userEmail: string;
  @IsString()
  userPassword: string;
}
