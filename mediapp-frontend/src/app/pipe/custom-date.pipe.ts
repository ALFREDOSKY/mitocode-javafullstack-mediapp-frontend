import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root', // Otra opción: 'any' o el módulo donde lo estás utilizando
})

@Pipe({
  standalone:true,
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    
    if(!value) return ''

    const originalDate = new Date(value)

    const day = ('0'+originalDate.getDate()).slice(-2)
    const month = ('0'+(originalDate.getMonth()+1)).slice(-2)
    const year = originalDate.getFullYear()

    const hour = ('0'+originalDate.getHours()).slice(-2)
    const minutes = ('0'+originalDate.getMinutes()).slice(-2)
    const seconds = ('0'+originalDate.getSeconds()).slice(-2)

    const formattDate = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`  

    return formattDate

  }

}
