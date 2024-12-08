import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }, // Redirect default to Upload
  { path: '**', redirectTo: '/upload' }, // Wildcard route
];
