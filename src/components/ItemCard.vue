<template>
  <article class="card" :class="{ 'card--done': item.isDone }">

    <div class="card__header">
      <span class="card__category">{{ item.category }}</span>
      <span v-if="item.isDone" class="card__watched">✓ Просмотрено</span>
    </div>

    <h3 class="card__title">{{ item.title }}</h3>
    <p class="card__desc">{{ item.description }}</p>

    <div class="card__footer">
      <time class="card__date">{{ formatDate(item.createdAt) }}</time>

      <div class="card__actions">
        <button
          class="action-btn"
          :title="item.isDone ? 'Снять отметку' : 'Отметить просмотренным'"
          @click="$emit('toggle', item.id)"
        >
          {{ item.isDone ? '↩' : '✓' }}
        </button>

        <router-link :to="`/edit/${item.id}`" class="action-btn" title="Редактировать">
          ✎
        </router-link>

        <button
          class="action-btn action-btn--danger"
          title="Удалить"
          @click="$emit('delete', item.id)"
        >
          ✕
        </button>
      </div>
    </div>

  </article>
</template>

<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['toggle', 'delete'])

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('ru-RU', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}
</script>

<style scoped>
.card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  transition: box-shadow var(--transition), transform var(--transition), border-color var(--transition);
  cursor: default;
}

/* Hover-эффект */
.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
  border-color: var(--primary);
}

/* Просмотренный фильм визуально отличается */
.card--done {
  background: color-mix(in srgb, var(--surface) 85%, var(--success));
  border-color: color-mix(in srgb, var(--border) 60%, var(--success));
  opacity: 0.85;
}

/* ─── Header ─── */
.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.card__category {
  background: var(--primary-dim);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  letter-spacing: 0.02em;
}

.card__watched {
  background: var(--success-dim);
  color: var(--success);
  font-size: 0.73rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
}

/* ─── Title ─── */
.card__title {
  font-family: 'Syne', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

/* Зачёркнутый заголовок для просмотренного */
.card--done .card__title {
  text-decoration: line-through;
  color: var(--text-muted);
}

/* ─── Description ─── */
.card__desc {
  color: var(--text-muted);
  font-size: 0.875rem;
  line-height: 1.55;
  flex: 1;
  /* Clamp до 3 строк */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ─── Footer ─── */
.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.card__date {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.card__actions { display: flex; gap: 0.35rem; }

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 0.5rem;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 0.9rem;
  text-decoration: none;
  transition: all var(--transition);
  cursor: pointer;
}
.action-btn:hover {
  background: var(--primary-dim);
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-1px);
}
.action-btn--danger:hover {
  background: var(--danger-dim);
  border-color: var(--danger);
  color: var(--danger);
}
</style>
