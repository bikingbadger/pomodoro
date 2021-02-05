<template>
  <div class="home">
    <h1>Pompom</h1>
    <timer-bar></timer-bar>
    <task-list></task-list>
  </div>
</template>

<script>
import TaskList from '@/components/tasks/TaskList.vue';
import TimerBar from '@/components/timer/TimerBar.vue';

export default {
  name: 'Home',
  components: { TimerBar, TaskList },
};
</script>
