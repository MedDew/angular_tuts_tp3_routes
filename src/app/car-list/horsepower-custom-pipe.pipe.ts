import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horsepowerCustomPipe'
})
export class HorsepowerCustomPipePipe implements PipeTransform {

  transform(value: any, unit: string = "ch"): string 
  {
    return unit.toLowerCase() == "kw" ? Math.floor(value * 0.7457) + " kW" : value + " Ch.";
  }

}
