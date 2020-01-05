import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private  _authorizationService: AuthorizationService, private _router: Router) {
  }

  canActivate(): boolean {
    if (this._authorizationService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

}
