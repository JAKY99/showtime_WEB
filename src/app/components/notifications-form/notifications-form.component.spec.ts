import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsFormComponent } from './notifications-form.component';

describe('NotificationsFormComponent', () => {
  let component: NotificationsFormComponent;
  let fixture: ComponentFixture<NotificationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
