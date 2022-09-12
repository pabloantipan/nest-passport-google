import { UserEntity } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  public create(userEmail: string, userPassword: string): Promise<UserEntity> {
    const user = this.repo.create({ userEmail, userPassword });
    return this.repo.save(user);
  }
}
