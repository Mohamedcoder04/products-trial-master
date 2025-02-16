import {enableProdMode, importProvidersFrom} from "@angular/core";

import {registerLocaleData} from "@angular/common";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import localeFr from "@angular/common/locales/fr";
import {BrowserModule, bootstrapApplication} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {APP_ROUTES} from "app/app.routes";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {AppComponent} from "./app/app.component";
import {environment} from "./environments/environment";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideIcons} from "./app/core/icons/icons.provider";
import {provideAuth} from "./app/core/auth/auth.provider";
import {provideToastr} from "ngx-toastr";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideIcons(),
    provideAuth(),
    provideToastr({
      timeOut: 8000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    }),
    provideRouter(APP_ROUTES),
    ConfirmationService,
    MessageService,
    DialogService, provideAnimationsAsync(),
  ],
}).catch((err) => console.log(err));

registerLocaleData(localeFr, "fr-FR");
