import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { Assignment } from '../assignment.model';
import { AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,
    MatCheckboxModule, RouterLink
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  @Input() assignmentTransmis!: Assignment;

  // Émission d'un événement de suppression vers le parent
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    console.log("FILS : constructeur appelé");
  }

  ngOnInit() {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(a => this.assignmentTransmis = a);
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentsService.updateAssignment(this.assignmentTransmis, {checked: true})
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  // Méthode déclenchée lorsqu'on clique sur le bouton Supprimer
  onDeleteAssignment() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
      });

    // this.assignmentTransmis = null;
    this.router.navigate(['/home']);
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
      {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'});
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  protected readonly onclick = onclick;
}
