import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleonarAnoRelatorioComponent } from './seleonar-ano-relatorio.component';

describe('SeleonarAnoRelatorioComponent', () => {
  let component: SeleonarAnoRelatorioComponent;
  let fixture: ComponentFixture<SeleonarAnoRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleonarAnoRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleonarAnoRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
