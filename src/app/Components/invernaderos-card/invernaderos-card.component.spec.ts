import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvernaderosCardComponent } from './invernaderos-card.component';

describe('InvernaderosCardComponent', () => {
  let component: InvernaderosCardComponent;
  let fixture: ComponentFixture<InvernaderosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvernaderosCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvernaderosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
