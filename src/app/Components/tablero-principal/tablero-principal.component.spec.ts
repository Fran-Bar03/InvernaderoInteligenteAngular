import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroPrincipalComponent } from './tablero-principal.component';

describe('TableroPrincipalComponent', () => {
  let component: TableroPrincipalComponent;
  let fixture: ComponentFixture<TableroPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
