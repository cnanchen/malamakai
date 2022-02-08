import { Component } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  pageId: string;
  playlistUrl: string;
  safeUrl: any;
  githubUrl: string;
  blogId: string = '6664790489593253867'; // TO-DO your blog ID.

  videos: any;

  private youtubeUrl:string = 'https://www.googleapis.com/blogger/v3'
  private apikey:string = environment.firebaseConfig.apiKey;

  constructor(
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public http:HttpClient,
  ) {
    this.pageId = this.route.snapshot.paramMap.get('id');
    //this.playlistUrl = `https://www.youtube.com/embed/videoseries?list=${this.playlistId}`;
    // this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistUrl);
    //this.githubUrl = `https://www.github.com/ethtomars/${this.playlistId}`;
    this.getPages().subscribe(videos => this.videos = videos);
  }

  // SAMPLE PAGES: https://www.googleapis.com/blogger/v3/blogs/4967929378133675647/pages?key=YOUR-API-KEY
  // SPECIFIC PAGE: https://www.googleapis.com/blogger/v3/blogs/4967929378133675647/pages/273541696466681878?key=YOUR-API-KEY

  // SAMPLE POST: https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=YOUR-API-KEY

  getPages() {
    let url = `${this.youtubeUrl }/blogs/${this.blogId}/pages/${this.pageId}`;
    let params = new HttpParams();

    //params = params.append('part', 'snippet');
    //params = params.append('maxResults', '100');
    // params = params.append('/pages', this.pageId);
    //params = params.append('blogs', this.blogId);
    // params = params.append('pages', '');
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log('📋 Blog', res);
      let videos = res;
      /*
      for ( let video of res.items ) {
        let snippet = video; // let snippet = video.snippet;
        videos.push( snippet );
      }
      */
      return videos;
    }) );

  }

}
