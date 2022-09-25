import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MciSessionDocument = MciSession & Document;

@Schema()
export class MciSession {
  @Prop()
  sessionId: string;

  @Prop()
  userId: string;

  @Prop()
  createdOn: string;

  @Prop()
  duration: number;

  @Prop()
  alive: string;

  @Prop()
  terminatedOn: string;
}

export const MciSessionSchema = SchemaFactory.createForClass(MciSession);
