const main = document.querySelector('main');
const storageKey = 'almx-academy-v1';
const topics = ['Todos', ...new Set(lessons.map(lesson => lesson.topic))];
let state = { completed: [], practices: [], notes: [] };
let topic = 'Todos';
let scenario = 0;
let editing = null;
let storageError = false;

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && ['completed', 'practices', 'notes'].every(key => Array.isArray(saved[key]))) state = saved;
} catch {
  storageError = true;
}

function save(next, target, message) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
    state = next;
    status(target, message, true);
    return true;
  } catch {
    status(target, 'O navegador não salvou a alteração. Verifique se o armazenamento está disponível e tente novamente.', false);
    return false;
  }
}

const icons = {
  box: 'M3 7l9-4 9 4v10l-9 4-9-4V7zm0 0 9 4 9-4m-9 4v10m-4.5-16 9 4',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  chart: 'M4 4v16h16M8 16v-3m5 3V9m5 7V5',
  system: 'M3 5h18v12H3zM8 21h8m-4-4v4M7 9h4m-4 4h9',
  bolt: 'M13 2 4 14h7l-1 8 10-12h-7l1-8Z',
  shield: 'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-3-10 2 2 4-4'
};

function icon(name) {
  return '<span class="symbol"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="' + icons[name] + '"/></svg></span>';
}

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

function cards(items) {
  return '<div class="grid">' + items.map(lesson => {
    const done = state.completed.includes(lesson.id);
    return `<a class="module" href="#aula/${lesson.id}">
      <div class="module-top">${icon(lesson.icon)}<span class="meta">${lesson.time} min</span></div>
      <div class="eyebrow">${lesson.topic}</div><h3>${lesson.title}</h3><p>${lesson.summary}</p>
      <div class="module-bottom"><span class="${done ? 'done' : ''}">${done ? '✓ Concluído' : 'Abrir módulo'}</span><span aria-hidden="true">↗</span></div>
    </a>`;
  }).join('') + '</div>';
}

function heading(title, description) {
  return `<header class="heading"><h1>${title}</h1><p>${description}</p></header>`;
}

function home() {
  const completed = lessons.filter(lesson => state.completed.includes(lesson.id)).length;
  const next = lessons.find(lesson => !state.completed.includes(lesson.id));
  const percent = Math.round(completed / lessons.length * 100);
  return `<section class="hero"><div class="hero-copy">
    <p class="eyebrow">Trilha para auxiliar de logística</p>
    <h1>Almoxarifado no setor elétrico</h1>
    <p>Estude a rotina de estoque, pratique contagem e apontamento e aprenda como essas operações chegam ao ERP.</p>
    <div class="row"><a class="btn" href="${next ? '#aula/' + next.id : '#modulos'}">${completed && next ? 'Continuar estudos' : next ? 'Começar a trilha' : 'Revisar módulos'} →</a>
    <a class="btn secondary" href="#pratica">Abrir simulador</a></div>
    </div></section>
    <section class="stats" aria-label="Indicadores de estudo">
      <div class="stat"><span>Progresso da trilha</span><strong>${percent}%</strong><progress value="${completed}" max="${lessons.length}" aria-label="Progresso da trilha"></progress></div>
      <div class="stat"><span>Módulos concluídos</span><strong>${completed} / ${lessons.length}</strong></div>
      <div class="stat"><span>Exercícios práticos concluídos</span><strong>${state.practices.length} / ${scenarios.length}</strong></div>
    </section>
    <section><div class="section-title"><div><h2>Trilha de estudos</h2><p>Da primeira conferência à investigação de divergências.</p></div><a href="#modulos">Ver todos os módulos →</a></div>
    ${cards(lessons)}</section>`;
}

function modules() {
  return heading('Módulos de estudo', 'Escolha um tema ou siga a ordem da trilha. Cada módulo termina com uma questão comentada.') +
    `<div class="row filter" aria-label="Filtrar por tema">${topics.map(name =>
      `<button class="btn secondary small" data-topic="${name}" aria-pressed="${topic === name}">${name}</button>`).join('')}</div>
    <div id="module-results">${cards(filteredLessons())}</div>`;
}

function filteredLessons() {
  return topic === 'Todos' ? lessons : lessons.filter(lesson => lesson.topic === topic);
}

