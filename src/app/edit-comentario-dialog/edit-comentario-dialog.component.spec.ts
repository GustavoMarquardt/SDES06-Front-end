import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComentarioDialogComponent } from './edit-comentario-dialog.component';

describe('EditComentarioDialogComponent', () => {
  let component: EditComentarioDialogComponent;
  let fixture: ComponentFixture<EditComentarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComentarioDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComentarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
