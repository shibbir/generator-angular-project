import { TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', function() {
    beforeEach(() => TestBed.configureTestingModule({ declarations: [AboutComponent] }));

    it('should instantiate the AboutComponent', function() {
        let fixture = TestBed.createComponent(AboutComponent);
        expect(fixture.componentInstance instanceof AboutComponent).toBe(true, 'should create AboutComponent');
    });
});
