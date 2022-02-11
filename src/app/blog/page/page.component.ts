import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute, ParamMap, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BloggerService } from '../blogger.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeoService } from 'src/app/services/seo.service';


@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  
  //page: any;
  //pageId: string;
  
  public currentBlog$: Observable<any>;   //take currentBlog value as an Observable


  private blogId: string = '6664790489593253867'; // TO-DO your blog ID.
  private youtubeUrl:string = 'https://www.googleapis.com/blogger/v3'
  private apikey:string = environment.firebaseConfig.apiKey;

  //new
  pageId: string;
  page: Observable<any>;
  currentRoute: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sanitizer: DomSanitizer,
    public http:HttpClient,
    public bloggerService: BloggerService,
    private seo: SeoService,
  ) {
    // this.pageId = this.route.snapshot.paramMap.get('id');
    //this.bloggerService.getBloggerPage().subscribe(page => this.page = page);

    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        console.log('Route change detected');
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.currentRoute = event.url;          
        console.log(event);
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        console.log(event.error);
      }
    });
  }

  // new
  ngOnInit() {
    this.pageId = this.route.snapshot.paramMap.get('id');
    this.page = this.bloggerService.getBloggerPage(this.pageId)
      .pipe(
        tap(page =>
          this.seo.generateTags({
            title: page.title,
            description: page.content,
            // image: cust.photoURL,
          })
        )
      );
  }
  
/*
  // other way
  ngOnInit() {
    this.pageId = this.route.snapshot.paramMap.get('id');
    this.page = this.route.params.pipe(
      switchMap((params: ParamMap) =>
      this.bloggerService.getBloggerPage(params[this.pageId])));
  }
  
  
  */

/*
ngOnChanges() {
  this.pageId = this.route.snapshot.paramMap.get('id');
    this.getPage().subscribe(page => this.page = page);
}

  ngOnInit() {
    this.pageId = this.route.snapshot.paramMap.get('id');
    this.getPage().subscribe(page => this.page = page);
  }*/
  /*
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
  */
}