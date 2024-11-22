import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosAvaliacoesComponent } from './comentarios-avaliacoes.component';


describe('ComentariosAvaliacoesComponent', () => {
  let component: ComentariosAvaliacoesComponent;
  let fixture: ComponentFixture<ComentariosAvaliacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariosAvaliacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosAvaliacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
