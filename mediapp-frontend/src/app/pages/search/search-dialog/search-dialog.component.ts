import { DatePipe, NgFor } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { Consult } from 'src/app/model/consult';
import { Exam } from 'src/app/model/exam';
import { ConsultService } from 'src/app/service/consult.service';

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css'],
  imports: [ MaterialModule, DatePipe, NgFor ]
})
export class SearchDialogComponent implements OnInit{

  consult: Consult;
  exams: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Consult,
    private consultService: ConsultService,
    private dialogRef: MatDialogRef<SearchDialogComponent>
  ){}

  ngOnInit(): void {
    this.consult = {...this.data};

    this.consultService.getExamsByIdConsult(this.consult.idConsult).subscribe(data => {
      this.exams = data;
    });
  }

}
