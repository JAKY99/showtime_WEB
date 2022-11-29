import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ElementAddDialogComponent } from './element-add-dialog.component';

describe('elementAddDialogComponent', () => {
  let component: ElementAddDialogComponent;
  let fixture: ComponentFixture<ElementAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementAddDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
