import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoComponent } from './to-do.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemEditComponent } from './item-edit/item-edit.component';

const routes: Routes = [
	{
		path: 'to-do',
		component: ToDoComponent,
		children: [
			{ path: 'items', component: ItemListComponent },
			{ path: 'item/create', component: ItemCreateComponent },
			{ path: 'item/:id', component: ItemEditComponent },
			{ path: '', redirectTo: 'items', pathMatch: 'full' }
		]
	},
	{ path: '', redirectTo: 'to-do', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ToDoRoutingModule {}
