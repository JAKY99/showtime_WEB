import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormGeneratorComponent} from './permission-form.component';

describe('NewPermissionFormComponent', () => {
  let component: FormGeneratorComponent;
  let fixture: ComponentFixture<FormGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormGeneratorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
