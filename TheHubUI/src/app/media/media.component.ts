import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Media } from '../models/media';
import { MediaService } from '../media.service';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  media: Media | undefined = undefined;
  genre: Genre | undefined = undefined;

  constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
    ) {
      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd)
          {
            this.getMediaByMediaId();
          }
       });
     }



  ngOnInit(): void {
    this.getMediaByMediaId();
  }

  getMediaByMediaId(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
    const id = +idString;
    this.mediaService.getMediaByMediaId(id)
      .then(foundMedia => {
        this.media = foundMedia;
        this.getMediaGenre();
        console.log(this.media);
      });
    }
  }

  getMediaGenre(): void {
    if (this.media)
    {
      this.mediaService.getMediaGenre(this.media.genreId)
      .then(foundGenre => {
        this.genre = foundGenre;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
