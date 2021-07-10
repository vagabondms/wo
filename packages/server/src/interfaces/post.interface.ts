import { Request } from 'express';
import {} from '@shared/types/request';

export interface UserRequest<T> extends Request {
  body: T;
}
