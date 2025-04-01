import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-professores-list',
  standalone: true,
  imports: [],
  templateUrl: './professores-list.component.html',
  styleUrl: './professores-list.component.scss'
})


export class ProfessoresListComponent {
  lista: Professor[] = [];

  @Input("modoModal") modoModal: boolean = false;
  @Output("retorno") retorno = new EventEmitter();

  ProfessorService = inject(ProfessorService);
  
    constructor() {
      this.findAll();

    }
  
  
    findAll(){
      //DEPOIS EU VOU TER A COMUNICAÇÃO COM O SERVICE 
      this.ProfessorService.findAll().subscribe({
        next: (listaTurmaRetornada) => {
          this.lista = listaTurmaRetornada;
        },
        error: (erro) => {
          alert('Deu erro seu otario!');
        }
      });
    
    }
  
    delete(professor:Professor){
      let indice = this.lista.findIndex(x => {return x.id == professor.id});
      if(confirm('Deseja deletar isso aí?')){
        this.lista.splice(indice, 1); //deletando um objeto na posição INDICE
      }
    }
    selecionar(professor: Professor){
      this.retorno.emit(professor);
    }
}
