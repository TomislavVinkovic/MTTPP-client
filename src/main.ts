import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// line added in order for tests to fire
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
