import { Injectable } from '@angular/core';
import {Assignment} from "../assignements/assignment.model";
import {Observable, of} from "rxjs";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {map} from "rxjs/operators";
import {bdInitialAssignments} from "../shared/data";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  backendURL = 'http://localhost:8010/api/assignments';

  constructor(private loggingService:LoggingService, private http: HttpClient) {}

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.backendURL);
  }

  getAssignment(id:number): Observable<Assignment|undefined> {
    return this.http.get<Assignment|undefined>(this.backendURL + '/' + id);
  }

  addAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.backendURL, assignment);
  }

  updateAssignment(assignment: Assignment, event: { checked: boolean }): Observable<string> {
    assignment.rendu = event.checked;
    return this.http.put<string>(`${this.backendURL}/${assignment.id}`, assignment);
  }

  editAssignment(assignment: Assignment | undefined): Observable<Assignment> {
    return this.http.put<Assignment>(this.backendURL, assignment);
  }


  deleteAssignment(assignment: Assignment | undefined): Observable<Assignment> {
    let id = assignment?.id;
    return this.http.delete<Assignment>(`${this.backendURL}/${id}`);
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
      let nouvelleAssignment = new Assignment();
      nouvelleAssignment.id = a.id;
      nouvelleAssignment.nom = a.nom;
      nouvelleAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelleAssignment.rendu = a.rendu;

      this.addAssignment(nouvelleAssignment).subscribe(reponse => {
        console.log(reponse);
      });
    });
  }

  getAssignmentsPagines(page:number, limit:number): Observable<any> {
    return this.http.get<any>(`${this.backendURL}?page=${page}&limit=${limit}`);
  }
}
