import {Routes} from "@angular/router";
import {HomeComponent} from "./modules/pages/home/home.component";

export const APP_ROUTES: Routes = [
  {
    path: "sign-in",
    data: {
      layout: 'empty'
    },
    loadChildren: () => import("./modules/auth/sign-in/sign-in.routes"),
  },
  {
    path: "sign-up",
    data: {
      layout: 'empty'
    },
    loadChildren: () => import("./modules/auth/sign-up/sign-up.routes"),
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./modules/pages/products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: "list-envie",
    loadChildren: () =>
      import("./modules/pages/list-envie/list-envie.routes").then((m) => m.LIST_ENVIE_ROUTES)
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./modules/pages/contact/contact.routes").then((m) => m.CONTACT_ROUTE)
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: '404-not-found',
    pathMatch: 'full',
    loadChildren: () => import('app/modules/pages/error-404/error-404.routes').then((m) => m.ERROR_404_ROUTE)
  },
  {path: '**', redirectTo: '404-not-found'}
];
