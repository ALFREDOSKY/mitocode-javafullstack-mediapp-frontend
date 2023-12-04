import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { VitalSign } from 'src/app/model/vitalSign';
import { CustomDatePipe } from 'src/app/pipe/custom-date.pipe';
import { VitalsignService } from 'src/app/service/vitalsign.service';

@Component({
  selector: 'app-vitalsign',
  standalone: true,
  templateUrl: './vitalsign.component.html',
  styleUrls: ['./vitalsign.component.css'],
  imports: [MaterialModule, RouterOutlet, RouterLink, NgFor]
})

export class VitalsignComponent implements OnInit{
  
  displayedColumns: string[] = [
  'idVitalSign', 
  'firstName', 
  'lastName', 
  'temperature', 
  'pulse', 
  'respiratoryRate', 
  'registerDate',
  'actions'
  ];

  dataSource: MatTableDataSource<VitalSign>;     

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  totalElements: number = 0;
  dataWithFormattedDate: VitalSign[]

  constructor(
    private vitalSignService: VitalsignService,
    private customDatePipe: CustomDatePipe,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {

    this.vitalSignService.getVitalSignChange().subscribe(data => {
      this.createTable(data);
    });

    this.vitalSignService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    });

    this.vitalSignService.listPageable(0,2).subscribe(data =>{
      this.totalElements = data.totalElements;      
      this.createTable(data.content);
    })

  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: VitalSign[]){
    this.dataWithFormattedDate = data.map(item => {
      return {
        ...item,
        vitalSignDate: this.customDatePipe.transform(item.vitalSignDate)
      };
    });
            
    //this.dataSource = new MatTableDataSource(data)
    this.dataSource = new MatTableDataSource(this.dataWithFormattedDate)
    this.dataSource.sort = this.sort
  }

  delete(idVitalSign: number){
    this.vitalSignService.delete(idVitalSign)
    .pipe(switchMap(()=> this.vitalSignService.findAll()))
    .subscribe(data =>{
      this.createTable(data);

    })
  }

  showMore(e:any){
    this.vitalSignService.listPageable(e.page, e.size).subscribe(data=>{
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    })
  }

  checkChildren(): boolean{
    return this.route.children.length > 0;
  }

}
