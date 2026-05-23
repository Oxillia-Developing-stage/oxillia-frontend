import { Router, ActivatedRoute, RouterOutlet, ActivationEnd } from '@angular/router';
import { AuthRightImg } from './components/auth-right-img/auth-right-img';
import { Component, inject } from '@angular/core';
import { filter, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthRightImg, RouterOutlet, AsyncPipe],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isImgExist = true;
  isReversed$ = this.router.events.pipe(
  startWith(null),
  filter(e => e === null || e instanceof ActivationEnd),
  map(()=>{
    let child = this.route.snapshot.firstChild;
    while(child?.firstChild){
      child = child.firstChild
    }
    this.isImgExist = child?.data?.['img'] ?? true;
    return child?.data?.['reverse'] || false;

  })
)
}
