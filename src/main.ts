import 'zone.js';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { config } from 'rxjs';

if (environment.production) {
  enableProdMode();
}

config.onUnhandledError = (err) => {
  console.error('Unhandled RxJS error:', err);
};

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
})
  .then(() => console.log('App bootstrapped'))
  .catch(err => console.error('Bootstrap error:', err));
