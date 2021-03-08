import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemEditComponent } from './item-edit/item-edit.component';

@NgModule({
	declarations: [
		ToDoComponent,
		ItemListComponent,
		ItemCreateComponent,
		ItemEditComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		ToDoRoutingModule
	]
})
export class ToDoModule {}
