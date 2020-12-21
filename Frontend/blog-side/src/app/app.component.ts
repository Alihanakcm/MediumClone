import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'blog-side';
  ngOnInit() : void{
    document.body.className = "bg";
  }
  ngOnDestroy(): void {
    document.body.className = "";
  }
}
