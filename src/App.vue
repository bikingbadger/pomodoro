<template>
  <the-header />
  <router-view />
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue';
import { mapActions } from 'vuex';

export default {
  components: { TheHeader },
  methods: {
    ...mapActions('tasks', ['getTodoistTasks']),
  },
  mounted() {
    this.getTodoistTasks();
  },
};
</script>
