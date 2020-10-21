import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, Review } from './location';
import { environment } from 'src/environments/environment';
import { Authresponse } from './authresponse';
import { User } from './user';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Loc8rDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) {}
  private apiBaseUrl = environment.apiBaseUrl;
  
  public login(user: User): Promise<Authresponse>{
    return this.makeAuthApiCall('login', user);
  }
  public register(user: User): Promise<Authresponse>{
    return this.makeAuthApiCall('register', user);
  }
  private makeAuthApiCall(urlPath: string, user: User): Promise<Authresponse>{
    console.log(`apibase: ${this.apiBaseUrl}`);
    console.log(user);
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
    .post(url, user)
    .toPromise()
    .then(response => response as Authresponse)
    .catch(this.handleError);
  }
  public getLocations(lat: number, lng: number): Promise<Location[]> {
    // code
    const maxDistance: number = 20000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Location[])
      .catch(this.handleError);
  }
  public getLocationByid(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    console.log(`this is locationId: ${locationId}`)
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Location)
      .catch(this.handleError);
  }

  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as Review)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong ', error);
    return Promise.reject(error.massage || error);
  }
}
