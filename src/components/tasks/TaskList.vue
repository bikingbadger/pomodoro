<template>
  <button @click="pasteTasks()">Paste Tasks</button>
  <ul>
    <li v-for="(task, index) in tasks" v-bind:key="index" :class="{ completed: task.completed }">
      <input
        @click="toggleCompleted(index)"
        v-model="task.completed"
        v-bind:id="index"
        type="checkbox"
      />
      <span @click="moveUp(index)" v-if="index !== 0">⬆</span>
      <span @click="moveDown(index)" v-if="index !== tasks.length - 1">⬇</span>
      <span v-html="formattedDescription(task.title)" />
    </li>
  </ul>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  name: 'task-list',
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    formattedDescription(description) {
      if (!description) return null;
      const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
      let renderedHTML = md.render(description);

      // This will take the links and open them in a new tab
      // so that the application will still continue running
      // and not replace it with the link
      const hasLinks = renderedHTML.indexOf('href');
      if (hasLinks > 0) {
        renderedHTML = renderedHTML.replace('href', 'target="_blank" href');
      }

      return renderedHTML.replace('<p>', '').replace('</p>', '');
    },
    moveUp(index) {
      console.log(index);
      if (index === 0) return;
      const taskToMove = this.tasks[index];
      this.tasks.splice(index, 1);
      this.tasks.splice(index - 1, 0, taskToMove);
    },
    moveDown(index) {
      console.log(index);
      if (index === this.tasks.length - 1) return;
      const taskToMove = this.tasks[index];
      this.tasks.splice(index, 1);
      this.tasks.splice(index + 1, 0, taskToMove);
    },
    pasteTasks() {
      navigator.clipboard.readText().then(
        (cliptext) => {
          console.log(JSON.parse(cliptext));
          this.tasks.splice(0, this.tasks.length);
          this.tasks = [...JSON.parse(cliptext)];
        },
        (err) => console.log(err),
      );
    },
    toggleCompleted(index) {
      if (!this.tasks[index].completed) this.tasks[index].completed = false;
      this.tasks[index].completed = !this.tasks[index].completed;
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}

.completed {
  text-decoration: line-through;
}
</style>
