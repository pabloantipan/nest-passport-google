import { Expose } from 'class-transformer';

export class MciSessionDto {
  @Expose()
  sessionId;

  @Expose()
  terminateOn;
}
