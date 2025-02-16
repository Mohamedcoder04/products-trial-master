import {Routes} from "@angular/router";
import {ListEnvieComponent} from "./list-envie.component";

export const LIST_ENVIE_ROUTES: Routes = [
  {
    path: "",
    component: ListEnvieComponent,
  },
  {path: "**", redirectTo: "list"},
];
