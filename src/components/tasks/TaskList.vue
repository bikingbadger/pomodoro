<template>
  <!-- <div
    class="grid grid-flow-col grid-cols-12 pl-2 items-center h-16 rounded ${cardHover}"
    data-task-id="${task.id}"
    data-task-description="${task.description}"
    data-task-priority="${task.priority}"
    data-task-time="${task.time}"
  >
    <div><i data-task-complete="${task.id}" class="material-icons" title="Complete"></i></div>
    <div
      class="col-span-9 -mt-2 pl-2 md:pl-0 text-sm md:text-base"
      id="task-${task.id}"
      data-task-id="${task.id}"
    >
      ${text}
    </div>
    <div><i data-task-save="${task.id}" class="material-icons hidden" title="Save">save</i></div>
    <div><i data-task-edit="${task.id}" class="material-icons" title="Edit">edit</i></div>
  </div> -->
  <div>
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
li {
  margin-top: 1rem;
  padding: 0.5em 0.5em 0.5em 2em;
  border: 1px solid var(--clr-accent-500);
  border-radius: 5px;
  position: relative;
}

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
