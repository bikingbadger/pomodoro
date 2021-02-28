<template>
  <div class="task-list">
    <ul>
      <li v-for="task in allTasks" :key="task.id">
        <span class="task-complete" @click="completeTask(task)"></span>
        <div>{{ task.description }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('tasks', ['allTasks']),
  },
  methods: {
    ...mapActions('tasks', ['completeTask']),
  },
};
</script>

<style scoped>
.task-list {
  border: 1px solid blue;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 9px 10px 22px 0px rgba(0, 0, 0, 0.5);
}

li {
  padding: 0.5em 0.5em 0.5em 2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--clr-accent-500);
  /* border-radius: 5px; */
  position: relative;
  display: flex;
  align-content: center;
}

/* ul > * + * {
  margin-bottom: 0;
} */

.task-complete {
  content: '';
  position: absolute;
  border-color: #009933;
  border-style: solid;
  border-width: 0 0.3em 0.25em 0;
  height: 1em;
  top: 1.3em;
  left: 0.6em;
  margin-top: -1em;
  transform: rotate(45deg);
  width: 0.5em;
}
</style>