function lessonPage(lesson) {
  const [question, options] = lesson.quiz;
  const done = state.completed.includes(lesson.id);
  return `<div class="narrow"><a class="back" href="#modulos">← Todos os módulos</a>
    <p class="eyebrow">${lesson.topic} · ${lesson.time} min</p>${heading(lesson.title, lesson.summary)}
    ${lesson.sections.map(([title, paragraph]) => `<section class="panel"><h2>${title}</h2><p>${paragraph}</p></section>`).join('')}
    ${lesson.link ? `<p><a href="${lesson.link[1]}" target="_blank" rel="noopener noreferrer">${lesson.link[0]} ↗</a></p>` : ''}
    <form class="panel" id="quiz"><p class="eyebrow">Verificação de aprendizagem</p><fieldset><legend>${question}</legend>
    ${options.map((option, index) => `<label class="choice"><input required type="radio" name="answer" value="${index}"> ${option}</label>`).join('')}
    </fieldset><div class="row"><button class="btn" type="submit">Verificar resposta</button><span id="lesson-completion" class="done">${done ? '✓ Módulo concluído' : ''}</span></div>
    <p class="feedback" id="quiz-feedback" role="status"></p></form></div>`;
}

function practice() {
  const item = scenarios[scenario];
  const fields = [['Material', item.item], ['Código', item.code], ['Endereço', item.location], ['Unidade', item.unit], ['Saldo ERP', item.balance]];
  return `<div class="narrow">${heading('Simulador de estoque', 'Faça o apontamento físico e calcule a diferença em casos fictícios de inventário.')}
    <label class="field">Caso<select id="scenario">${scenarios.map((entry, index) =>
      `<option value="${index}" ${index === scenario ? 'selected' : ''}>${entry.item}${state.practices.includes(index) ? ' (concluído)' : ''}</option>`).join('')}</select></label>
    <form class="panel" id="exercise"><h2>${item.item}</h2>
    <dl class="inventory">${fields.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>
    <p>${item.evidence}</p>
    <label class="field">Quantidade física (${item.unit})<input name="quantity" type="number" min="0" step="1" required></label>
    <label class="field">Diferença (físico menos saldo ERP)<input name="difference" type="number" step="1" required></label>
    <label class="field">Encaminhamento<select name="action" required>
      <option value="">Selecione uma opção</option><option value="validate">Registrar e encaminhar divergência para conferência</option>
      <option value="match">Registrar contagem sem divergência</option><option value="adjust">Alterar o saldo imediatamente</option>
    </select></label>
    <button class="btn" type="submit">Conferir apontamento</button>
    <p id="practice-feedback" class="feedback" role="status"></p></form></div>`;
}

function journal() {
  const note = state.notes.find(entry => entry.id === editing);
  return `<div class="narrow">${heading('Minhas anotações', 'Registre aprendizados e dúvidas. As anotações e o progresso ficam neste navegador. Use exemplos sem dados internos.')}
    <p id="journal-feedback" role="status"></p>
    <form class="panel" id="note-form">
      <label class="field">Título<input name="title" maxlength="100" required value="${escapeHTML(note?.title ?? '')}"></label>
      <label class="field">Anotação<textarea name="body" maxlength="5000" required>${escapeHTML(note?.body ?? '')}</textarea></label>
      <div class="row"><button class="btn" type="submit">${note ? 'Salvar edição' : 'Salvar anotação'}</button>
      ${note ? '<button class="btn secondary" type="button" data-cancel>Cancelar edição</button>' : ''}</div>
    </form>
    <div class="section-title"><h2>Anotações salvas</h2></div>
    ${state.notes.length ? state.notes.map(entry => `<article class="panel">
      <h3 class="note-title">${escapeHTML(entry.title)}</h3><p class="note-text">${escapeHTML(entry.body)}</p>
      <div class="row"><button class="btn secondary small" data-edit="${escapeHTML(entry.id)}">Editar</button>
      <button class="btn secondary small" data-delete="${escapeHTML(entry.id)}">Excluir</button></div></article>`).join('') :
      '<p>Suas anotações aparecerão aqui.</p>'}
    </div>`;
}

