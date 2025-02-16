import {Component,} from "@angular/core";
import {MenuItem} from "primeng/api";
import {PanelMenuModule} from 'primeng/panelmenu';
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: "app-panel-menu",
  standalone: true,
  imports: [PanelMenuModule, NgIf, AsyncPipe],
  template: `
    <p-panelMenu *ngIf="_authService.isLogged | async" [model]="items" styleClass="w-full"/>
  `
})
export class PanelMenuComponent {

  constructor(
    public _authService: AuthService,
  ) {
  }


  public readonly items: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: ['/home']
    },
    {
      label: 'Produits',
      icon: 'pi pi-list',
      routerLink: ['/products/list']
    },
    {
      label: 'Liste d\'envie',
      icon: 'pi pi-heart-fill',
      routerLink: ['/list-envie']
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      routerLink: ['/contact']
    }
  ]
}
