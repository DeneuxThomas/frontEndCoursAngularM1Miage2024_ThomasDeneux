import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent {
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;

  @Input() assignmentTransmis!: Assignment;

  // Émission d'un événement de suppression vers le parent
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAssignment();

    // affichage de la QueryParams et du Fragment
    console.log('Query Params :');
    console.log(this.route.snapshot.queryParams);
    console.log('Fragment :');
    console.log(this.route.snapshot.fragment);
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => (this.assignment = assignment));
  }

  onSaveAssignment() {
    if (!this.assignment)
      return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined)
      return;
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService.editAssignment(this.assignment).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}
