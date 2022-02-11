import { Injectable, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  playlistId: string;
  playlistUrl: string;
  safeUrl: any;
  githubUrl: string;

  blogId: string = '6664790489593253867'; // TO-DO your blog ID.
  pageId: string;

  page: any;
  pages: any[] = [];
  posts: any[] = [];

  //new
  customers = null;
  subscription;

  private youtubeUrl:string = 'https://www.googleapis.com/blogger/v3'
  private apikey:string = environment.firebaseConfig.apiKey;

  constructor(
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public http:HttpClient,
  ) {
    this.pageId = this.route.snapshot.paramMap.get('id');

    this.playlistId = this.route.snapshot.paramMap.get('id');
    this.playlistUrl = `https://www.youtube.com/embed/videoseries?list=${this.playlistId}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistUrl);
    this.githubUrl = `https://www.github.com/ethtomars/${this.playlistId}`;
  }

  // 🟢 Specific page from blogger using API.
  // GET PAGE: https://www.googleapis.com/blogger/v3/blogs/4967929378133675647/pages/273541696466681878?key=YOUR-API-KEY
  getBloggerPage(pageId: string) {
    // let url = `${this.youtubeUrl }/blogs/${this.blogId}/pages/${this.pageId}`;
    let url = `${this.youtubeUrl }/blogs/${this.blogId}/pages/${pageId}`;
    let params = new HttpParams();
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log('📋 Page detail:', res);
      let page = res;
      return page;
    }) );
  }

   /*
    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log('📋 Page detail:', res);
      let page: any[] = [];
      for ( let page of res.items ) {
        let snippet = page; // let snippet = video.snippet;
        page.push( snippet );
      }
      return page;
    }) );
    */
  

  // 🟢 List pages from blogger using API.
  // SAMPLE PAGES: https://www.googleapis.com/blogger/v3/blogs/4967929378133675647/pages?key=YOUR-API-KEY
  getBloggerPages() {
    let url = `${ this.youtubeUrl }/blogs/${this.blogId}/pages`;
    let params = new HttpParams();
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log('📋 Page list:', res);
      let pages: any[] = [];
      for ( let page of res.items ) {
        let snippet = page; // let snippet = video.snippet;
        pages.push( snippet );
      }
      return pages;
    }) );
  }

  // 🟢 Posts from blogger using API.
  // GET POST: https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=YOUR-API-KEY
  getBloggerPosts() {
    let url = `${ this.youtubeUrl }/blogs/${this.blogId}/posts`;
    let params = new HttpParams();
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log('📋 Posts:', res);
      let posts: any[] = [];
      for ( let post of res.items ) {
        let snippet = post; // let snippet = video.snippet;
        posts.push( snippet );
      }
      return posts;
    }) );
  }

}