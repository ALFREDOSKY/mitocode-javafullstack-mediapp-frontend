import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { VitalSign } from '../model/vitalSign';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VitalsignService extends GenericService<VitalSign>{

  private vitalSignChange: Subject<VitalSign[]> = new Subject<VitalSign[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) { 
    super(http, `${environment.HOST}/vitalsigns`)
  }

  listPageable(p:number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getVitalSignChange(){
    return this.vitalSignChange.asObservable();
  }

  setVitalSignChange(data: VitalSign[]){
    this.vitalSignChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

}
