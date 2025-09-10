import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core'
import {
  provideRouter,
  withInMemoryScrolling,
  type InMemoryScrollingFeature,
  type InMemoryScrollingOptions,
} from '@angular/router'
import { provideAnimations } from '@angular/platform-browser/animations'
import { routes } from './app.routes'
import { FakeBackendProvider } from './core/helpers/fake-backend'
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http'
import { JwtInterceptor } from './core/helpers/jwt.interceptor'
import { ErrorInterceptor } from './core/helpers/error.interceptor'
import { provideEffects } from '@ngrx/effects'
import { AuthenticationEffects } from './store/authentication/authentication.effects'
import { provideStore } from '@ngrx/store'
import { rootReducer } from './store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { environment } from '@/environments/environment'

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);



// Scroll
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
}

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig)

export const appConfig: ApplicationConfig = {
  providers: [
    // FakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeature),
    provideStore(rootReducer),
    provideEffects(AuthenticationEffects),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(),
  ],
}
