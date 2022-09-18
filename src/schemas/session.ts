import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MciSessionDocument = MciSession & Document;

@Schema()
export class MciSession {
  @Prop()
  userId: string;

  @Prop()
  CreatedOn: string;

  @Prop()
  duration: string;

  @Prop()
  token: string;
}

export const MciSessionSchema = SchemaFactory.createForClass(MciSession);
