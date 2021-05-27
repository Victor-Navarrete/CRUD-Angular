import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from './interfaces/post';
import { PostsService } from './services/posts.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  posts: Array<Post>
  form: FormGroup
  ident: number
  title: string
  body: string

  constructor(private postservice: PostsService) {
    this.posts = new Array<Post>();
    this.title = '';
    this.body = '';
    this.ident = 100;
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.CargarDatosPosts();



  }


  CargarDatosPosts() {
    this.postservice.getAll().subscribe((response) => {
      this.posts = response;


      console.log(response);
    })
  }


  EliminarPost(id: number) {
    this.postservice.delete(id).subscribe((response) => {
      this.posts = this.posts.filter(item => item.id !== id);
    })

  }

  isCreateNewPost: boolean = false;

  isUpdateApost:boolean = false;


  CrearNuevoPost() {
    this.isCreateNewPost = true;
  }

  RegresarHome() {
    this.isCreateNewPost = false;
  }




  get controlForm() {
    return this.form.controls;
  }

  submit() {

    this.title = this.form.get("title")?.value
    this.body = this.form.get("body")?.value

    const post = {
      userId: 11,
      id: this.posts.length,
      title: this.title,
      body: this.body
    }

    this.postservice.create(post).subscribe((response) => {

      this.posts.push(response);
      alert('Publicación creada correctamente!');
      this.RegresarHome();
    })
  }

}


