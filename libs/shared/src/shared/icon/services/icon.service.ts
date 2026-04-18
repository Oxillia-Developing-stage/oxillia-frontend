import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, tap, shareReplay } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class IconService {
  private icons = new Map<string, string>();

  constructor(private http: HttpClient) {}

  loadIcons(): Observable<void> {
    return this.http
      .get<Record<string, string>>('/assests/icons/manifest.json')
      .pipe(
        switchMap(manifest => {
          const requests = Object.entries(manifest).map(
            ([name, path]) =>
              this.http.get(path, { responseType: 'text' }).pipe(
                tap(svg => this.icons.set(name, svg))
              )
          );

          return forkJoin(requests);
        }),
        map(() => void 0),
        shareReplay(1)
      );
  }

  getIcon(name: string): string | null {
    return this.icons.get(name) ?? null;
  }
}
