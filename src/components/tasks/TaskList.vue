<template>
  <ul>
    <task-list-item
      v-for="(task, index) in tasks"
      :key="task.id"
      draggable="true"
      @dragstart="startDrag($event, task)"
      @dragend="endDrag($event, task)"
      @dragover.prevent
      @dragenter.prevent
      @drop="onDrop($event, 1)"
      :data-position="index"
      :task="task"
    ></task-list-item>
  </ul>
  <todoist-tasks />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TodoistTasks from '@/components/tasks/TodoistTasks.vue';
import TaskListItem from '@/components/tasks/TaskListItem.vue';

export default {
  // order: 5,
  components: {
    TodoistTasks,
    TaskListItem,
  },
  setup() {
    const store = useStore();

    const tasks = computed({
      get: () => store.getters.allTasks,
      set: (listItem) => {
        store.dispatch('organiseTaskList', listItem);
      },
    });

    // Drag and drop functionality
    let startPosition = null;

    const findLiElement = (element) =>
      element.nodeName === 'LI' ? element : findLiElement(element.parentElement);

    const startDrag = (event, task) => {
      store.dispatch('setOpacity', { task, value: 0.4 });
      const listItem = findLiElement(event.target);
      startPosition = listItem.getAttribute('data-position');
    };

    const endDrag = (event, task) => {
      store.dispatch('setOpacity', { task, value: 1 });
      startPosition = null;
    };

    const onDrop = (event, list) => {
      const liEnd = findLiElement(event.toElement);
      const newPosition = liEnd.getAttribute('data-position');
      store.dispatch('moveTask', {
        list,
        startPosition,
        newPosition,
      });
    };

    return {
      // Computed
      tasks,
      // Methods
      startDrag,
      endDrag,
      onDrop,
    };
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
</style>
