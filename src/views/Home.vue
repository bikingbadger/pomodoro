<template>
  <Panel class="home">
    <h1 class="p-text-center p-text-uppercase">Pompom</h1>
    <!-- <div class="task-list-panel">
      <task-list list-name="main"></task-list>
    </div> -->
    <!-- <todoist-tasks /> -->
    <task-list></task-list>
  </Panel>
</template>

<script>
import TaskList from '@/components/tasks/TaskList.vue';
// import TodoistTasks from '@/components/tasks/TodoistTasks.vue';

export default {
  name: 'Home',
  components: { TaskList },
};
</script>

<style scoped>
.home {
  width: 66vw;
  margin: 0 auto;
}

h1 {
  color: #3f51b5;
  font-size: 3rem;
}

.task-list-panel {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, 1fr);
  align-items: start;
  gap: 1rem;
}
</style>
