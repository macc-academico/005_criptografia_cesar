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
            this.desplazSelec
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

  cifradoCesarClave(mensaje: string, desp: number): string {
    return 's';
  }

  descifradoCesarClave(mensaje: string, desp: number): string {
    return 's';
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
