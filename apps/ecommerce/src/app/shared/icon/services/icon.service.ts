import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class IconService {
  private icons = new Map<string, string>();
  private manifest: Record<string, string> | null = null;
  private readonly pendingIcons = new Map<string, Observable<string | null>>();

  constructor(private http: HttpClient) {}

  loadManifest(): Observable<void> {
    if (this.manifest) {
      return of(void 0);
    }

    return this.http.get<Record<string, string>>('/assests/icons/manifest.json').pipe(
      tap((manifest) => {
        this.manifest = manifest;
      }),
      map(() => void 0),
    );
  }

  loadIcon(name: string): Observable<string | null> {
    const cached = this.icons.get(name);
    if (cached) {
      return of(cached);
    }

    const pending = this.pendingIcons.get(name);
    if (pending) {
      return pending;
    }

    const iconPath = this.manifest?.[name];
    if (!iconPath) {
      return of(null);
    }

    const request$ = this.http.get(iconPath, { responseType: 'text' }).pipe(
      tap((svg) => this.icons.set(name, svg)),
      catchError(() => of(null)),
      finalize(() => this.pendingIcons.delete(name)),
    );

    this.pendingIcons.set(name, request$);
    return request$;
  }

  getIcon(name: string): string | null {
    return this.icons.get(name) ?? null;
  }
}
