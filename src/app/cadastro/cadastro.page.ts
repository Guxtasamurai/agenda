import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public materia:string = '';
  public descricao:string = '';
  public datahora:string = '';

 @ViewChild('calendario') _calendario:any;
 @ViewChildren('obrigatorio') obrigatorios:any;

  constructor(
    public localstorage_service:LocalStorageService,
    public router:Router,
    public alert_controller:AlertController
  ) { }

  ngOnInit() {
    //console.log( this.localstorage_service.get('compromisso'))
    this.initCalendar();
  
  }

async salvar() {
  let mensagem     = '';
  let _handler:any  = null;
  if (this.materia == '') {
    mensagem = 'O campo matéria é obrigatório';
    _handler = () => {
      setTimeout(()=> {
        this.obrigatorios._results[0].el.focus();
      },250);
    }
  }else{
    mensagem = 'Salvo com Sucesso!';
    _handler = () => {
      this.router.navigateByUrl('/home');
    };
    let compromisso = {
      materia:this.materia,
      descricao:this.descricao,
      datahora:this._calendario.el.value
    };
    this.localstorage_service.post('compromisso', compromisso);
  }
  const alert = await this.alert_controller.create
  ({message:mensagem,buttons:[{text:'Ok', handler:_handler}],});
  alert.present();
}

initCalendar() {
  let dt         = new Date().toLocaleString().split(',');
  let data       = dt[0].replace(/[\/]/g,"-").split('-').reverse().join('-');
  let hora       = dt[1].trim();
  this.datahora  = data + 'T' + hora;
}
}
