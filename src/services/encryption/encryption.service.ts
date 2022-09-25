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
    this.password = this.configService.get('SESSION_ENCRYPTION_PASSWORD');
    this.salt = this.configService.get('SESSION_ENCRYPTION_SALT') as BinaryLike;
    this.iv = Buffer.from(
      this.configService.get('SESSION_ENCRYPTION_IV').toString(),
      'hex',
    );
  }

  public async setKey() {
    this.key = (await promisify(scrypt)(
      this.password,
      this.salt,
      32,
    )) as Buffer;
  }

  public async encryptToBuffer(textToEncrypt: BinaryLike): Promise<Buffer> {
    const cipher = createCipheriv('aes-256-ctr', this.key, this.iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return encryptedText;
  }

  public async decryptToBuffer(
    encryptedText: NodeJS.ArrayBufferView,
  ): Promise<string> {
    const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decryptedText.toString();
  }

  public async encrypt(textToEncrypt: BinaryLike): Promise<string> {
    return (await this.encryptToBuffer(textToEncrypt)).toString('hex');
  }

  public async decrypt(encryptedText: string) {
    return await this.decryptToBuffer(Buffer.from(encryptedText, 'hex'));
  }

  public async encryptRandomly(
    textToEncrypt: BinaryLike,
  ): Promise<[string, string]> {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-ctr', this.key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return [encryptedText.toString('hex'), iv.toString('hex')];
  }

  public async decryptRandomly(
    encryptedText: string,
    iv: string,
  ): Promise<string> {
    const decipher = createDecipheriv(
      'aes-256-ctr',
      this.key,
      Buffer.from(iv, 'hex'),
    );
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);

    return decryptedText.toString();
  }

  public generateIV(): string {
    return randomBytes(16).toString('hex');
  }
}
