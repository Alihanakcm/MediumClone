import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/entities/post';

@Pipe({
  name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {

  transform(value: Post[], args?: string): Post[] {
    args = args ? args.toLocaleLowerCase() : null;
    return args ? value.filter((p: Post) => p.title.toLocaleLowerCase().indexOf(args) !== -1) : value;
  }

}
