import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignements/assignment.component';
import { AddAssignmentComponent } from './assignements/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignements/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignements/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginAssignmentComponent } from './assignements/login-assignment/login-assignment.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AssignmentsComponent },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginAssignmentComponent },
  { path: 'home', component: AssignmentsComponent },
];
