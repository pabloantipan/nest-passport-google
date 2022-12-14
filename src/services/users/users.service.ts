import { UserEntity } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  public findOne(userId: number): Promise<UserEntity> {
    if (!userId) {
      return null;
    }
    return this.repo.findOne({ where: { userId } });
  }

  public find(userEmail: string) {
    return this.repo.find({
      where: { userEmail },
    });
  }
}
