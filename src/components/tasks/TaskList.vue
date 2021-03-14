<template>
  <vue-draggable
    class="task-list"
    tag="transition-group"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="tasks"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    item-key="order"
  >
    <template #item="{ element }">
      <li>
        <div class="list-bullet" @click="completeTask(element)"></div>
        <span aria-hidden="true" v-html="formattedDescription(element.description)"></span>
      </li>
    </template>
  </vue-draggable>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MarkdownIt from 'markdown-it';
import VueDraggable from 'vuedraggable';

export default {
  order: 7,
  components: {
    VueDraggable,
  },
  data() {
    return {
      drag: false,
    };
  },
  computed: {
    ...mapGetters('tasks', ['allTasks']),
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    tasks: {
      get() {
        return this.allTasks;
      },
      set(listItem) {
        console.log(listItem);
      },
    },
  },
  methods: {
    ...mapActions('tasks', ['completeTask']),
    formattedDescription(description) {
      const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
      return md.render(description);
    },
  },
};
</script>

<style scoped>
.task-list {
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  list-style-type: none;
}

li {
  padding: 0.5em 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid blue;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr, 5fr;
  align-items: center;
  justify-content: start;
  cursor: pointer;
}

.list-bullet {
  content: '';
  border-color: blue;
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

li:active {
  background-color: blue;
  color: white;
  transform: scale(1.05);
}
</style>
