import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MciSessionDocument = MciSession & Document;

@Schema()
export class MciSession {
  @Prop()
  sessionId: number;

  @Prop()
  userId: string;

  @Prop()
  CreatedOn: string;

  @Prop()
  duration: string;

  @Prop()
  secretId: number;

  @Prop()
  token: string;

  @Prop()
  alive: string;

  @Prop()
  terminatedOn: string;
}

export const MciSessionSchema = SchemaFactory.createForClass(MciSession);
