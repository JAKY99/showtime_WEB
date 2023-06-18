import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarComponent } from './menubar.component';

describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenubarComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(MenubarComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it('should create the app', (() => {
  //   const fixture = TestBed.createComponent(MenubarComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
  // it(`should have as title 'app'`, (() => {
  //   const fixture = TestBed.createComponent(MenubarComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', (() => {
  //   const fixture = TestBed.createComponent(MenubarComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
