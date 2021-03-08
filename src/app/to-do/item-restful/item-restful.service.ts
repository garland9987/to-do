import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from '@todo/item-model/item.model';

@Injectable({
	providedIn: 'root'
})
export class ItemRestfulService {

	readonly host: string = 'localhost';
	readonly port: string = '3500';
	readonly url: string = `http://${this.host}:${this.port}/items`;

	constructor(private httpClient: HttpClient) {}

	getItems(): Observable<HttpResponse<Item[]>> {
		const verb = 'GET';
		const url = this.url;

		return this.sendRequest<Item[]>(verb, url);
	}

	getItem(id: number): Observable<HttpResponse<Item>> {
		const verb = 'GET';
		const url = `${this.url}/${id}`;

		return this.sendRequest<Item>(verb, url);
	}

	updateItem(item: Item): Observable<HttpResponse<Item>> {
		const verb = 'PUT';
		const url = `${this.url}/${item.id}`;
		const options = { body: item };

		return this.sendRequest<Item>(verb, url, options);
	}

	saveItem(item: Item): Observable<HttpResponse<Item>> {
		const verb = 'POST';
		const url = this.url;
		const options = { body: item };

		return this.sendRequest<Item>(verb, url, options);
	}

	deleteItem(id: number): Observable<HttpResponse<Item>> {
		const verb = 'DELETE';
		const url = `${this.url}/${id}`;

		return this.sendRequest<Item>(verb, url);
	}

	searchItems(keyword: string): Observable<HttpResponse<Item[]>> {
		const verb = 'GET';
		const url = this.url;
		const options = { params: new HttpParams({ fromString: `task_like=${keyword}` }) };

		return this.sendRequest<Item[]>(verb, url, options);
	}

	sendRequest<T>(verb: string, url: string, options: {[index: string]: any} = {}): Observable<HttpResponse<T>> {
		return this.httpClient.request<T>(verb, url, { ...options, observe: 'response' });
	}
}