function status(id, text, success) {
  const target = document.getElementById(id);
  target.textContent = text;
  target.classList.toggle('success', success);
  target.classList.toggle('error', !success);
}

function render(moveFocus = false) {
  const [route, slug] = location.hash.slice(1).split('/');
  const lesson = route === 'aula' && lessons.find(entry => entry.id === slug);
  const pages = { inicio: home, modulos: modules, pratica: practice, diario: journal };
  const active = lesson ? 'modulos' : Object.hasOwn(pages, route) ? route : 'inicio';
  main.innerHTML = lesson ? lessonPage(lesson) : pages[active]();
  if (storageError) {
    const warning = document.createElement('p');
    warning.textContent = 'Não foi possível ler os dados salvos neste navegador.';
    main.prepend(warning);
  }
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.title = lesson ? lesson.title + ' | ALMX Academy' : 'ALMX Academy | Energia & Logística';
  if (moveFocus) {
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

main.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  if (form.id === 'quiz') {
    const lesson = lessons.find(entry => entry.id === location.hash.split('/')[1]);
    const [, , correct, explanation] = lesson.quiz;
    if (Number(data.get('answer')) !== correct) {
      status('quiz-feedback', 'Revise a aula e tente novamente.', false);
    } else if (state.completed.includes(lesson.id) ||
      save({ ...state, completed: [...state.completed, lesson.id] }, 'quiz-feedback', explanation)) {
      status('quiz-feedback', 'Correto! ' + explanation, true);
      document.getElementById('lesson-completion').textContent = '✓ Módulo concluído';
    }
  }
  if (form.id === 'exercise') {
    const item = scenarios[scenario];
    const difference = item.count - item.balance;
    if (Number(data.get('quantity')) !== item.count || Number(data.get('difference')) !== difference ||
      data.get('action') !== (difference === 0 ? 'match' : 'validate')) {
      status('practice-feedback', 'Revise a quantidade física, o sinal da diferença e o encaminhamento escolhido.', false);
      return;
    }
    const message = `Correto! Foram apontados ${item.count} ${item.unit}, com diferença de ${difference} ${item.unit}.`;
    if (state.practices.includes(scenario) ||
      save({ ...state, practices: [...state.practices, scenario] }, 'practice-feedback', message)) {
      status('practice-feedback', message, true);
      document.getElementById('scenario').selectedOptions[0].textContent = item.item + ' (concluído)';
    }
  }
  if (form.id === 'note-form') {
    const title = data.get('title').trim();
    const body = data.get('body').trim();
    if (!title || !body) return status('journal-feedback', 'Preencha o título e a anotação.', false);
    const id = editing ?? (Date.now().toString(36) + Math.random().toString(36).slice(2));
    const note = { id, title, body };
    const notes = editing ? state.notes.map(entry => entry.id === editing ? note : entry) : [note, ...state.notes];
    if (save({ ...state, notes }, 'journal-feedback', 'Anotação salva.')) {
      editing = null;
      render();
      status('journal-feedback', 'Anotação salva.', true);
      document.querySelector('#note-form input').focus();
    }
  }
});

main.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.topic) {
    topic = button.dataset.topic;
    main.querySelectorAll('[data-topic]').forEach(filter =>
      filter.setAttribute('aria-pressed', String(filter === button)));
    document.getElementById('module-results').innerHTML = cards(filteredLessons());
  }
  if (button.dataset.edit || button.hasAttribute('data-cancel')) {
    editing = button.dataset.edit ?? null;
    render();
    document.querySelector('#note-form input').focus();
  }
  if (button.dataset.delete && window.confirm('Excluir esta anotação?')) {
    const notes = state.notes.filter(note => note.id !== button.dataset.delete);
    if (save({ ...state, notes }, 'journal-feedback', 'Anotação excluída.')) {
      if (editing === button.dataset.delete) editing = null;
      render();
      status('journal-feedback', 'Anotação excluída.', true);
      document.querySelector('#note-form input').focus();
    }
  }
});

main.addEventListener('change', event => {
  if (event.target.id === 'scenario') {
    scenario = Number(event.target.value);
    render();
    document.getElementById('scenario').focus();
  }
});

document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});

window.addEventListener('hashchange', () => {
  editing = null;
  render(true);
});
render();
