import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let logged = this.userService.loggedIn();
        if (!logged)
            return true;
        this.router.navigate(["login-register"]);
        return false;
    }

}