import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rsvp } from '../model';
import { RsvpService } from '../rsvp.service';

@Component({
  selector: 'app-addrsvp',
  templateUrl: './addrsvp.component.html',
  styleUrls: ['./addrsvp.component.css']
})
export class AddrsvpComponent implements OnInit {

  form:FormGroup

  constructor(private fb:FormBuilder, private rsvpSrc: RsvpService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required,Validators.email]),
      phone: new FormControl("", Validators.required),
      status: new FormControl("Count me in!", Validators.required),
    })
  }

  async addRsvp(){
    // console.log(this.form.value);
    let name = this.form.get("name").value;
    let email = this.form.get("email").value;
    let phone = this.form.get("phone").value;
    let status = this.form.get("status").value;

    this.rsvpSrc.addRsvp({name, email, phone, status} as Rsvp)
    
    this.router.navigate([""]);
  }

}
