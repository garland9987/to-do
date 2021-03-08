import { TestBed } from '@angular/core/testing';

import { ItemRestfulService } from './item-restful.service';

describe('ItemRestfulService', () => {
	let service: ItemRestfulService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ItemRestfulService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
