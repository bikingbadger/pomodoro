<template>
  <header>
    <h1>Pompom</h1>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </header>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('tasks', ['getTodoistTasks']),
  },
  mounted() {
    // https://blog.logrocket.com/how-to-consume-apis-with-vuex-and-axios/
    console.log('Get tasks from todoist');
    this.getTodoistTasks();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}

:root {
  --clr-accent-500: #002fa7;
}

body {
  font-family: 'PT Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
}

header {
  margin-bottom: 2rem;
}

h1 {
  text-align: center;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

/* Utility classes */
.flow-content > * + * {
  margin-top: 0.75rem;
}
</style>
