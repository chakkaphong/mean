import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, Review } from './location';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Loc8rDataService {
  constructor(private http: HttpClient) {}
  private apiBaseUrl = environment.apiBaseUrl;

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
  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review>{
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    console.log(formData);
    return this.http
    .post(url, formData)
    .toPromise()
    .then(response => response as Review)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong ', error);
    return Promise.reject(error.massage || error);
  }
}
