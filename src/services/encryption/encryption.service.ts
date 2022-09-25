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

@Injectable()
export class EncryptionService {
  private password: string;
  private key: CipherKey;
  private iv: BinaryLike;
  private salt: BinaryLike;

  constructor(private configService: ConfigService) {
    this.password = this.configService.get('ENCRYPTION_PASSWORD');
    this.salt = this.configService.get('ENCRYPTION_SALT') as BinaryLike;
    this.iv = randomBytes(16);
  }

  public async setKey() {
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

  public async decrypt(encryptedText: NodeJS.ArrayBufferView): Promise<string> {
    const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decryptedText.toString();
  }

  public async encryptToLegibleString(
    textToEncrypt: BinaryLike,
  ): Promise<string> {
    return (await this.encrypt(textToEncrypt)).toString('hex');
  }

  public async decryptLegibleString(encryptedText: string) {
    return await this.decrypt(Buffer.from(encryptedText, 'hex'));
  }
}
