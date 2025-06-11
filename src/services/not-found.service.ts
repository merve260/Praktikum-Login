import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotFoundService {
  notFound: Record<string, any> = {};
}
