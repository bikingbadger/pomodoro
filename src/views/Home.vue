<template>
  <div class="home">
    <task-list></task-list>
  </div>
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
</style>
