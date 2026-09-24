const floors = {
  1: {
    overline: 'ПРАКТИКА И ВСТРЕЧА',
    heading: 'Вход, кластер, открытые события',
    description: 'Публичный первый этаж показывает технологии в работе и разделяет потоки посетителей, студентов и доставки оборудования.',
    zones: ['Атриум и демонстрационная галерея', 'Сварочные посты и металлообработка', 'Мастерские ЧПУ с обзором из атриума', 'Отдельная логистика и безопасный маршрут'],
    area: '≈ 2 800 м²'
  },
  2: {
    overline: 'ТЕХНОЛОГИИ И ПРОЕКТЫ',
    heading: 'ЧПУ, лаборатории, проектные команды',
    description: 'Цифровое ядро кампуса соединяет подготовку управляющих программ, измерения и работу над реальными производственными задачами.',
    zones: ['Лаборатория ЧПУ и цифрового производства', '3D-моделирование и CAD/CAM', 'Автоматизация и промышленная электроника', 'Проектные зоны и аудитории партнёров'],
    area: '≈ 2 400 м²'
  },
  3: {
    overline: 'МЕТОДИКА И РАЗВИТИЕ',
    heading: 'Педагоги, наставники, обмен опытом',
    description: 'Верхний уровень превращает опыт кластера в тиражируемые программы для колледжей и предприятий региона.',
    zones: ['Центр методического сопровождения', 'Аудитории повышения квалификации', 'Студия цифровых курсов и медиатека', 'Переговорные и штаб индустриальных проектов'],
    area: '≈ 1 600 м²'
  }
};

const floorTabs = [...document.querySelectorAll('.floor-tab')];
const floorPanel = document.getElementById('floor-panel');

function showFloor(number, focus = false) {
  const floor = floors[number];
  if (!floor || !floorPanel) return;

  floorTabs.forEach((tab) => {
    const active = tab.dataset.floor === String(number);
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });

  floorPanel.setAttribute('aria-labelledby', `tab-${number}`);
  document.getElementById('floor-overline').textContent = floor.overline;
  document.getElementById('floor-heading').textContent = floor.heading;
  document.getElementById('floor-description').textContent = floor.description;
  document.getElementById('floor-area').firstChild.textContent = `${floor.area} `;

  const zoneList = document.getElementById('floor-zones');
  zoneList.replaceChildren(...floor.zones.map((zone) => {
    const item = document.createElement('li');
    item.textContent = zone;
    return item;
  }));
}

floorTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showFloor(tab.dataset.floor));
  tab.addEventListener('keydown', (event) => {
    const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!offset && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? floorTabs.length - 1 : (index + offset + floorTabs.length) % floorTabs.length;
    showFloor(floorTabs[next].dataset.floor, true);
  });
});
showFloor(1);

const cncTabs = [...document.querySelectorAll('.cnc-program-tab')];
const cncExamples = [...document.querySelectorAll('.cnc-examples > .cnc-example')];

function showCncProgram(number, focus = false) {
  const activeTab = cncTabs.find((tab) => tab.dataset.cncTab === String(number));
  const activeExample = cncExamples.find((example) => example.id === `cnc-part-${number}`);
  if (!activeTab || !activeExample) return;

  cncTabs.forEach((tab) => {
    const active = tab === activeTab;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  cncExamples.forEach((example) => {
    const active = example === activeExample;
    example.hidden = !active;
    example.setAttribute('aria-hidden', String(!active));
  });
}

cncTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showCncProgram(tab.dataset.cncTab));
  tab.addEventListener('keydown', (event) => {
    const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!offset && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? cncTabs.length - 1 : (index + offset + cncTabs.length) % cncTabs.length;
    showCncProgram(cncTabs[next].dataset.cncTab, true);
  });
});
showCncProgram(1);

const professionalitetTabs = [...document.querySelectorAll('.professionalitet-tab')];
const professionalitetPanels = [...document.querySelectorAll('.professionalitet-panel')];

function showProfessionalitetCluster(number, focus = false) {
  const activeTab = professionalitetTabs.find((tab) => tab.dataset.profiTab === String(number));
  const activePanel = professionalitetPanels.find((panel) => panel.id === `profi-panel-${number}`);
  if (!activeTab || !activePanel) return;

  professionalitetTabs.forEach((tab) => {
    const active = tab === activeTab;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  professionalitetPanels.forEach((panel) => {
    const active = panel === activePanel;
    panel.hidden = !active;
    panel.setAttribute('aria-hidden', String(!active));
  });
}

professionalitetTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showProfessionalitetCluster(tab.dataset.profiTab));
  tab.addEventListener('keydown', (event) => {
    const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!offset && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? professionalitetTabs.length - 1 : (index + offset + professionalitetTabs.length) % professionalitetTabs.length;
    showProfessionalitetCluster(professionalitetTabs[next].dataset.profiTab, true);
  });
});
showProfessionalitetCluster(1);

const filters = [...document.querySelectorAll('.filter')];
const directions = [...document.querySelectorAll('.direction-card')];
const filterStatus = document.getElementById('filter-status');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    directions.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
    const visible = directions.filter((card) => !card.hidden).length;
    filterStatus.textContent = `Показано направлений: ${visible} из ${directions.length}`;
  });
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => {
  if (navigation.classList.contains('is-open') && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
