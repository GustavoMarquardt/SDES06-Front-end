/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/cadastroUsuario/cadastrar-usuario/cadastrar-usuario.component.html",
    "./src/app/login/login/login.component.html",
    "./src/app/lobby/lobby.component.html",
    "./src/app/confirmacao-dialog/confirmacao-dialog.component.html",
    "./src/app/editar-festa-dialog/editar-festa-dialog.component.html",
    "./src/app/lobby/lobby.component.html",
    "./src/app/cadastro-festa/cadastro-festa.component.html",
    "./src/app/editar-festa-dialog/editar-festa-dialog.component.html",
    "./src/app/lista-festas/lista-festas.component.html",
    "./src/app/comentarios-avaliacoes/comentarios-avaliacoes.component.html",
    "./src/app/lista-avaliacoes/lista-avaliacoes.component.html",
    "./src/**/*.{html,js}",
    
  ],
  theme: {
    extend: {
      fontFamily: {
        michroma: ['Michroma', 'sans-serif'],
      },
    },
  },
  plugins: [],
};