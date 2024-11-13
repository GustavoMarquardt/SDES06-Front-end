import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFestaComponent } from './cadastro-festa.component';

describe('CadastroFestaComponent', () => {
  let component: CadastroFestaComponent;
  let fixture: ComponentFixture<CadastroFestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroFestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroFestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
