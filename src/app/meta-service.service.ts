import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  constructor(@Inject(DOCUMENT) private dom) { }


}
