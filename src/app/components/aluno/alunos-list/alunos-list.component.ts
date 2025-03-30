import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { AlunosFormComponent } from '../alunos-form/alunos-form.component';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../../services/aluno.service';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  imports: [FormsModule, AlunosFormComponent, MdbModalModule],
  templateUrl: './alunos-list.component.html',
  styleUrl: './alunos-list.component.scss'
})
export class AlunosListComponent {

  alunoEdit!: Aluno;
  lista: Aluno[] = [];
  pesquisa: string = "";
  ///elementos da modal
  @ViewChild("modalAlunoForm") modalAlunoForm!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois 

  alunoService = inject(AlunoService);

  constructor() {
    this.findAll();
  }


  findAll() {

    this.alunoService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: (erro) => {
        alert(erro.error)
      }
    });
  }

  delete(aluno: Aluno) {
    if (confirm('Deseja deletar isso aí?')) {

      this.alunoService.delete(aluno.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.findAll();
        },
        error: (erro) => {
          alert(erro.error)
        }
      });

    }
  }


  findByNome() {

    this.alunoService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert(erro.error);
      }
    })

  }

  new() { //ABRIRRRRRRRRRRRRRRRRRR
    this.alunoEdit = new Aluno();//limpando o carroEdit para um novo cadastro
    this.modalRef = this.modalService.open(this.modalAlunoForm, { modalClass: 'modal-xl' });
  }

  editar(aluno: Aluno) {
    this.alunoEdit = aluno;
    this.modalRef = this.modalService.open(this.modalAlunoForm, { modalClass: 'modal-xl' });
  }

  retornoAluno(aluno: Aluno) {
    this.modalRef.close();
    this.findAll();
  }




}


