import { Pipe } from '@angular/core';

@Pipe({ name:'fill' })
export class FillPipe {
  transform(value) {
    return (new Array(value)).fill(1);
  }
}