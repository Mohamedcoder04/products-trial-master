import {Component, OnInit} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule],
})
export class HomeComponent implements OnInit {
  public readonly appTitle = "ALTEN SHOP";

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this._authService.isLogged.subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this._router.navigate(['sign-in'])
      }
    })
  }


}
