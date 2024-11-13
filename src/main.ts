import 'zone.js';  // Necessário para o Angular funcionar
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login/login.component';
import { CadastrarUsuarioComponent } from './app/cadastroUsuario/cadastrar-usuario/cadastrar-usuario.component';
import { LobbyComponent } from './app/lobby/lobby.component';
import { CadastroFestaComponent } from './app/cadastro-festa/cadastro-festa.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EditarPerfilComponent } from './app/editar-perfil/editar-perfil.component';

// Definindo as rotas
const routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrarUsuario', component: CadastrarUsuarioComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'cadastrarFesta', component : CadastroFestaComponent},
  { path: 'editarPerfil', component : EditarPerfilComponent}
];

// Inicializando a aplicação com o AppComponent
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(),
  ],
}).catch(err => console.error(err));
