import { AsyncPipe, NgFor, NgIf, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import * as moment from 'moment';
import { Observable, switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Patient } from 'src/app/model/patient';
import { VitalSign } from 'src/app/model/vitalSign';
import { PatientService } from 'src/app/service/patient.service';
import { VitalsignService } from 'src/app/service/vitalsign.service';

@Component({
  selector: 'app-vitalsign-edit',
  standalone: true,
  templateUrl: './vitalsign-edit.component.html',
  styleUrls: ['./vitalsign-edit.component.css'],
  imports:[MaterialModule, ReactiveFormsModule, RouterLink, NgIf, AsyncPipe, NgFor]
})
export class VitalsignEditComponent implements OnInit{
  
  form: FormGroup;
  idPatient: number;
  idVitalSign: number;
  minDate: Date = new Date();

  patients$: Observable<Patient[]>;

  constructor(
    private patientService: PatientService,
    private vitalSignService: VitalsignService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ){}
  
  ngOnInit(): void {
    this.loadInitialData();

    this.route.params.subscribe(data => {
      this.idVitalSign = data['id'];      
      this.initForm();
    });
  }

  loadInitialData(){
    this.form= new FormGroup({
      idVitalSign: new FormControl(0),      
      idPatient: new FormControl(0),      
      vitalSignDate: new FormControl(new Date(), [Validators.required]),
      temperature: new FormControl('',[Validators.required, Validators.minLength(2)]),
      pulse: new FormControl('',[Validators.required, Validators.minLength(2)]),
      respiratoryRate: new FormControl('',[Validators.required, Validators.minLength(2)])
    })

    this.patients$=this.patientService.findAll();
  }

  initForm(){
    this.vitalSignService.findById(this.idVitalSign).subscribe(data=>{
      this.idPatient = data.patient.idPatient
      this.form= new FormGroup({
        idVitalSign: new FormControl(data.idVitalSign),
        idPatient: new FormControl(data.patient.idPatient),
        vitalSignDate: new FormControl(new Date(data.vitalSignDate),[Validators.required]),
        temperature: new FormControl(data.temperature,[Validators.required, Validators.minLength(2)]),
        pulse: new FormControl(data.pulse,[Validators.required, Validators.minLength(2)]),
        respiratoryRate: new FormControl(data.respiratoryRate,[Validators.required, Validators.minLength(2)])
      })
    })
  }
  
  update(){

    if(this.form.invalid){
      this._snackBar.open('FORM IS INVALID', 'INFO', { duration: 2000});
      return;
    }

    const patient: Patient = new Patient();
    patient.idPatient=this.form.value['idPatient'];

    const vitalSign: VitalSign = new VitalSign();
    vitalSign.idVitalSign=this.form.value['idVitalSign'];
    vitalSign.patient = patient;
    vitalSign.vitalSignDate = moment(this.form.value['vitalSignDate']).format('YYYY-MM-DDTHH:mm:ss');
    vitalSign.temperature = this.form.value['temperature'];
    vitalSign.pulse = this.form.value['pulse'];
    vitalSign.respiratoryRate = this.form.value['respiratoryRate']

    this.vitalSignService.update(this.idVitalSign,vitalSign).pipe(switchMap( ()=> {
      return this.vitalSignService.findAll();          
    }))
    .subscribe(data => {
      this.vitalSignService.setVitalSignChange(data);//para refrescar la lista con los cambios
      this.vitalSignService.setMessageChange('UPDATED!');
    });

    this.router.navigate(['/pages/vitalsign']);

  }

  get f(){
    return this.form.controls;
  }

}
