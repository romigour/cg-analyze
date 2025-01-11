import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncateNumber'
})
export class TruncateNumberPipe implements PipeTransform {
    transform(value: number): number {
        return Math.trunc(value * 100) / 100;
    }
}