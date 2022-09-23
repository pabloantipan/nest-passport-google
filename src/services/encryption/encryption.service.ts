import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BinaryLike,
  CipherKey,
  createCipheriv,
  randomBytes,
  scrypt,
} from 'crypto';
import { createDecipheriv } from 'crypto';
import { promisify } from 'util';

// const iv = randomBytes(16);
// const password = 'Password used to generate key';

@Injectable()
export class EncryptionService {
  private password: string;
  private key: CipherKey;
  private iv: BinaryLike;
  private salt = 'salt' as BinaryLike;

  constructor(private configService: ConfigService) {
    this.password = this.configService.get('encryption.password');
    this.iv = randomBytes(16);
    this.setKey();
  }

  private async setKey() {
    this.key = (await promisify(scrypt)(
      this.password,
      this.salt,
      32,
    )) as Buffer;
  }

  public async encrypt(textToEncrypt: BinaryLike): Promise<Buffer> {
    const cipher = createCipheriv('aes-256-ctr', this.key, this.iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return encryptedText;
  }

  public async decrypt(encryptedText: NodeJS.ArrayBufferView) {
    const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decryptedText;
  }
}
