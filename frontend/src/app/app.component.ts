import {Component, OnInit,} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SplitterModule} from 'primeng/splitter';
import {ToolbarModule} from 'primeng/toolbar';
import {PanelMenuComponent} from "./shared/ui/panel-menu/panel-menu.component";
import {AuthService} from "./core/auth/auth.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {PanierComponent} from "./modules/pages/panier/panier.component";
import {UserComponent} from "./modules/pages/user/user.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, NgIf, AsyncPipe, MatMenuTrigger, MatMenu, MatDivider, MatMenuItem, MatIcon, PanierComponent, UserComponent],
})
export class AppComponent implements OnInit {
  title = "ALTEN SHOP";
  isLogged!: Observable<boolean>;

  constructor(
    public _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isLogged = this._authService.isLogged;
  }


}
