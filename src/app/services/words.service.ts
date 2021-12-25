import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private _httpClient: HttpClient) { }

	public getWords(): Observable<string> {
		return this._httpClient.get('/assets/words.txt', { responseType: 'text' });
	}
}
