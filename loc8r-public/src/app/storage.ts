import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>
    ('Brower Storage', {
        providedIn: 'root',
        factory:() => localStorage
    });