<template>
  <div class="task-list">
    <ul>
      <li v-for="task in allTasks" :key="task.id">
        <div class="task-complete" @click="completeTask(task)"></div>
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
  /* border: 1px solid blue; */
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  /* box-shadow: 9px 10px 22px 0px rgba(97, 97, 97, 0.5); */
}

li {
  padding: 0.5em 0;
  /* padding-bottom: 1rem; */
  border-bottom: 1px solid var(--clr-accent-500);
  /* border-radius: 5px; */
  /* position: relative; */
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr, 5fr;
  align-items: center;
  justify-content: start;
}

/* li:hover {
  box-shadow: 9px 10px 22px 0px rgba(97, 97, 97, 0.5);
  border-bottom: none;
} */

.task-complete {
  content: '';
  border-color: #009933;
  border-style: solid;
  height: 20px;
  width: 20px;
  margin: 1rem;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}

.task-complete:hover {
  cursor: pointer;
}

.task-complete:active {
  background-color: #009933;
  transform: scale(1.05);
}
</style>
