<template>
  <div>
    <ul class="note__list">
      <NoteItem
        v-for="(note, index) of notes"
        :key="note.id"
        v-bind:index="index"
        v-bind:note="note"
      />
    </ul>
  </div>
</template>

<script>
import NoteItem from '@/components/NoteItem'
export default {
  props: ['notes'],
  components: {
    NoteItem
  }
}
</script>
