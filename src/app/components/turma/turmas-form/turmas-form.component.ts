import { ActivatedRoute } from "@angular/router";
import { TurmaService } from "../../../services/turma.service";
import { Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { Turma } from "../../../models/turma";
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { FormsModule } from "@angular/forms";
import { TurmasListComponent } from "../turmas-list/turmas-list.component";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";


@Component({
  selector: 'app-turmas-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, TurmasListComponent],
  templateUrl: './turmas-form.component.html',
  styleUrl: './turmas-form.component.scss'
})
export class TurmasFormComponent {
  roteador = inject(ActivatedRoute);
  turmaService = inject(TurmaService);

 

  turma: Turma = new Turma();

  constructor() {

    let id = this.roteador.snapshot.params['id']
    if (id > 0) {
      this.findById(id);
    }

  }

  save() {
    if (this.turma.id > 0) {
      this.turmaService.update(this.turma, this.turma.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);

        },
        error: (erro) => {
          alert('Deu erro! meu amigo ');
        }

      });
    } else {
      this.turmaService.save(this.turma).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador;

        },
        error: (erro) => {
          alert('Deu erro!');

        }
      });
    }

  }

  findById(id: number) {

    this.turmaService.findById(id).subscribe({
      next: (turmaRetornado) => {
        this.turma = turmaRetornado;
      },
      error: (erro) => {
        alert(erro.error)
      }
    });

  }

 
}
