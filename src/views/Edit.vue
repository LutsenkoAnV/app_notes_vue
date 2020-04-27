<template>
  <div class="edit__empty" v-if="!note">
    <router-link to="/">
      Home
    </router-link>
  </div>
  <div v-else class="edit">
    <h1>Edit note</h1>
    <form class="edit__form" v-on:submit.prevent="saveEditNote">
      <input
        class="input edit__input"
        type="text"
        placeholder="Enter note"
        v-model="title"
        v-on:change="handleChangeNote"
      >
      <div class="edit__buttons">
        <button class="button edit__button" type="submit">
          Save
        </button>
        <button
          class="button edit__button"
          type="button"
          v-on:click="returnChanges"
        >
          Return changes
        </button>
        <button
          class="button edit__button"
          type="button"
          v-on:click="deleteChanges"
        >
          Delete changes
        </button>
        <button
          class="button edit__button"
          type="button"
          v-on:click="cancelNoteForm = true"
        >
          Cancel
        </button>
        <div class="confirm-form__container" v-if="cancelNoteForm">
          <div class="confirm-form">
            <span>Confirm cancel?</span>
            <div class="confirm-form__buttons">
              <button
                class="confirm-form__button"
                type="button"
                v-on:click="confirmCancelEdit"
              >
                Confirm
              </button>
              <button
                class="confirm-form__button"
                type="button"
                v-on:click="cancelNoteForm = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <button
          class="button edit__button"
          type="button"
          v-on:click="removeNoteForm = true"
        >
          Delete
        </button>
        <div class="confirm-form__container" v-if="removeNoteForm">
          <div class="confirm-form">
            <span>Delete this note?</span>
            <div class="confirm-form__buttons">
              <button
                class="confirm-form__button"
                type="button"
                v-on:click="confirmRemoveNote"
              >
                Confirm
              </button>
              <button
                class="confirm-form__button"
                type="button"
                v-on:click="removeNoteForm = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <h2>Todos</h2>
    <form class="todos__form" v-on:submit.prevent="addTodo">
      <input class="input todos__input" type="text" v-model="queryTodo">
      <button class="button todos__button" type="submit">
        Add todo
      </button>
    </form>
    <p v-if="!todos.length" class="todos__empty">
      no todos
    </p>
    <ul v-else class="todos__list">
      <li
        class="todos__item"
        v-for="todo of todos"
        :key="todo.id"
      >
        <div class="todo__item--left">
          <input
            class="todo__checkbox"
            type="checkbox"
            :checked="todo.completed"
            v-on:change="todo.completed = !todo.completed"
          >
          <div v-if="editTodoId !== todo.id" class="todo__title-container">
            <span class="todo__title" v-bind:class="{todo__done: todo.completed}">
              {{todo.title}}
            </span>
          </div>
          <form
            v-else
            class="todo__edit-form"
            v-on:submit.prevent="saveTodoChanges(todo.id)"
          >
            <input
              class="todo__edit-input"
              type="text"
              v-model.lazy="todo.title"
              v-on:change="handleChangeTodo"
              v-focus
              v-on:blur="saveTodoChanges(todo.id)"
            >
          </form>
        </div>
        <div class="todo__item--right">
          <button
            class="todo__button"
            v-if="editTodoId !== todo.id"
            type="button"
            v-on:click="editTodo(todo.id, todo.title)"
          >
            Edit
          </button>
          <button
            class="todo__button"
            v-if="editTodoId !== todo.id"
            type="button"
            v-on:click="deleteTodo(todo.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'Edit',
  props: ['note'],
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data () {
    return {
      todos: this.note.todos,
      title: this.note.title,
      queryNote: '',
      cancelNoteForm: false,
      removeNoteForm: false,
      queryTodo: '',
      editTodoId: '',
      editedQueryTodo: ''
    }
  },
  methods: {
    handleChangeNote (event) {
      const { value } = event.target
      this.queryNote = value
      this.title = this.queryNote
    },
    deleteChanges () {
      this.title = this.note.title
    },
    returnChanges () {
      if (this.queryNote) {
        this.title = this.queryNote
      }
    },
    confirmCancelEdit () {
      this.$router.push({ path: '/' })
    },
    confirmRemoveNote () {
      this.$store.dispatch('deleteNote', this.note.id)
      localStorage.setItem('notes', JSON.stringify(this.$store.getters.allNotes))
      this.$router.push({ path: '/' })
    },
    addTodo () {
      if (this.queryTodo.trim()) {
        const newTodo = {
          id: uuidv4(),
          title: this.queryTodo,
          completed: false
        }

        this.todos.push(newTodo)
        this.queryTodo = ''
      }
    },
    deleteTodo (id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    editTodo (id, title) {
      this.editTodoId = id
      this.editedQueryTodo = title
    },
    handleChangeTodo (event) {
      const { value } = event.target
      this.editedQueryTodo = value
    },
    saveTodoChanges (id) {
      if (this.editedQueryTodo.trim()) {
        this.todos = this.todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              title: this.editedQueryTodo
            }
          }

          return todo
        })
        this.editedQueryTodo = ''
        this.editTodoId = ''
      }
    },
    saveEditNote () {
      if (!this.title) {
        return
      }

      const newNote = {
        id: this.note.id,
        title: this.title,
        todos: this.todos
      }

      this.$store.dispatch('saveEditNote', newNote)
      localStorage.setItem('notes', JSON.stringify(this.$store.getters.allNotes))
      this.$router.push({ path: '/' })
    }
  },
  mounted () {
    this.popupItem = this.$el
  }
}
</script>

