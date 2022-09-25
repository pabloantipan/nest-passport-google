import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MciSessionDocument = MciSession & Document;

@Schema()
export class MciSession {
  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  createdOn: string;

  @Prop({ default: 5 })
  duration: number;

  @Prop({ default: true })
  alive: string;

  @Prop({ required: true })
  terminateOn: string;

  @Prop({ default: false })
  multiSessionAllowed: boolean;

  @Prop({ default: 1 })
  maxSessionsLimit: number;
}

export const MciSessionSchema = SchemaFactory.createForClass(MciSession);
