import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Item } from '@todo/item-model/item.model';
import { ItemRestfulService } from '@todo/item-restful/item-restful.service';

@Component({
	selector: 'app-item-create',
	templateUrl: './item-create.component.html',
	styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent {

	private terminator: Subject<boolean> = new Subject<boolean>();
	private item: Item = { task: '', checked: false };

	public title: string = 'Create a new item';

	public formGroup: FormGroup;
	public isSubmitted: boolean = false;

	get task() { return this.formGroup.get('task') as FormControl; }
	get checked() { return this.formGroup.get('checked') as FormControl; }

	constructor(private formBuilder: FormBuilder,
				private router: Router,
				private itemRestful: ItemRestfulService) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			task: ['', [Validators.required]],
			checked: [false]
		});
	}

	ngOnDestroy(): void {
		this.terminator.next(true);
		this.terminator.complete();
	}

	updateStatus(): void { this.checked.setValue(!this.checked.value); }

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

			this.itemRestful.saveItem(this.item)
			.pipe(takeUntil(this.terminator))
			.subscribe((httpResponse: HttpResponse<Item>) => {
				this.router.navigate(['/to-do/items']);
			});
		}
	}

	back(): void { this.router.navigate(['/to-do/items']); }
}
