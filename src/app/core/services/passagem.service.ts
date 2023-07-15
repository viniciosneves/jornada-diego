import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Destaques, FiltroPassagem, Passagem, Resultado } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class PassagemService {

  private apiUrl: string = environment.apiUrl
  public precoMin: number = 0
  public precoMax: number = 0
  constructor(private http: HttpClient) {

  }

  getPassagens(search: FiltroPassagem): Observable<Resultado> {
    const params: HttpParams = new HttpParams({ fromString: this.paraParametrosHttp(search) });
    const obs = this.http.get<Resultado>(this.apiUrl + '/passagem/search', { params })
    obs
      .pipe(take(1))
      .subscribe(resultado => {
        this.precoMin = resultado.precoMin
        this.precoMax = resultado.precoMax
      })
    return obs
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

  encontrarPassagens(passagens: Passagem[]): Destaques | undefined {
    if (!passagens.length) {
      return undefined
    }

    let ordenadoPorTempo = [...passagens].sort((a, b) => a.tempoVoo - b.tempoVoo);
    let ordenadoPorPreco = [...passagens].sort((a, b) => a.total - b.total);

    let maisRapida = ordenadoPorTempo[0];
    let maisBarata = ordenadoPorPreco[0];

    // Criar uma nova lista com base na média de tempo e preço
    let ordenadoPorMedia = [...passagens].sort((a, b) => {
      let pontuacaoA = (a.tempoVoo / maisRapida.tempoVoo + a.total / maisBarata.total) / 2;
      let pontuacaoB = (b.tempoVoo / maisRapida.tempoVoo + b.total / maisBarata.total) / 2;
      return pontuacaoA - pontuacaoB;
    });

    let sugerida = ordenadoPorMedia[0];

    return { maisRapida, maisBarata, sugerida };
  }

}
