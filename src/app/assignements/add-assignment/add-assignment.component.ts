import { Component, /*EventEmitter, Output*/ } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AssignmentsService} from "../../shared/assignments.service";
import { FormsModule } from '@angular/forms';
import { Assignment } from '../assignment.model';
import { Router} from "@angular/router";

@Component({
  selector: 'app-form-assignment',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule,
    FormsModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
  providers: [provideNativeDateAdapter()],
})
export class AddAssignmentComponent {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();

  nomDevoir = '';
  dateDeRendu = null;

  constructor(private assignmentsService: AssignmentsService,
              private router: Router) {
    console.log("constructeur appelé");
  }


  onSubmit(event: any) {
    if (this.nomDevoir === '' || this.dateDeRendu === null) return;

    console.log("Nom du devoir : " + this.nomDevoir);
    console.log("Date de rendu du devoir : " + this.dateDeRendu);

    const a = new Assignment();
    a.id = Math.floor(Math.random() * 10000);
    a.nom = this.nomDevoir;
    a.dateDeRendu = this.dateDeRendu;
    a.rendu = false;

    // on le rajoute au tableau
    //this.assignments.push(a);

    // this.nouvelAssignment.emit(a);
    this.assignmentsService.addAssignment(a)
      .subscribe(message => {console.log(message)});

    this.router.navigate(['/home']);
  }
}
