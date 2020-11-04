import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-metodo-cesar',
  templateUrl: './metodo-cesar.component.html',
  styleUrls: ['./metodo-cesar.component.css'],
})
export class MetodoCesarComponent implements OnDestroy {
  ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  alfabeto: string[] = [];
  longCad: number = 0;
  nuevoAlfabeto: string[] = [];
  mensajeAcifrar = new FormControl('', []);
  mensajeCifrado: string = '';
  mensajeAdescifrar = new FormControl('', []);
  mensajeDescifrado: string = '';
  sus: Subscription;

  /**
   * RESTRINCIONES
   * 1  palabra que se encripta tiene qe estar dentro de la ABC
   * 2  ABC no acepta espacio y letras repetidas
   */
  constructor() {
    this.alfabeto = this.ABC.split('');
    this.longCad = this.alfabeto.length;
    this.rotarAlfabeto(3);

    this.sus = this.mensajeAcifrar.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (value.length >= 1) {
          this.mensajeCifrado = this.cifradoCesar(value);
        } else {
          this.mensajeCifrado = '';
        }
      });
    this.sus = this.mensajeAdescifrar.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (value.length >= 1) {
          this.mensajeDescifrado = this.desifradoCesar(value);
        } else {
          this.mensajeDescifrado = '';
        }
      });
  }

  ngOnDestroy() {
    this.sus.unsubscribe();
    this.mensajeCifrado = '';
    this.mensajeDescifrado = '';
  }

  cifradoCesar(mensaje: string): string {
    const mensajeMay: string = mensaje.toUpperCase();
    let mensajeCifrado: string = '';
    for (let i = 0; i < mensajeMay.length; i++) {
      const letra: string = mensajeMay.charAt(i);
      if (letra !== ' ') {
        const posLetraTurn: number = this.getPosLetra(letra);
        const posLetraCifr: number = (posLetraTurn + 3) % this.longCad;
        mensajeCifrado = mensajeCifrado + this.alfabeto[posLetraCifr];
      }
      if (letra === ' ') {
        mensajeCifrado = mensajeCifrado + ' ';
      }
    }
    return mensajeCifrado;
  }

  desifradoCesar(mensaje: string): string {
    const mensajeMay: string = mensaje.toUpperCase();
    let mensajeDescifrado: string = '';
    for (let i = 0; i < mensajeMay.length; i++) {
      const letra: string = mensajeMay.charAt(i);
      if (letra === ' ') {
        mensajeDescifrado = mensajeDescifrado + ' ';
      } else {
        const posLetraTurn: number = this.getPosLetra(letra);
        const posLetraDescifr: number =
          (posLetraTurn + (this.longCad - 3)) % this.longCad;
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
    let init: number = 0;
    for (let i = 0; i < this.longCad; i++) {
      const desp: number = i + desplazamiento;
      if (desp >= this.longCad) {
        this.nuevoAlfabeto.push(this.alfabeto[init]);
        init++;
      } else {
        this.nuevoAlfabeto.push(this.alfabeto[desp]);
      }
    }
  }
}
