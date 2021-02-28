<template>
  <the-header />
  <Panel class="m-auto ">
    <router-view />
  </Panel>
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
