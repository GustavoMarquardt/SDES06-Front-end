import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarAnoRelatorioComponent } from './seleonar-ano-relatorio.component';

describe('SeleonarAnoRelatorioComponent', () => {
  let component: SelecionarAnoRelatorioComponent;
  let fixture: ComponentFixture<SelecionarAnoRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarAnoRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarAnoRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
