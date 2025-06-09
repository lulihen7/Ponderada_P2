// ===== SISTEMA DE GERENCIAMENTO DE TAREFAS - JAVASCRIPT APRIMORADO =====

// Configurações globais
const CONFIG = {
  API_BASE_URL: '/api',
  ANIMATION_DURATION: 300,
  NOTIFICATION_DURATION: 5000,
  THEME_KEY: 'tarefas-theme',
  AUTO_SAVE_DELAY: 1000
};

// Estado global da aplicação
const AppState = {
  currentTheme: localStorage.getItem(CONFIG.THEME_KEY) || 'light',
  usuarios: [],
  tarefas: [],
  categorias: [],
  notifications: [],
  
  // Getters
  getUsuarios: () => AppState.usuarios,
  getTarefas: () => AppState.tarefas,
  getCategorias: () => AppState.categorias,
  
  // Setters com eventos
  setUsuarios: (usuarios) => {
    AppState.usuarios = usuarios;
    dispatchEvent(new CustomEvent('usuariosUpdated', { detail: usuarios }));
  },
  setTarefas: (tarefas) => {
    AppState.tarefas = tarefas;
    dispatchEvent(new CustomEvent('tarefasUpdated', { detail: tarefas }));
  },
  setCategorias: (categorias) => {
    AppState.categorias = categorias;
    dispatchEvent(new CustomEvent('categoriasUpdated', { detail: categorias }));
  },
  
  // Métodos utilitários
  getUsuarioPorId: (id) => AppState.usuarios.find(u => u.id == id),
  getTarefaPorId: (id) => AppState.tarefas.find(t => t.id == id),
  getCategoriaPorId: (id) => AppState.categorias.find(c => c.id == id)
};

// ===== SISTEMA DE TEMAS =====
class ThemeManager {
  static init() {
    this.applyTheme(AppState.currentTheme);
    this.createThemeToggle();
  }
  
  static applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    AppState.currentTheme = theme;
    localStorage.setItem(CONFIG.THEME_KEY, theme);
    
    // Atualizar ícone do toggle
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
  
  static toggle() {
    const newTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    
    // Animação suave na transição
    document.body.style.transition = 'background-color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }
  
  static createThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  }
}

// ===== SISTEMA DE NOTIFICAÇÕES AVANÇADO =====
class NotificationManager {
  static show(message, type = 'info', duration = CONFIG.NOTIFICATION_DURATION) {
    const notification = this.createNotification(message, type);
    document.body.appendChild(notification);
    
    // Animação de entrada
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });
    
    // Auto-remoção
    setTimeout(() => {
      this.remove(notification);
    }, duration);
    
    return notification;
  }
  
  static createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notificacao notificacao-${type}`;
    
    const icon = this.getIcon(type);
    notification.innerHTML = `
      <div class="notification-icon">
        <i class="${icon}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">${this.getTitle(type)}</div>
        <div class="notification-message">${message}</div>
      </div>
      <button class="btn-fechar" onclick="NotificationManager.remove(this.parentNode)">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Adicionar evento de clique para fechar
    notification.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-fechar') || e.target.closest('.btn-fechar')) {
        this.remove(notification);
      }
    });
    
    return notification;
  }
  
  static remove(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
  
  static getIcon(type) {
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
  }
  
  static getTitle(type) {
    const titles = {
      success: 'Sucesso',
      error: 'Erro',
      warning: 'Atenção',
      info: 'Informação'
    };
    return titles[type] || titles.info;
  }
}

// ===== SISTEMA DE REQUISIÇÕES APRIMORADO =====
class ApiClient {
  static async request(url, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      // Mostrar loading se especificado
      if (options.showLoading) {
        LoadingManager.show(options.loadingTarget);
      }
      
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ 
          error: `Erro ${response.status}: ${response.statusText}` 
        }));
        throw new Error(error.error || error.message || 'Erro na requisição');
      }
      
      const data = await response.json();
      
      // Mostrar notificação de sucesso se especificado
      if (options.successMessage) {
        NotificationManager.show(options.successMessage, 'success');
      }
      
      return data;
      
    } catch (error) {
      console.error('Erro na requisição:', error);
      
      // Mostrar notificação de erro se especificado
      if (options.showError !== false) {
        NotificationManager.show(error.message, 'error');
      }
      
      throw error;
    } finally {
      // Ocultar loading
      if (options.showLoading) {
        LoadingManager.hide(options.loadingTarget);
      }
    }
  }
  
  static get(url, options = {}) {
    return this.request(url, { method: 'GET', ...options });
  }
  
  static post(url, data, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }
  
  static put(url, data, options = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }
  
  static delete(url, options = {}) {
    return this.request(url, { method: 'DELETE', ...options });
  }
}

