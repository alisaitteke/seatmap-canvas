import { Routes } from '@angular/router';
import { ComponentExampleComponent } from './examples/component-example/component-example.component';
import { DirectiveExampleComponent } from './examples/directive-example/directive-example.component';
import { ServiceExampleComponent } from './examples/service-example/service-example.component';

export const routes: Routes = [
  { path: '', redirectTo: '/component', pathMatch: 'full' },
  { path: 'component', component: ComponentExampleComponent },
  { path: 'directive', component: DirectiveExampleComponent },
  { path: 'service', component: ServiceExampleComponent },
];
