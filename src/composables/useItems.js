import { ref, computed } from 'vue'
import { saveItems, initDataIfEmpty } from '../services/storage.js'

// Singleton: массив хранится на уровне модуля
const items = ref([])

// Инициализация: загрузка из localStorage (или демо-данные)
items.value = initDataIfEmpty()

export function useItems() {
  // Computed: активные (не удалённые) фильмы
  const activeItems = computed(() => items.value.filter(i => !i.deletedAt))

  // Computed: фильмы в архиве (soft-deleted)
  const archivedItems = computed(() => items.value.filter(i => !!i.deletedAt))

  // Computed: счётчики
  const totalCount   = computed(() => activeItems.value.length)
  const activeCount  = computed(() => activeItems.value.filter(i => !i.isDone).length)
  const doneCount    = computed(() => activeItems.value.filter(i => i.isDone).length)
  const deletedCount = computed(() => archivedItems.value.length)

  // Добавить новый фильм
  function addItem(data) {
    const newItem = {
      id:          crypto.randomUUID(),
      title:       data.title.trim(),
      description: data.description.trim(),
      category:    data.category,
      createdAt:   Date.now(),
      isDone:      false,
      deletedAt:   null
    }
    items.value.push(newItem)
    // Сохранение после каждого изменения
    saveItems(items.value)
  }

  // Обновить существующий фильм
  function updateItem(id, data) {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      items.value[idx] = { ...items.value[idx], ...data }
      saveItems(items.value)
    }
  }

  // Переключить статус "просмотрено"
  function toggleDone(id) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.isDone = !item.isDone
      saveItems(items.value)
    }
  }

  // Мягкое удаление (в архив) 
  function softDelete(id) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.deletedAt = Date.now()
      saveItems(items.value)
    }
  }

  // Восстановить из архива 
  function restoreItem(id) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.deletedAt = null
      saveItems(items.value)
    }
  }

  //  Удалить навсегда 
  function deleteForever(id) {
    items.value = items.value.filter(i => i.id !== id)
    saveItems(items.value)
  }

  //  Найти фильм по ID 
  function getItemById(id) {
    return items.value.find(i => i.id === id) ?? null
  }

  return {
    items,
    activeItems,
    archivedItems,
    totalCount,
    activeCount,
    doneCount,
    deletedCount,
    addItem,
    updateItem,
    toggleDone,
    softDelete,
    restoreItem,
    deleteForever,
    getItemById
  }
}
