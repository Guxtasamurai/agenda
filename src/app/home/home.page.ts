
import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public compromissos:Array<any> = [];
  constructor(
    public localstorage_service:LocalStorageService
  ) {
    this.compromissos = this.localstorage_service.get('compromisso');
  }

  excluir(indice:number) {
    this.compromissos.splice(indice,1);
    this.localstorage_service.del('compromisso', indice);
    //console.log(indice); teste de código
    //É uma prática utilizada para saber se o código/programa está rodando como esoerado.

    this.compromissos.splice(indice,1); 
    //o comando splice exclui a quantidade de registros. 
    //O numeral 1 representa a quantidade de índices a serem eclusos.

  }

  getHora(data:string){ //Aqui estamos pegando a hora que será exibida na tela, separando-a da data.
    let hora = data.split("T")[1];
    return hora;
  }
    getData(data:string){ //Aqui estamos pegando a data que será exibida na tela, separando-a da data.
      let dt = data.split("T")[0];
      let dia = dt.split('/')[2];
      let mes = dt.split('/')[1];
      let ano = dt.split('/')[0];

      return dia + '/' + mes + '/' + ano;
  }
}
