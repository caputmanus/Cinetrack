// Ключи хранилища (вынесены в константы)
const KEYS = {
  ITEMS:    'cinetrack_items',
  SETTINGS: 'cinetrack_settings'
}

// Начальные демо-данные
const DEMO_ITEMS = [
  {
    id: crypto.randomUUID(),
    title: 'Начало',
    description: 'Вор, похищающий корпоративные секреты через технологию совместных сновидений, получает обратное задание — внедрить идею в сознание генерального директора.',
    category: 'Фантастика',
    createdAt: Date.now() - 86400000 * 5,
    isDone: true,
    deletedAt: null
  },
  {
    id: crypto.randomUUID(),
    title: 'Побег из Шоушенка',
    description: 'Два заключённых сближаются за долгие годы, находя утешение и в конечном счёте искупление через общую человечность.',
    category: 'Драма',
    createdAt: Date.now() - 86400000 * 3,
    isDone: false,
    deletedAt: null
  },
  {
    id: crypto.randomUUID(),
    title: 'Тёмный рыцарь',
    description: 'Бэтмен поднимает ставки в войне с преступностью Готэма, столкнувшись с преступником, известным как Джокер, который сеет хаос и анархию.',
    category: 'Боевик',
    createdAt: Date.now() - 86400000 * 1,
    isDone: false,
    deletedAt: null
  },
  {
    id: crypto.randomUUID(),
    title: 'Унесённые призраками',
    description: 'Девочка попадает в загадочный мир духов и ищет способ спасти своих родителей, превращённых в свиней жестокой колдуньей.',
    category: 'Аниме',
    createdAt: Date.now() - 86400000 * 2,
    isDone: true,
    deletedAt: null
  }
]

//  Чтение фильмов из localStorage 
export function getItems() {
  try {
    const raw = localStorage.getItem(KEYS.ITEMS)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('[storage] getItems failed:', e)
    return []
  }
}

//  Сохранение фильмов в localStorage 
export function saveItems(items) {
  try {
    localStorage.setItem(KEYS.ITEMS, JSON.stringify(items))
  } catch (e) {
    console.error('[storage] saveItems failed:', e)
  }
}

//  Чтение настроек из localStorage 
export function getSettings() {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('[storage] getSettings failed:', e)
    return null
  }
}

//  Сохранение настроек в localStorage 
export function saveSettings(settings) {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings))
  } catch (e) {
    console.error('[storage] saveSettings failed:', e)
  }
}

//  Инициализация начальными данными, если хранилище пусто 
export function initDataIfEmpty() {
  const existing = getItems()
  if (existing.length === 0) {
    saveItems(DEMO_ITEMS)
    return DEMO_ITEMS
  }
  return existing
}

