import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  userEmail: string;

  @IsString()
  @IsOptional()
  userPassword;
}