// ===== GERENCIADOR DE LOADING =====
class LoadingManager {
  static show(target = 'body') {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (element) {
      const loading = document.createElement('div');
      loading.className = 'loading-overlay';
      loading.innerHTML = `
        <div class="loading-content">
          <div class="loading"></div>
          <span>Carregando...</span>
        </div>
      `;
      
      // Adicionar estilos se não existirem
      if (!document.getElementById('loading-styles')) {
        const styles = document.createElement('style');
        styles.id = 'loading-styles';
        styles.textContent = `
          .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(2px);
          }
          .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            color: var(--gray-600);
            font-weight: 500;
          }
          [data-theme="dark"] .loading-overlay {
            background: rgba(15, 23, 42, 0.9);
          }
        `;
        document.head.appendChild(styles);
      }
      
      element.style.position = 'relative';
      element.appendChild(loading);
    }
  }
  
  static hide(target = 'body') {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    const loading = element?.querySelector('.loading-overlay');
    
    if (loading) {
      loading.style.opacity = '0';
      setTimeout(() => {
        if (loading.parentNode) {
          loading.parentNode.removeChild(loading);
        }
      }, 200);
    }
  }
}

// ===== ANIMAÇÕES E EFEITOS =====
class AnimationUtils {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }
  
  static fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.transform = 'translateY(-20px)';
    
    return new Promise(resolve => {
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        resolve();
      }, duration);
    });
  }
  
  static pulse(element, duration = 1000) {
    element.style.animation = `pulse ${duration}ms ease-in-out`;
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  }
  
  static shake(element, duration = 500) {
    element.style.animation = `shake ${duration}ms ease-in-out`;
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  }
  
  static addAnimationStyles() {
    if (!document.getElementById('animation-styles')) {
      const styles = document.createElement('style');
      styles.id = 'animation-styles';
      styles.textContent = `
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(styles);
    }
  }
}

// ===== VALIDADOR DE FORMULÁRIOS =====
class FormValidator {
  constructor(form) {
    this.form = form;
    this.rules = {};
    this.init();
  }
  
  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.form.addEventListener('input', (e) => this.handleInput(e));
  }
  
  addRule(fieldName, rules) {
    this.rules[fieldName] = rules;
    return this;
  }
  
  handleSubmit(e) {
    if (!this.validateAll()) {
      e.preventDefault();
      AnimationUtils.shake(this.form);
      NotificationManager.show('Por favor, corrija os erros no formulário', 'warning');
    }
  }
  
  handleInput(e) {
    const field = e.target;
    if (field.name && this.rules[field.name]) {
      this.validateField(field);
    }
  }
  
  validateField(field) {
    const rules = this.rules[field.name];
    const value = field.value.trim();
    
    for (const rule of rules) {
      const result = rule.validate(value);
      if (!result.valid) {
        this.showFieldError(field, result.message);
        return false;
      }
    }
    
    this.clearFieldError(field);
    return true;
  }
  
  validateAll() {
    let isValid = true;
    
    for (const fieldName in this.rules) {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field && !this.validateField(field)) {
        isValid = false;
      }
    }
    
    return isValid;
  }
  
  showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let feedback = field.parentNode.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      field.parentNode.appendChild(feedback);
    }
    feedback.textContent = message;
  }
  
  clearFieldError(field) {
    field.classList.remove('is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.remove();
    }
  }
  
  // Regras de validação comuns
  static rules = {
    required: (message = 'Este campo é obrigatório') => ({
      validate: (value) => ({
        valid: value.length > 0,
        message
      })
    }),
    
    email: (message = 'E-mail inválido') => ({
      validate: (value) => ({
        valid: !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message
      })
    }),
    
    minLength: (min, message) => ({
      validate: (value) => ({
        valid: !value || value.length >= min,
        message: message || `Mínimo de ${min} caracteres`
      })
    }),
    
    maxLength: (max, message) => ({
      validate: (value) => ({
        valid: !value || value.length <= max,
        message: message || `Máximo de ${max} caracteres`
      })
    })
  };
}

// ===== GERENCIADOR DE MODAIS =====
class ModalManager {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.isOpen = false;
    this.init();
  }
  
  init() {
    if (!this.modal) return;
    
    // Event listeners
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Botão de fechar
    const closeBtn = this.modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
    
    // ESC para fechar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
  
  open() {
    if (this.isOpen) return;
    
    this.modal.classList.add('show');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Focus no primeiro input
    const firstInput = this.modal.querySelector('input, textarea, select');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
  
  close() {
    if (!this.isOpen) return;
    
    this.modal.classList.remove('show');
    this.isOpen = false;
    document.body.style.overflow = '';
    
    // Limpar formulário se existir
    const form = this.modal.querySelector('form');
    if (form) {
      form.reset();
      this.clearFormErrors(form);
    }
  }
  
  clearFormErrors(form) {
    form.querySelectorAll('.is-invalid').forEach(field => {
      field.classList.remove('is-invalid');
    });
    form.querySelectorAll('.invalid-feedback').forEach(feedback => {
      feedback.remove();
    });
  }
}

// ===== FILTROS E PESQUISA =====
class FilterManager {
  constructor(containerId, items = []) {
    this.container = document.getElementById(containerId);
    this.items = items;
    this.filters = {};
    this.searchTerm = '';
  }
  
  setItems(items) {
    this.items = items;
    this.apply();
  }
  
  addFilter(key, value) {
    if (value === '' || value === null || value === undefined) {
      delete this.filters[key];
    } else {
      this.filters[key] = value;
    }
    this.apply();
  }
  
  setSearch(term) {
    this.searchTerm = term.toLowerCase();
    this.apply();
  }
  
  apply() {
    let filtered = [...this.items];
    
    // Aplicar filtros
    for (const [key, value] of Object.entries(this.filters)) {
      filtered = filtered.filter(item => {
        if (typeof value === 'function') {
          return value(item);
        }
        return item[key] === value;
      });
    }
    
    // Aplicar pesquisa
    if (this.searchTerm) {
      filtered = filtered.filter(item => {
        return Object.values(item).some(val => 
          String(val).toLowerCase().includes(this.searchTerm)
        );
      });
    }
    
    this.render(filtered);
  }
  
  render(items) {
    // Override este método nas classes filhas
    console.log('Renderizando itens filtrados:', items);
  }
}

// ===== DEBOUNCER PARA OTIMIZAÇÃO =====
function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// ===== UTILITÁRIOS =====
const Utils = {
  // Formatação de datas
  formatDate(date, includeTime = false) {
    if (!date) return 'N/A';
    
    const d = new Date(date);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return d.toLocaleDateString('pt-BR', options);
  },
  
  // Formatação de tempo relativo
  timeAgo(date) {
    if (!date) return 'N/A';
    
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
    return `${Math.floor(diffDays / 365)} anos atrás`;
  },
  
  // Capitalizar primeira letra
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  // Truncar texto
  truncate(str, length = 50) {
    return str.length > length ? str.substring(0, length) + '...' : str;
  },
  
  // Validar email
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  // Gerar cor aleatória
  randomColor() {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c',
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  },
  
  // Copiar para clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      NotificationManager.show('Copiado para a área de transferência', 'success');
    } catch (err) {
      console.error('Erro ao copiar:', err);
      NotificationManager.show('Erro ao copiar texto', 'error');
    }
  }
};

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
class App {
  static async init() {
    console.log('🚀 Iniciando Tarefas+...');
    
    try {
      // Aplicar estilos de animação
      AnimationUtils.addAnimationStyles();
      
      // Inicializar tema
      ThemeManager.init();
      
      // Carregar dados iniciais
      await this.loadInitialData();
      
      // Configurar eventos globais
      this.setupGlobalEvents();
      
      // Inicializar funcionalidades específicas da página
      this.initPageFeatures();
      
      console.log('✅ Tarefas+ inicializado com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar aplicação:', error);
      NotificationManager.show('Erro ao carregar a aplicação', 'error');
    }
  }
  
  static async loadInitialData() {
    try {
      const [usuarios, tarefas, categorias] = await Promise.all([
        ApiClient.get(`${CONFIG.API_BASE_URL}/usuarios`, { showError: false }),
        ApiClient.get(`${CONFIG.API_BASE_URL}/tarefas`, { showError: false }),
        ApiClient.get(`${CONFIG.API_BASE_URL}/categorias`, { showError: false })
      ]);
      
      AppState.setUsuarios(usuarios);
      AppState.setTarefas(tarefas);
      AppState.setCategorias(categorias);
      
    } catch (error) {
      console.warn('Alguns dados não puderam ser carregados:', error);
    }
  }
  
  static setupGlobalEvents() {
    // Animações de entrada para elementos
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    });
    
    document.querySelectorAll('.card, .stat-card, .table tbody tr').forEach(el => {
      observer.observe(el);
    });
    
    // Tooltips simples
    document.addEventListener('mouseover', (e) => {
      if (e.target.hasAttribute('title')) {
        this.showTooltip(e.target);
      }
    });
    
    // Auto-save em formulários
    document.addEventListener('input', debounce((e) => {
      if (e.target.hasAttribute('data-auto-save')) {
        this.autoSave(e.target);
      }
    }, CONFIG.AUTO_SAVE_DELAY));
  }
  
  static initPageFeatures() {
    const page = document.body.getAttribute('data-page') || 
                  window.location.pathname.split('/').pop();
    
    switch (page) {
      case 'dashboard':
      case '':
        this.initDashboard();
        break;
      case 'tarefas':
        this.initTarefas();
        break;
      case 'usuarios':
        this.initUsuarios();
        break;
      case 'categorias':
        this.initCategorias();
        break;
    }
  }
  
  static initDashboard() {
    // Animações dos cards de estatísticas
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
      setTimeout(() => {
        AnimationUtils.fadeIn(card);
      }, index * 100);
    });
  }
  
  static initTarefas() {
    // Filtros em tempo real
    const filtros = document.querySelectorAll('#filtro-status, #filtro-categoria');
    filtros.forEach(filtro => {
      filtro.addEventListener('change', () => {
        // Adicionar efeito visual na mudança de filtro
        AnimationUtils.pulse(filtro);
      });
    });
  }
  
  static initUsuarios() {
    // Validação em tempo real de email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value && !Utils.isValidEmail(input.value)) {
          AnimationUtils.shake(input);
        }
      });
    });
  }
  
  static initCategorias() {
    // Contador de tarefas por categoria em tempo real
    this.updateCategoryCounters();
  }
  
  static updateCategoryCounters() {
    // Atualizar contadores quando dados mudarem
    addEventListener('tarefasUpdated', () => {
      // Lógica para atualizar contadores
    });
  }
  
  static showTooltip(element) {
    // Implementação simples de tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = element.getAttribute('title');
    
    // Remover título para evitar tooltip nativo
    element.removeAttribute('title');
    element.setAttribute('data-original-title', tooltip.textContent);
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.cssText = `
      position: fixed;
      top: ${rect.top - tooltip.offsetHeight - 10}px;
      left: ${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px;
      background: var(--gray-900);
      color: white;
      padding: 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
    `;
    
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
    });
    
    // Remover ao sair do elemento
    element.addEventListener('mouseleave', () => {
      tooltip.remove();
      element.setAttribute('title', element.getAttribute('data-original-title'));
      element.removeAttribute('data-original-title');
    }, { once: true });
  }
  
  static autoSave(field) {
    // Implementar auto-save se necessário
    console.log('Auto-salvando campo:', field.name);
  }
}

// ===== EXPORTAÇÕES GLOBAIS =====
window.App = App;
window.AppState = AppState;
window.ThemeManager = ThemeManager;
window.NotificationManager = NotificationManager;
window.ApiClient = ApiClient;
window.LoadingManager = LoadingManager;
window.AnimationUtils = AnimationUtils;
window.FormValidator = FormValidator;
window.ModalManager = ModalManager;
window.FilterManager = FilterManager;
window.Utils = Utils;
window.debounce = debounce;

// ===== INICIALIZAÇÃO AUTOMÁTICA =====
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// ===== FUNÇÕES UTILITÁRIAS GLOBAIS (COMPATIBILIDADE) =====
window.mostrarNotificacao = (message, type) => NotificationManager.show(message, type);
window.confirmarAcao = (message, callback) => {
  if (confirm(message)) callback();
};
window.formatarData = Utils.formatDate;
window.toggleTheme = () => ThemeManager.toggle();