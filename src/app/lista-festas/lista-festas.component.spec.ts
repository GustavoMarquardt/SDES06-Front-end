import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFestasComponent } from './lista-festas.component';

describe('ListaFestasComponent', () => {
  let component: ListaFestasComponent;
  let fixture: ComponentFixture<ListaFestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFestasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
