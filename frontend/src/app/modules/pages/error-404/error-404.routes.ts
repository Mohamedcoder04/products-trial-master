import {Routes} from "@angular/router";
import {Error404Component} from "./error-404.component";

export const ERROR_404_ROUTE: Routes = [
  {
    path: '',
    component: Error404Component,
  },
] as Routes;
