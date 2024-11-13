import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFestaDialogComponent } from './editar-festa-dialog.component';

describe('EditarFestaDialogComponent', () => {
  let component: EditarFestaDialogComponent;
  let fixture: ComponentFixture<EditarFestaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFestaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFestaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
