<template>
  <li class="note">
    <span class="note__number">{{index + 1}}.</span>
    <div class="note__title-container">
      <span class="note__title">{{note.title}}</span>
    </div>
    <div class="note__buttons">
      <router-link :to="{ name: 'Edit', params: {note: note}}">
        <button type="button" class="edit note__edit" />
      </router-link>
      <button type="button" class="delete note__delete" v-on:click="removeNote" />
    </div>
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
    <hr class="hr">
    <ul
      class="notes__todos"
      v-for="(todo, index) of [...note.todos].splice(0, 3)"
      :key="todo.id"
    >
      <li class="notes__todo">
        <span class="notes__todo-number">{{index + 1}}.</span>
        <span class="notes__todo-title" v-bind:class="{todo__done: todo.completed}">
          {{todo.title}}
        </span>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    index: Number
  },
  data () {
    return {
      removeNoteForm: false
    }
  },
  methods: {
    removeNote () {
      this.removeNoteForm = true
    },
    confirmRemoveNote () {
      this.$store.dispatch('deleteNote', this.note.id)
      localStorage.setItem('notes', JSON.stringify(this.$store.getters.allNotes))
      this.removeNoteForm = false
    }
  }
}
</script>

<style scoped>
  .note {
    max-width: 1000px;
    max-height: 150px;
    padding: 20px 20px 10px;
    margin: 0 auto 30px;
    border-radius: 7px;
    box-shadow: 0 0 10px -1px rgba(0,0,0,0.81);
  }

  .hr {
    width: 95%;
    margin: 20px auto;
  }

  .todo__done {
    text-decoration: line-through;
  }

  .note__buttons {
    position: relative;
    bottom: 40px;
    right: -20px;
  }

  .note__delete {
    display: none;
    position: absolute;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    top: 5px;
    right: 10px;
    width: 30px;
    font-size: 40px;
    font-family: arial;
    color: #42b983;
    outline: none;
    transition: color 0.2s ease-out;
    cursor: pointer;
  }

  .note__delete:after {
    content: "×";
  }

  .note .note__delete:hover {
    color: #266649;
  }

  .note:hover .note__delete {
    display: block;
  }

  .note__edit {
    display: none;
    position: absolute;
    top: 17px;
    right: 42px;
    margin: auto 0;
    opacity: 0.7;
    background: none;
    border-style: none;
    transition: color 0.2s ease-out;
    cursor: pointer;
  }

  .note__edit:after {
    content: "";
    display: block;
    margin: 0 auto;
    width: 18px;
    height: 18px;
    background-image: url("../img/icon-green.png");
    background-size: contain;
    background-position: center;
  }

  .note:hover .note__edit {
    display: block;
  }

  .note .note__edit:hover {
    opacity: 1;
  }

  .note__number {
    margin-right: 10px;
    font-size: 16px;
    font-weight: 600;
  }

  .note__title {
    font-size: 20px;
  }

  .note__title-container {
    max-width: 900px;
    padding-right: 50px;
    display: inline-block;
  }

  .notes__todos {
    padding-left: 30px;
  }

  .notes__todo {
    margin-bottom: 10px;
  }

  .notes__todo-number {
    margin-right: 10px;
    font-size: 14px;
    font-weight: 500;
  }

  .notes__todo-title {
    font-size: 15px;
  }
</style>
