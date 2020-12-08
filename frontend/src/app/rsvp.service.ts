import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Rsvp } from './model';

@Injectable()

export class RsvpService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    constructor(private http: HttpClient){ }

    async getAllRsvp(): Promise<Rsvp[]> {
        const res = await this.http.get<any>('http://localhost:3000/api/rsvps')
            .toPromise()
        console.log(res.results);
        
        return res.results as Rsvp[]
    }

    async addRsvp(rsvp: Rsvp):Promise<any> {
        return await this.http.post<any>('http://localhost:3000/api/rsvp',rsvp, this.httpOptions)
            .toPromise()
    }
}