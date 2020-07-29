import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Media } from '../models/media';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  media: Media | null = null;
  
  constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  

  ngOnInit(): void {
    this.getMediaByMediaId();
  }

  getMediaByMediaId(): void {
    let idString = this.route.snapshot.paramMap.get('id');
    if (idString){
    let id = +idString;
    this.mediaService.getMediaByMediaId(id)
      .then(foundMedia => {
        this.media = foundMedia;
        console.log(this.media);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
