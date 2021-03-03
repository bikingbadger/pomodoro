<template>
  <Panel class="home">
    <h1 class="p-text-center p-text-uppercase">Pompom</h1>
    <task-list></task-list>
  </Panel>
</template>

<script>
import TaskList from '@/components/tasks/TaskList.vue';

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
</style>
