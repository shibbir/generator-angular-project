import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', function() {
    beforeEach(() => TestBed.configureTestingModule({ declarations: [HomeComponent] }));

    it('should instantiate the HomeComponent', function() {
        let fixture = TestBed.createComponent(HomeComponent);
        expect(fixture.componentInstance instanceof HomeComponent).toBe(true, 'should create HomeComponent');
    });
});
