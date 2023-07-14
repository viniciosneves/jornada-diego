import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiltroPassagem, Resultado } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class PassagemService {

  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  getPassagens(search: FiltroPassagem): Observable<Resultado>{
    const params: HttpParams = new HttpParams({ fromString: this.paraParametrosHttp(search) });
    return this.http.get<Resultado>(this.apiUrl + '/passagem/search', { params })
  }

  paraParametrosHttp(pesquisa: FiltroPassagem): string {
    const parametros = new URLSearchParams();
  
    Object.keys(pesquisa).forEach((chave) => {
      const chaveComoString = chave as keyof FiltroPassagem; // Esta é uma afirmação de tipo
      const valor = pesquisa[chaveComoString];
      if (valor !== undefined && valor !== null && valor.toString().trim() !== '') { 
        parametros.set(chave, valor.toString());
      }
    });
  
    return parametros.toString();
  }
  
}
