import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let encryptionService: EncryptionService;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(async () => {
    mockConfigService = {
      get: (key: string) => {
        return `mocking this password ${key}`;
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        EncryptionService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    encryptionService = module.get(EncryptionService);
  });

  it('should be defined', () => {
    expect(encryptionService).toBeDefined();
  });

  it('should encrypt and decrypt text', async () => {
    const textToTest = 'oli';
    const encryptedText = await encryptionService.encrypt(textToTest);
    const decryptedText = await encryptionService.decrypt(encryptedText);
    expect(decryptedText).toEqual(textToTest);
  });
});
