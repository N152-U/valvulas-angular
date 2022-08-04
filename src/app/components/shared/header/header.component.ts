/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AfterContentInit, Component, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../models/user/user.module';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';
import { NgxPermissionsService, NgxRolesService } from "ngx-permissions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  hasUser: boolean = false;
  appVersion: string = '';
  appAlias: string = '';
  constructor(
    public user: UserModel,
    private router: Router,
    private auth: AuthService,
    private ps: NgxPermissionsService,
  ) {
    
    this.auth.getUserLoggedInData.subscribe((data) => {
  
      if (data) {
        this.user=data;
        this.hasUser = true;
      } else {
        this.hasUser = false;
        this.auth.logOut();
      }
    });
  }

  permissions$ = this.ps.permissions$;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.auth.getUserLoggedInData.unsubscribe();
  }

  logOut() {
    this.user=null;
   /*  this.auth.getUserLoggedInData.unsubscribe(); */
    this.hasUser = false;
    this.auth.logOut();
  }
}