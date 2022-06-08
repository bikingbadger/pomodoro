<template>
  <ul @drop="onDrop($event)" @dragover.prevent @dragenter.prevent :data-list-name="listName">
    <task-list-item
      v-for="(task, index) in tasks"
      :key="task.id"
      draggable="true"
      @dragstart="startDrag($event, task)"
      @dragend="endDrag(task)"
      :data-position="index"
      :task="task"
    ></task-list-item>
  </ul>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TaskListItem from '@/components/tasks/TaskListItem.vue';

export default {
  name: 'task-list',
  props: {
    'list-name': {
      type: String,
      required: true,
    },
  },
  // order: 5,
  components: {
    TaskListItem,
  },
  setup(props) {
    const store = useStore();

    const tasks = computed({
      get: () => store.getters.filterTasks(props.listName),
      set: (listItem) => {
        store.dispatch('organiseTaskList', listItem);
      },
    });

    const startDrag = (event, task) => {
      store.dispatch('setOpacity', { task, value: 0.4 });
      const startingPosition = {
        list: event.target.closest('ul').getAttribute('data-list-name'),
        position: event.target.closest('li').getAttribute('data-position'),
      };
      event.dataTransfer.setData('startingPosition', JSON.stringify(startingPosition));
    };

    const endDrag = (task) => {
      store.dispatch('setOpacity', { task, value: 1 });
    };

    const onDrop = (event) => {
      // Get the starting list and the position in the list
      const startingPosition = JSON.parse(event.dataTransfer.getData('startingPosition'));

      // Find the name of the target list from the ul with the data-list-name
      // This could be an empty ul or finding the parent of the li using closest
      const list = event.toElement.closest('ul');
      const targetList = list.getAttribute('data-list-name');

      // Check if the ul is empty, if so place the position will be the first in the list
      const targetPosition =
        list.firstElementChild === null
          ? 0
          : event.toElement.closest('li').getAttribute('data-position');

      store.dispatch('moveTask', {
        startList: startingPosition.list,
        startPosition: startingPosition.position,
        targetList,
        targetPosition,
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
ul {
  background-color: lightblue;
  min-height: 5rem;
  width: 100%;
}
</style>
