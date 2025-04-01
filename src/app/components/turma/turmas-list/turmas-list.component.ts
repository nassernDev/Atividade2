import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { TurmaService } from "../../../services/turma.service";
import { Turma } from "../../../models/turma";


@Component({
  selector: 'app-turmas-list',
  standalone: true,
  imports: [],
  templateUrl: './turmas-list.component.html',
  styleUrl: './turmas-list.component.scss'
})
export class TurmasListComponent {

  @Output("retornoTurma") retornoTurma = new EventEmitter();
  @Input("modoModal") modoModal: boolean = false;

  turmaService = inject(TurmaService);
  lista: Turma[] = [];

  constructor() {

    this.findAll();

  }
  findAll() {
    this.turmaService.findAll().subscribe({
      next: (listaTurmaRetornada) => {
        this.lista = listaTurmaRetornada;
      },
      error: (erro) => {
        alert('Deu erro!');
      }
    });
  }

  deleteById(turma: Turma) {

    if (confirm("Deseja deletar" + turma.nome + "?")) {
      this.turmaService.deleteById(turma.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.findAll();
        },
        error: (erro) => {
          alert('Deu erro meu parceiro!');
        }
      });
    }

  }

  selecionarTurma(turma: Turma) {
    this.retornoTurma.emit(turma);

  }

}