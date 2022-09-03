import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  userId: number;

  @Expose()
  userEmail: string;
}
