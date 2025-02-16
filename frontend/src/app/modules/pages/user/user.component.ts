import {Component} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatMenuTrigger,
    NgIf,
    MatIcon,
    MatIconButton,
    NgClass,
    MatMenu,
    MatDivider,
    MatMenuItem
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(
    private _authService: AuthService,
  ) {
  }

  signOut() {
    this._authService.signOut();
  }
}
