<template>
  <form class="item-form" @submit.prevent="handleSubmit" novalidate>

    <!-- ─── Название ─── -->
    <div class="form-group" :class="{ 'form-group--error': errors.title }">
      <label for="f-title">Название фильма *</label>
      <input
        id="f-title"
        v-model="form.title"
        placeholder="Например: Интерстеллар"
        autocomplete="off"
      />
      <span class="form-error" v-if="errors.title">{{ errors.title }}</span>
    </div>

    <!-- ─── Описание ─── -->
    <div class="form-group" :class="{ 'form-group--error': errors.description }">
      <label for="f-desc">Описание *</label>
      <textarea
        id="f-desc"
        v-model="form.description"
        rows="5"
        placeholder="Краткое описание сюжета..."
      ></textarea>
      <span class="form-error" v-if="errors.description">{{ errors.description }}</span>
    </div>

    <!-- ─── Жанр ─── -->
    <div class="form-group" :class="{ 'form-group--error': errors.category }">
      <label for="f-cat">Жанр *</label>
      <select id="f-cat" v-model="form.category">
        <option value="" disabled>Выберите жанр...</option>
        <option v-for="g in GENRES" :key="g" :value="g">{{ g }}</option>
      </select>
      <span class="form-error" v-if="errors.category">{{ errors.category }}</span>
    </div>

    <!-- ─── Кнопки ─── -->
    <div class="form-actions">
      <router-link to="/" class="btn-cancel">Отмена</router-link>
      <button type="submit" class="btn-submit">{{ submitLabel }}</button>
    </div>

  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  initial:     { type: Object, default: () => ({ title: '', description: '', category: '' }) },
  submitLabel: { type: String, default: 'Сохранить' }
})
const emit = defineEmits(['submit'])

const GENRES = [
  'Боевик', 'Драма', 'Комедия', 'Триллер', 'Ужасы',
  'Фантастика', 'Аниме', 'Документальный', 'Мультфильм', 'Криминал', 'Романтика'
]

const form   = reactive({ title: props.initial.title, description: props.initial.description, category: props.initial.category })
const errors = reactive({ title: '', description: '', category: '' })

// Синхронизация при изменении initial (режим редактирования)
watch(() => props.initial, val => {
  form.title       = val.title
  form.description = val.description
  form.category    = val.category
}, { deep: true })

// ─── Валидация ───────────────────────────────────────────────────────────
function validate() {
  errors.title       = ''
  errors.description = ''
  errors.category    = ''
  let valid = true

  if (!form.title.trim()) {
    errors.title = 'Введите название фильма'
    valid = false
  } else if (form.title.trim().length < 2) {
    errors.title = 'Название слишком короткое'
    valid = false
  }

  if (!form.description.trim()) {
    errors.description = 'Введите описание'
    valid = false
  } else if (form.description.trim().length < 10) {
    errors.description = 'Описание слишком короткое (минимум 10 символов)'
    valid = false
  }

  if (!form.category) {
    errors.category = 'Выберите жанр'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', {
    title:       form.title.trim(),
    description: form.description.trim(),
    category:    form.category
  })
}
</script>

<style scoped>
.item-form {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group--error input,
.form-group--error textarea,
.form-group--error select {
  border-color: var(--danger);
  box-shadow: 0 0 0 3px var(--danger-dim);
}

.form-error {
  font-size: 0.8rem;
  color: var(--danger);
  margin-top: 0.1rem;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}

.btn-cancel {
  padding: 0.6rem 1.3rem;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
}
.btn-cancel:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-dim);
}

.btn-submit {
  background: var(--primary);
  color: #fff;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 10px;
}
.btn-submit:hover { background: var(--primary-hover); }

@media (max-width: 480px) {
  .item-form { padding: 1.25rem; }
  .form-actions { flex-direction: column-reverse; }
  .btn-cancel, .btn-submit { width: 100%; text-align: center; }
}
</style>
