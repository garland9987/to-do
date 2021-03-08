import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Item } from '@todo/item-model/item.model';
import { ItemRestfulService } from '@todo/item-restful/item-restful.service';

@Component({
	selector: 'app-item-edit',
	templateUrl: './item-edit.component.html',
	styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent {

	private terminator: Subject<boolean> = new Subject<boolean>();

	public title: string = 'Edit an item';

	public formGroup: FormGroup;
	public isSubmitted: boolean = false;

	public item: Item;

	get task() { return this.formGroup.get('task') as FormControl; }
	get checked() { return this.formGroup.get('checked') as FormControl; }

	constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private formBuilder: FormBuilder,
				private itemRestful: ItemRestfulService) {}

	ngOnInit(): void {
		this.activatedRoute.paramMap
		.pipe(takeUntil(this.terminator))
		.subscribe((params) => {
			if(params.has('id')) {
				let id = Number(params.get('id'));

				this.itemRestful.getItem(id)
				.pipe(takeUntil(this.terminator))
				.subscribe((httpResponse: HttpResponse<Item>) => {
					this.item = httpResponse.body;
					this.formInit(this.item);
				});
			}
		});
	}

	ngOnDestroy(): void {
		this.terminator.next(true);
		this.terminator.complete();
	}

	updateStatus(): void { this.checked.setValue(!this.checked.value); }

	formInit(item: Item): void {
		this.formGroup = this.formBuilder.group({
			task: [item.task, [Validators.required]],
			checked: [item.checked]
		});
	}

	validation(control: FormControl): {[property: string]: boolean} {
		return {
			'is-valid': control.valid && (control.dirty || control.touched || this.isSubmitted),
			'is-invalid': control.invalid && (control.dirty || control.touched || this.isSubmitted)
		}
	}

	submit(): void {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			this.item.task = this.task.value;
			this.item.checked = this.checked.value;

			this.itemRestful.updateItem(this.item)
			.pipe(takeUntil(this.terminator))
			.subscribe((httpResponse: HttpResponse<Item>) => {
				this.router.navigate(['/to-do/items']);
			});
		}
	}

	delete(): void {
		this.itemRestful.deleteItem(this.item.id)
		.pipe(takeUntil(this.terminator))
		.subscribe((httpResponse: HttpResponse<Item>) => {
			this.router.navigate(['/to-do/items']);
		});
	}

	back(): void { this.router.navigate(['/to-do/items']); }
}
