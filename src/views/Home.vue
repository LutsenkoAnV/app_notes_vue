<template>
  <main class="main">
    <div class="notes__button-container">
      <button
        type="button"
        class="button notes__button"
        v-on:click="noteForm = true"
      >
        new note
      </button>
    </div>
    <div v-if="noteForm" class="note-add__container">
      <form class="note-add__form" v-on:submit.prevent="addNote">
        <input
          class="input note-add__input"
          type="text"
          v-model="query"
          placeholder="Enter note"
        >
        <div class="note-add__buttons">
          <button class="button note-add__button" type="submit">
            Submit
          </button>
          <button
            class="button note-add__button"
            type="button"
            v-on:click="noteForm = false, query=''"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <p v-if="!allNotes.length" class="notes__empty">
      Empty notelist
    </p>
    <NoteList
      v-else
      v-bind:notes="allNotes"
    />
  </main>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import NoteList from '@/components/NoteList'
export default {
  name: 'Home',
  data () {
    return {
      noteForm: false,
      query: ''
    }
  },
  computed: {
    allNotes () {
      return this.$store.getters.allNotes
    }
  },
  methods: {
    addNote () {
      if (this.query.trim()) {
        const newNote = {
          id: uuidv4(),
          title: this.query,
          todos: []
        }

        this.$store.dispatch('addNote', newNote)
        localStorage.setItem('notes', JSON.stringify(this.$store.getters.allNotes))
        this.query = ''
        this.noteForm = false
      }
    }
  },
  components: {
    NoteList
  }
}
</script>

<style>
  .main {
    padding: 0 15px;
  }

  .notes__empty {
    text-align: center;
    font-size: 20px;
    font-style: italic;
    color: grey;
  }

  .notes__button-container {
    display: flex;
    justify-content: flex-end;
  }

  .button {
    height: 46px;
    font-size: 16px;
    line-height: 14px;
    font-weight: 700;
    background: #23272b;
    box-shadow: 0 6px 23px rgba(39, 62, 65, 0.46);
    border-radius: 8px;
    border-style: none;
    cursor: pointer;
    color: #fff;
    text-transform: uppercase;
    transition: 0.3s;
  }

  .notes__button {
    width: 300px;
    margin: 40px 80px 40px 0;
  }

  .button:hover {
    background-color: #42b983;
  }

  .note-add__container {
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(128, 128, 128, 0.3);
    z-index: 2;
  }

  .note-add__form {
    margin: auto auto;
    width: 500px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #42b983;
    border-radius: 7px;
    z-index: 3;
  }

  .input {
    box-sizing: border-box;
    margin-bottom: 30px;
    padding: 7px 11px;
    font-size: 16px;
    line-height: 24px;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    color: #363636;
    transition: 0.2s;
  }

  .note-add__input {
    width: 100%;
    height: 38px;
  }

  .input:hover {
    border-color: #a0a0a0;
  }

  .note-add__buttons {
    display: flex;
    justify-content: space-around;
  }

  .note-add__button {
    width: 200px;
  }
</style>
