// main.js - JavaScript principal da aplicação

// Configurações globais
const API_BASE_URL = '/api';

// Função utilitária para fazer requisições fetch
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Erro na requisição' }));
      throw new Error(error.error || `Erro ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Funções para exibir notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
  // Criar elemento de notificação
  const notificacao = document.createElement('div');
  notificacao.className = `notificacao notificacao-${tipo}`;
  notificacao.innerHTML = `
    <i class="fas fa-${getIconeNotificacao(tipo)}"></i>
    <span>${mensagem}</span>
    <button onclick="fecharNotificacao(this)" class="btn-fechar">&times;</button>
  `;

  // Adicionar estilos se não existirem
  if (!document.getElementById('notificacao-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notificacao-styles';
    styles.textContent = `
      .notificacao {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        min-width: 300px;
        animation: slideIn 0.3s ease;
      }
      .notificacao-success { background: #d4edda; color: #155724; border-left: 4px solid #28a745; }
      .notificacao-error { background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545; }
      .notificacao-warning { background: #fff3cd; color: #856404; border-left: 4px solid #ffc107; }
      .notificacao-info { background: #d1ecf1; color: #0c5460; border-left: 4px solid #17a2b8; }
      .btn-fechar {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.7;
      }
      .btn-fechar:hover { opacity: 1; }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }

  // Adicionar ao DOM
  document.body.appendChild(notificacao);

  // Remover automaticamente após 5 segundos
  setTimeout(() => {
    if (notificacao.parentNode) {
      notificacao.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => notificacao.remove(), 300);
    }
  }, 5000);
}

function getIconeNotificacao(tipo) {
  switch(tipo) {
    case 'success': return 'check-circle';
    case 'error': return 'exclamation-circle';
    case 'warning': return 'exclamation-triangle';
    default: return 'info-circle';
  }
}

function fecharNotificacao(btn) {
  const notificacao = btn.parentNode;
  notificacao.style.animation = 'slideOut 0.3s ease forwards';
  setTimeout(() => notificacao.remove(), 300);
}

// Função para formatar datas
function formatarData(data, incluirHora = false) {
  if (!data) return 'N/A';
  
  const date = new Date(data);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  
  if (incluirHora) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('pt-BR', options);
}

// Função para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Função para capitalizar primeira letra
function capitalizarPrimeira(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Função para debounce (evitar muitas chamadas seguidas)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Função para confirmar ações
function confirmarAcao(mensagem, callback) {
  if (confirm(mensagem)) {
    callback();
  }
}

// Loader global
function mostrarLoader(elemento) {
  if (typeof elemento === 'string') {
    elemento = document.getElementById(elemento);
  }
  
  if (elemento) {
    elemento.innerHTML = '<div class="text-center"><div class="loading"></div> Carregando...</div>';
  }
}

function ocultarLoader(elemento, conteudo = '') {
  if (typeof elemento === 'string') {
    elemento = document.getElementById(elemento);
  }
  
  if (elemento) {
    elemento.innerHTML = conteudo;
  }
}

// Manipulação de formulários
function limparFormulario(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
    // Remover classes de erro
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.classList.remove('is-invalid');
    });
  }
}

function marcarCampoErro(campoId, mensagem = '') {
  const campo = document.getElementById(campoId);
  if (campo) {
    campo.classList.add('is-invalid');
    
    // Adicionar mensagem de erro se não existir
    let feedback = campo.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      campo.parentNode.insertBefore(feedback, campo.nextSibling);
    }
    feedback.textContent = mensagem;
  }
}

function removerErrosCampo(campoId) {
  const campo = document.getElementById(campoId);
  if (campo) {
    campo.classList.remove('is-invalid');
    const feedback = campo.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.remove();
    }
  }
}

// Gerenciamento de estado da aplicação
const AppState = {
  usuarios: [],
  tarefas: [],
  categorias: [],
  
  // Getters
  getUsuarios: () => AppState.usuarios,
  getTarefas: () => AppState.tarefas,
  getCategorias: () => AppState.categorias,
  
  // Setters
  setUsuarios: (usuarios) => { AppState.usuarios = usuarios; },
  setTarefas: (tarefas) => { AppState.tarefas = tarefas; },
  setCategorias: (categorias) => { AppState.categorias = categorias; },
  
  // Métodos utilitários
  getUsuarioPorId: (id) => AppState.usuarios.find(u => u.id == id),
  getTarefaPorId: (id) => AppState.tarefas.find(t => t.id == id),
  getCategoriaPorId: (id) => AppState.categorias.find(c => c.id == id),
  
  // Carregar todos os dados
  async carregarTodos() {
    try {
      const [usuarios, tarefas, categorias] = await Promise.all([
        apiRequest(`${API_BASE_URL}/usuarios`),
        apiRequest(`${API_BASE_URL}/tarefas`),
        apiRequest(`${API_BASE_URL}/categorias`)
      ]);
      
      this.setUsuarios(usuarios);
      this.setTarefas(tarefas);
      this.setCategorias(categorias);
      
      return { usuarios, tarefas, categorias };
    } catch (error) {
      mostrarNotificacao('Erro ao carregar dados da aplicação', 'error');
      throw error;
    }
  }
};

// Inicialização quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
  // Adicionar estilos para campos inválidos se não existirem
  if (!document.getElementById('form-validation-styles')) {
    const styles = document.createElement('style');
    styles.id = 'form-validation-styles';
    styles.textContent = `
      .form-control.is-invalid {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
      }
      .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
      }
    `;
    document.head.appendChild(styles);
  }
  
  console.log('Aplicação Tarefas+ carregada!');
});

// Exportar funções globalmente
window.AppUtils = {
  apiRequest,
  mostrarNotificacao,
  formatarData,
  validarEmail,
  capitalizarPrimeira,
  debounce,
  confirmarAcao,
  mostrarLoader,
  ocultarLoader,
  limparFormulario,
  marcarCampoErro,
  removerErrosCampo
};

window.AppState = AppState;