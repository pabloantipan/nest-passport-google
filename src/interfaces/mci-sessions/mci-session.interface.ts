export interface MciSessionInterface {
  sessionId: string;
  userId: string;
  createdOn: Date;
  duration: number;
  alive: boolean;
  terminateOn: Date;
}
