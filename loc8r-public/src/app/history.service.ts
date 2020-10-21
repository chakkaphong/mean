import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private urls: string[] = [];
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((routerEvent) => routerEvent instanceof NavigationEnd))
      .subscribe((routerEvent: NavigationEnd) => {
        const url = routerEvent.urlAfterRedirects;
        this.urls = [...this.urls, url];
      });
  }
  public getPreviousUrl(): string {
    const lenght = this.urls.length;
    return lenght > 1 ? this.urls[lenght - 2] : '/';
  }
  public getLastNonLoginUrl(): string {
    const exclude: string[] = ['/register', '/login'];
    const filtered = this.urls.filter((url) => !exclude.includes(url));
    const lenght = filtered.length;
    return lenght > 1 ? filtered[lenght - 1] : '/';
  }
}
