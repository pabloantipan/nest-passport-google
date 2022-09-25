import { IsNumber, IsString } from 'class-validator';

export class CreateMciSessionDto {
  @IsString()
  readonly userId: string;
}
