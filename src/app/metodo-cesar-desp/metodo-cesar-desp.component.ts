import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { range, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-metodo-cesar-desp',
  templateUrl: './metodo-cesar-desp.component.html',
  styleUrls: ['./metodo-cesar-desp.component.css'],
})
export class MetodoCesarDespComponent implements OnDestroy {
  ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';
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

  constructor() {
    this.alfabeto = this.ABC.split('');
    this.longCad = this.alfabeto.length;
    this.desplaz = Array.from({ length: this.longCad }, (v, i) => i);
    this.rotarAlfabeto(this.desplazSelec);
    this.sus = this.mensajeAcifrar.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (value.length >= 1) {
          this.mensajeCifrado = this.cifradoCesarDesp(value, this.desplazSelec);
        } else {
          this.mensajeCifrado = '';
        }
      });
    this.sus = this.mensajeAdescifrar.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (value.length >= 1) {
          this.mensajeDescifrado = this.desifradoCesarDesp(
            value,
            this.desplazSelec
          );
        } else {
          this.mensajeDescifrado = '';
        }
      });
  }

  ngOnDestroy() {
    this.sus.unsubscribe();
    this.mensajeCifrado = '';
    this.mensajeDescifrado = '';
    this.desplazSelec = 0;
  }

  cifradoCesarDesp(mensaje: string, desp: number): string {
    const mensajeMay: string = mensaje.toUpperCase();
    let mensajeCifrado: string = '';
    for (let i = 0; i < mensajeMay.length; i++) {
      const letra: string = mensajeMay.charAt(i);
      if (letra !== ' ') {
        const posLetraTurn: number = this.getPosLetra(letra);
        const posLetraCifr: number = (posLetraTurn + desp) % this.longCad;
        mensajeCifrado = mensajeCifrado + this.alfabeto[posLetraCifr];
      }
      if (letra === ' ') {
        mensajeCifrado = mensajeCifrado + ' ';
      }
    }
    return mensajeCifrado;
  }

  desifradoCesarDesp(mensaje: string, desp: number): string {
    const mensajeMay: string = mensaje.toUpperCase();
    let mensajeDescifrado: string = '';
    for (let i = 0; i < mensajeMay.length; i++) {
      const letra: string = mensajeMay.charAt(i);
      if (letra === ' ') {
        mensajeDescifrado = mensajeDescifrado + ' ';
      } else {
        const posLetraTurn: number = this.getPosLetra(letra);
        const posLetraDescifr: number =
          (posLetraTurn + (this.longCad - desp)) % this.longCad;
        mensajeDescifrado = mensajeDescifrado + this.alfabeto[posLetraDescifr];
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

  rotarAlfabeto(desplazamiento: number) {
    this.nuevoAlfabeto = [];
    let init: number = 0;
    this.desplazSelec = Number(desplazamiento);
    for (let i = 0; i < this.longCad; i++) {
      const desp: number = i + this.desplazSelec;
      if (desp >= this.longCad) {
        this.nuevoAlfabeto.push(this.alfabeto[init]);
        init++;
      } else {
        this.nuevoAlfabeto.push(this.alfabeto[desp]);
      }
    }
  }
}
