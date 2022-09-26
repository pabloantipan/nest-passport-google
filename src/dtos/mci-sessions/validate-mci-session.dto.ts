import { IsString } from 'class-validator';

export class ValidateMciSessionDto {
  @IsString()
  readonly token: string;
}