<style scoped>
  .edit__empty {
    display: flex;
    justify-content: center;
    margin: 30px;
  }

  .edit {
    padding: 0 15px;
    text-align: center;
  }

  .edit__form {
    margin: 0 auto;
    padding: 20px;
    max-width: 1000px;
  }

  .edit__input {
    width: 100%;
    height: 38px;
  }

  .edit__buttons {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .edit__button {
    width: 180px;
    height: 40px;
    font-size: 15px;
    margin-bottom: 10px;
  }

  .edit__button:not(:last-child) {
    margin-right: 5px;
  }

  .todos__empty {
    font-size: 20px;
    font-style: italic;
    color: grey;
  }

  .todos__list {
    margin-bottom: 40px;
  }

  .todos__form {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .todos__input {
    width: 560px;
    height: 38px;
  }

  .todos__button {
    width: 120px;
    height: 38px;
    font-size: 14px;
  }

  .todos__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    min-height: 50px;
    margin: 0 auto;
    padding: 10px;
    border-bottom: 1px solid black;
    flex-wrap: wrap;
  }

  .todo__item--left {
    display: flex;
    align-items: center;
    max-width: 750px;
  }

  .todo__checkbox {
    min-width: 20px;
    min-height: 20px;
    margin: 0 20px 0 0;
  }

  .todo__title {
    font-size: 16px;
    line-height: 20px;
  }

  .todo__title-container {
    max-width: 750px;
    text-align: start;
  }

  .todo__done {
    text-decoration: line-through;
  }

  .todo__button {
    width: 80px;
    height: 30px;
    margin: 5px 10px 5px 0;
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    background-color: #555657;
    border-radius: 4px;
    border: 1px solid #555657;
    cursor: pointer;
    color: #fff;
    transition: 0.3s;
  }

  .todo__button:hover {
    background-color: #fff;
    color: #555657;
  }

  .todo__edit-form {
    height: 30px;
    width: 600px;
  }

  .todo__edit-input {
    box-sizing: border-box;
    margin-bottom: 30px;
    padding: 5px 11px;
    width: 100%;
    font-size: 16px;
    line-height: 20px;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    color: #363636;
    transition: 0.2s;
  }
</style>
