import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from "primeng/config";
import {provideHttpClient} from "@angular/common/http";
import MyTheme from './theme';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: MyTheme,
              options: {
                  darkModeSelector: '.my-app-dark'
              }
          }
        })
    ],
};
