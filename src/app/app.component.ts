import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EditComentarioDialogComponent } from './edit-comentario-dialog/edit-comentario-dialog.component';


@NgModule({
  declarations: [
    EditComentarioDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,],  // Certifique-se de que CommonModule e FormsModule estão importados
  template: `<router-outlet></router-outlet>`,  // O conteúdo será exibido aqui conforme a rota
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SDES0';
}
