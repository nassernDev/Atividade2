import { ActivatedRoute, Router } from "@angular/router";
import { TurmaService } from "../../../services/turma.service";
import { Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { Turma } from "../../../models/turma";
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { FormsModule } from "@angular/forms";
import { TurmasListComponent } from "../turmas-list/turmas-list.component";
import { MdbModalModule, MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ProfessoresListComponent } from "../../professor/professores-list/professores-list.component";
import { Professor } from "../../../models/professor";


@Component({
  selector: 'app-turmas-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, TurmasListComponent, ProfessoresListComponent, MdbModalModule],
  templateUrl: './turmas-form.component.html',
  styleUrl: './turmas-form.component.scss'
})
export class TurmasFormComponent {
  roteador = inject(ActivatedRoute);
  turmaService = inject(TurmaService);
  roteadorNovo = inject(Router);

  @ViewChild("modalProfessorList") modalProfessorList!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>;



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
          this.roteadorNovo.navigate(['principal/turmas']);

        },
        error: (erro) => {
          alert('Deu erro! meu amigo ');
        }

      });
    } else {
      this.turmaService.save(this.turma).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteadorNovo.navigate(['principal/turmas']);

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

  retornoProfessorList(professor: Professor) {
    if (this.turma.professores == null)
      this.turma.professores = [];
    this.turma.professores.push(professor);
    this.modalRef.close();

  }

  buscarProfessor() {
    this.modalRef = this.modalService.open(this.modalProfessorList, { modalClass: "modal-xl" })
  }

  deletarProfessor(professor: Professor) {
    let indice = this.turma.professores.findIndex(x => { return x.id == professor.id });
    this.turma.professores.slice(indice, 1);
  }


}
