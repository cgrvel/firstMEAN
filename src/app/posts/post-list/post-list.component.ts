import { Component, Input } from '@angular/core';

@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']
})

export class PostListComponent {

  // posts = [
  //   {title : 'First Post', content : 'Harry potter'},
  //   {title : 'Second Post', content : 'Voila'},
  //   {title : 'Third Post', content : 'Dota'},
  // ];
  @Input() posts = [];
}
