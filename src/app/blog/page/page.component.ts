import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BloggerService } from '../blogger.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  
  page: any;
  pageId: string;
  
  public currentBlog$: Observable<any>;   //take currentBlog value as an Observable


  private blogId: string = '6664790489593253867'; // TO-DO your blog ID.
  private youtubeUrl:string = 'https://www.googleapis.com/blogger/v3'
  private apikey:string = environment.firebaseConfig.apiKey;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sanitizer: DomSanitizer,
    public http:HttpClient,
    public bloggerService: BloggerService,
  ) {
    this.pageId = this.route.snapshot.paramMap.get('id');
    this.bloggerService.getBloggerPage().subscribe(page => this.page = page);

  }

  ngOnInit() {
    let myBlogId = this.route.snapshot.paramMap.get('blogId');
    this.currentBlog$ = this.route.params.pipe(
      switchMap((params: ParamMap) =>
      this.getPage(params['blogId'])));}
    
    /*
    const currentBlog = this.route.params.pipe(
      switchMap(params => {
        this.getPage(params[id]).subscribe(page => this.page = page);
        this.bloggerService.getBloggerPage(params[id]).subscribe(page => this.page = page); // this.blogpostService.getSingleBlogInformation(params[id]);
      })
    )
    */
  }

/*
ngOnChanges() {
  this.pageId = this.route.snapshot.paramMap.get('id');
    this.getPage().subscribe(page => this.page = page);
}

  ngOnInit() {
    this.pageId = this.route.snapshot.paramMap.get('id');
    this.getPage().subscribe(page => this.page = page);
  }*/
  
  getPage() {
    let url = `${this.youtubeUrl }/blogs/${this.blogId}/pages/${this.pageId}`;
    let params = new HttpParams();
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log('📋 Page detail inside:', res);
      let page = res;
      return page;
    }) );
  }
}