import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'makePositive'
})
export class MakePositivePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    if(value < 0){
      return -value
    } else if(value == 0){
      return 1
    } else {
      return value
    }
  }

}
