import { Component, OnInit } from '@angular/core';
import { Rsvp } from '../model';
import { RsvpService } from '../rsvp.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

  rsvp: Rsvp[] = []

  constructor(private rsvpSvc: RsvpService) { }

  ngOnInit(): void {
    this.getRsvp();
  }

  async getRsvp(){
    this.rsvp = await this.rsvpSvc.getAllRsvp();
  }

}
