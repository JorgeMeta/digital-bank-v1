<h1 align="center">💳 Digital Bank v1</h1>

<p align="center">
  <em>Um banco digital moderno, desenvolvido em Angular + TypeScript, com autenticação, registro de usuários e integração com MockAPI.</em>
</p>

---

## 🖥️ Visão Geral

O **Digital Bank v1** é uma aplicação web que simula o ambiente de um banco digital.  
Foi desenvolvida com foco em boas práticas de arquitetura, componentes reativos e design escalável.  

👤 Recursos principais:
- Login com autenticação via token
- Registro de novos usuários
- Listagem de usuários autenticados
- Proteção de rotas com `authGuard`
- Logout com limpeza segura do estado
- Toasts personalizados para feedback do usuário
- Validação completa de formulários com `ReactiveFormsModule`

---

## 🧠 Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| 🅰️ **Angular 18+** | Framework principal da aplicação |
| 💪 **TypeScript** | Tipagem forte e manutenção do código |
| 🎯 **RxJS** | Programação reativa e controle de fluxos |
| 🧱 **MockAPI** | API fake usada para persistir usuários |
| 💅 **SCSS / Material Design** | Estilo moderno e responsivo |
| 🔐 **Auth Guard / Signals** | Controle de sessão e reatividade do estado |

---

## 🚀 Funcionalidades

✅ Registro de novos usuários com validação de CPF  
✅ Login e geração de token fake (mockado)  
✅ Redirecionamento inteligente de rotas autenticadas  
✅ Logout com limpeza completa do `localStorage`  
✅ Feedback visual (toasts) para erros e sucessos  
✅ Proteção de componentes via `authGuard`

---

Clone o repositório:

```bash
git clone https://github.com/JorgeMeta/digital-bank-v1.git
cd digital-bank-v1

