import { Routes } from '@angular/router';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { AppComponent } from './app.component';
export const routes: Routes = [
    { path: '', redirectTo: '/child1', pathMatch: 'full' },
    {
        path: 'child1',
        component: Child1Component
    },
    { path: 'child1/:index', component: Child1Component },
    {
        path: 'child2',
        component: Child2Component
    }];
