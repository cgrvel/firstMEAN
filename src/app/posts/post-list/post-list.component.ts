import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {title : 'First Post', content : 'Harry potter'},
  //   {title : 'Second Post', content : 'Voila'},
  //   {title : 'Third Post', content : 'Dota'},
  // ];
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }
}
