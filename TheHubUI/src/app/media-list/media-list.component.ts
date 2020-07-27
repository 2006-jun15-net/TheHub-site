import { Component, OnInit } from '@angular/core';

import {MediaService} from '../media.service';

import {Media} from '../models/media';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  mediaList: Media[] | null = null;

  constructor(private mediaService: MediaService) { }

  getMediasByMediaType(id: number){
    return this.mediaService.getMediaByMediaType(id)
      .then(medias => {
        this.mediaList = medias;
        console.log(this.mediaList);
      })
  }

  ngOnInit(): void {
  }

}
