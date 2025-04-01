import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';
import { Turma } from '../models/turma';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor() { }

  http = inject(HttpClient);

  API = 'http://localhost:8080/api/professor'

  findAll(): Observable<Professor[]>{
    return this.http.get<Professor[]> (this.API + "/findAll")
  }

    deleteById (id: number): Observable<string>{
  
     return this.http.delete<string>(this.API+"/delete/" +id, {responseType: "text" as "json"})
  
    }
  
    save (professor : Professor): Observable<string>{
      return this.http.post<string>(this.API + "/save", professor,{responseType: "text" as "json"})
    }
  
    update (professor : Professor, id: number): Observable<string>{
      return this.http.put<string>(this.API + "/update/" + id, professor,{responseType: "text" as "json"})
    }
  
    findById (id: number): Observable<Professor>{
  
      return this.http.get<Professor>(this.API+"/findById/" +id)
   
     }
}
