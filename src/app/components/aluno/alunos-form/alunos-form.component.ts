import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Aluno } from '../../../models/aluno';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../../services/aluno.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TurmasListComponent } from '../../turma/turmas-list/turmas-list.component';
import { Turma } from '../../../models/turma';

@Component({
  selector: 'app-alunos-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, TurmasListComponent],
  templateUrl: './alunos-form.component.html',
  styleUrl: './alunos-form.component.scss'
})
export class AlunosFormComponent {


  @Input("aluno") aluno: Aluno = new Aluno();
  @Output("retorno") retorno = new EventEmitter();
  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  alunoService = inject(AlunoService);

  @ViewChild("modalTurmaList") modalTurmaList!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois 


  constructor() {
    let id = this.rotaAtivida.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {

    this.alunoService.findById(id).subscribe({
      next: (alunoRetornado) => {
        this.aluno = alunoRetornado;
      },
      error: (erro) => {
        alert(erro.error)
      }
    });

  }

  save() {
    if (this.aluno.id > 0) {
      // UPDATE
      this.alunoService.update(this.aluno, this.aluno.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['principal/alunos']);
          this.retorno.emit(this.aluno);

        },
        error: (erro) => {
          alert(erro.error)
        }
      });


    } else {
      // SAVE
      this.alunoService.save(this.aluno).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['principal/alunos']);
          this.retorno.emit(this.aluno);

        },
        error: (erro) => {
          alert(erro.error)
        }
      });


    }
  }

  buscarTurma() {
    this.modalRef = this.modalService.open(this.modalTurmaList)
  }

  retornoTurmaList(turma: Turma) {
    this.aluno.turma = turma;
    this.modalRef.close();

  }

}
