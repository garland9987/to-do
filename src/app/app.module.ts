import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToDoModule } from './to-do/to-do.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		ToDoModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
