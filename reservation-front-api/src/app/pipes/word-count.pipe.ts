import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordCount'
})
export class WordCountPipe implements PipeTransform {

  transform(value: string): string 
  {
    let count =0;
    for (let i = 0; i < value.length; i++) 
    {
      const words = value.trim().split(/\s+/);
      const count = words.length;
      
    }
    return count.toString();
  }

}
