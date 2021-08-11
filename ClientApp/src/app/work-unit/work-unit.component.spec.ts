/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { WorkUnitComponent } from './work-unit.component';

let component: WorkUnitComponent;
let fixture: ComponentFixture<WorkUnitComponent>;

describe('WorkUnit component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WorkUnitComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(WorkUnitComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});