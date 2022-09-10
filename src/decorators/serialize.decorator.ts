import { SerializeInterceptor } from '@interceptors/serialize.interceptor';
import { UseInterceptors } from '@nestjs/common';

interface ClassConstructor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (...args: any[]): {};
}

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
