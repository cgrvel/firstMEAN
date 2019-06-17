import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {

  enteredValue = '';
  newPost = 'No content';
  onAddpost() {

    this.newPost = this.enteredValue;

  }
}
