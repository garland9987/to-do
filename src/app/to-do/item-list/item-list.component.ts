import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as _ from 'lodash-es';

import { Item } from '@todo/item-model/item.model';
import { ItemRestfulService } from '@todo/item-restful/item-restful.service';

@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {

	private terminator: Subject<boolean> = new Subject<boolean>();

	public title: string = 'To-Do list';
	public items: Item[] = [];

	constructor(private router: Router,
				private itemRestful: ItemRestfulService) {}

	ngOnInit(): void {
		this.itemRestful.getItems()
		.pipe(takeUntil(this.terminator))
		.subscribe((httpResponse: HttpResponse<Item[]>) => {
			this.items = httpResponse.body;
		});
	}

	ngOnDestroy(): void {
		this.terminator.next(true);
		this.terminator.complete();
	}

	updateStatus(item: Item): void {
		item.checked = !item.checked;

		this.itemRestful.updateItem(item)
		.pipe(takeUntil(this.terminator))
		.subscribe((httpResponse: HttpResponse<Item>) => {});
	}

	create(): void { this.router.navigate(['/to-do/item/create']); }

	edit(item: Item): void { this.router.navigate(['/to-do/item/', item.id]); }

	delete(item: Item): void {
		this.itemRestful.deleteItem(item.id)
		.pipe(takeUntil(this.terminator))
		.subscribe((httpResponse: HttpResponse<Item>) => {
			_.remove(this.items, (nItem) => { return nItem.id === item.id; });
		});
	}

	showAll(): void {
		this.itemRestful.getItems()
		.pipe(takeUntil(this.terminator))
		.subscribe((httpResponse: HttpResponse<Item[]>) => {
			this.items = httpResponse.body;
		});
	}

	search(searchInput: HTMLInputElement): void {
		if(searchInput.value !== '') {
			this.itemRestful.searchItems(searchInput.value)
			.pipe(takeUntil(this.terminator))
			.subscribe((httpResponse: HttpResponse<Item[]>) => {
				this.items = httpResponse.body
			});
		}
	}
}
