import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-metodo-cesar-clave',
  templateUrl: './metodo-cesar-clave.component.html',
  styleUrls: ['./metodo-cesar-clave.component.css'],
})
export class MetodoCesarClaveComponent implements OnDestroy {
  ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  alfabeto: string[] = [];
  longCad: number = 0;
  nuevoAlfabeto: string[] = [];
  mensajeAcifrar = new FormControl('', []);
  mensajeCifrado: string = '';
  mensajeAdescifrar = new FormControl('', []);
  mensajeDescifrado: string = '';
  sus: Subscription;
  desplaz: number[] = [];
  desplazSelec: number = 0;
  mensajeClave = new FormControl('', []);
  mensajeClave2: string = '';

  constructor() {
    this.alfabeto = this.ABC.split('');
    this.longCad = this.alfabeto.length;
    this.desplaz = Array.from({ length: this.longCad }, (v, i) => i);
    this.rotarAlfabeto(this.desplazSelec);
    this.sus = this.mensajeAcifrar.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (value.length >= 1) {
          this.mensajeCifrado = this.cifradoCesarClave(
            value,
            this.desplazSelec,
            this.mensajeClave2
          );
        } else {
          this.mensajeCifrado = '';
        }
      });
    this.sus = this.mensajeAdescifrar.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (value.length >= 1) {
          this.mensajeDescifrado = this.descifradoCesarClave(
            value,
            this.desplazSelec,
            this.mensajeClave2
          );
        } else {
          this.mensajeDescifrado = '';
        }
      });
    this.sus = this.mensajeClave.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (value.length >= 1) {
          this.mensajeClave2 = value;
          this.rotarAlfabeto(this.desplazSelec, value);
        } else {
          this.mensajeClave2 = '';
        }
      });
  }

  ngOnDestroy() {
    this.sus.unsubscribe();
    this.mensajeCifrado = '';
    this.mensajeDescifrado = '';
    this.desplazSelec = 0;
  }

  cifradoCesarClave(mensaje: string, desp: number, clave: string): string {
    const mensajeMay: string = mensaje.toUpperCase();
    let mensajeCifrado: string = '';
    this.rotarAlfabeto(desp, clave);
    for (let i = 0; i < mensajeMay.length; i++) {
      const letra: string = mensajeMay.charAt(i);
      if (letra !== ' ') {
        const posLetraTurn: number = this.getPosLetra(letra);
        // const posLetraCifr: number = (posLetraTurn + desp) % this.longCad;
        mensajeCifrado = mensajeCifrado + this.nuevoAlfabeto[posLetraTurn];
      }
      if (letra === ' ') {
        mensajeCifrado = mensajeCifrado + ' ';
      }
    }
    return mensajeCifrado;
  }

  descifradoCesarClave(mensaje: string, desp: number, clave: string): string {
    const mensajeMay: string = mensaje.toUpperCase();
    let mensajeDescifrado: string = '';
    this.rotarAlfabeto(desp, clave);
    for (let i = 0; i < mensajeMay.length; i++) {
      const letra: string = mensajeMay.charAt(i);
      if (letra === ' ') {
        mensajeDescifrado = mensajeDescifrado + ' ';
      } else {
        const posLetraTurn: number = this.getPosLetraDesc(
          letra,
          this.nuevoAlfabeto
        );
        // const posLetraDescifr: number =
        //   (posLetraTurn + (this.longCad - desp)) % this.longCad;
        mensajeDescifrado = mensajeDescifrado + this.alfabeto[posLetraTurn];
      }
    }
    return mensajeDescifrado;
  }

  getPosLetra(letra: string): number {
    let posLetra: number = -1;
    for (let i = 0; i < this.alfabeto.length; i++) {
      const abcTurno = this.alfabeto[i];
      if (letra === abcTurno) {
        posLetra = i;
      }
    }
    return posLetra;
  }

  getPosLetraDesc(letra: string, newArra: string[]): number {
    let posLetra: number = -1;
    for (let i = 0; i < newArra.length; i++) {
      const abcTurno = newArra[i];
      if (letra === abcTurno) {
        posLetra = i;
      }
    }
    return posLetra;
  }

  rotarAlfabeto(desplazamiento: number, clave: string = '') {
    clave = clave.replace(/\s+/g, '').toUpperCase();
    this.nuevoAlfabeto = [];
    this.desplazSelec = Number(desplazamiento);
    const data = clave.split('');
    const result: string[] = data.filter((item, index) => {
      return data.indexOf(item) === index;
    });
    let newAlfa: string[] = this.eliminarRep(result, this.alfabeto);
    const posInicio: number = newAlfa.length - this.desplazSelec;
    for (let i = 0; i < this.longCad; i++) {
      const desp: number = posInicio + i;
      if (desp >= newAlfa.length) {
        newAlfa = this.eliminarRep(this.nuevoAlfabeto, newAlfa);
        break;
      } else {
        this.nuevoAlfabeto.push(newAlfa[desp]);
      }
    }
    this.nuevoAlfabeto = this.nuevoAlfabeto.concat(result);
    this.nuevoAlfabeto = this.nuevoAlfabeto.concat(newAlfa);
  }

  eliminarRep(elemen: string[], alfa: string[]): string[] {
    let elementNew: string[] = alfa;
    for (const el of elemen) {
      elementNew = elementNew.filter((item) => item !== el);
    }
    return elementNew;
  }
}
