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
  createdOn: Date;

  @Prop({ default: 5 })
  duration: number;

  @Prop({ default: true })
  alive: boolean;

  @Prop({ required: true })
  terminateOn: Date;
}

export const MciSessionSchema = SchemaFactory.createForClass(MciSession);
