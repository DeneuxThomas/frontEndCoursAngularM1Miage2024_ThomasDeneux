import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Assignment } from './assignment.model';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import {AssignmentsService} from "../shared/assignments.service";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, NonRenduDirective,
    MatButtonModule,
    MatListModule, MatDividerModule,
    RouterLink
  ],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentsComponent implements OnInit {

  page:number = 1;
  limit:number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  titre = "Liste des assignments";
  boutonDesactive = false;

  // Assignment sur lequel on a cliqué
  assignmentSelectionne!: Assignment;

  // Pour afficher ou non le formulaire ou la liste
  formVisible = false;

  assignments!: Assignment[];

  // Injection du service
  constructor(private assigmentsService: AssignmentsService) {
    console.log("constructeur appelé")
  }

  ngOnInit() {
    //this.getAssignments();
    this.assigmentsService.getAssignmentsPagines(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    });
  }

  getAssignments() {
    this.assigmentsService.getAssignments().subscribe(
      (assignments) => {
        this.assignments = assignments;
      }
    );
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  testeClick(a: any) {
    console.log("click  sur : " + a.nom);
  }

  peuplerBD() {
    this.assigmentsService.peuplerBD();
  }

  assignmentClique(a: Assignment) {
    console.log("Assignment cliqué : " + a.nom);
    this.assignmentSelectionne = a;
  }

  onAddAssignmentBtnClick() {
    console.log("Bouton Add Assignment cliqué");
    //this.formVisible = true;
  }

  //addAssignment(event: Assignment) {
    //this.assigmentsService.addAssignment(event)
      //.subscribe(message => console.log(message));
    //this.formVisible = false;
  //}

  // Méthode pour supprimer un assignment
  onDeleteAssignment(assignment: Assignment) {
    console.log("Suppression du devoir : " + assignment.nom);
    this.assignments = this.assignments.filter(a => a !== assignment);
    // On déselectionne l'assignment supprimé
    this.assignmentSelectionne = undefined!;
  }

  goToFirstPage() {
    this.page = 1;
    this.loadAssignments();
  }

  goToPrevPage() {
    if (this.hasPrevPage) {
      this.page = this.prevPage;
      this.loadAssignments();
    }
  }

  goToNextPage() {
    if (this.hasNextPage) {
      this.page = this.nextPage;
      this.loadAssignments();
    }
  }

  goToLastPage() {
    this.page = this.totalPages;
    this.loadAssignments();
  }

  loadAssignments() {
    this.assigmentsService.getAssignmentsPagines(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadAssignments();
  }


}
