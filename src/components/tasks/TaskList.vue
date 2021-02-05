<template>
  <div
    class="grid grid-flow-col grid-cols-12 pl-2 items-center h-16 rounded ${cardHover}"
    data-task-id="${task.id}"
    data-task-description="${task.description}"
    data-task-priority="${task.priority}"
    data-task-time="${task.time}"
  >
    <div><i data-task-complete="${task.id}" class="material-icons" title="Complete"></i></div>
    <div
      class="col-span-9 -mt-2 pl-2 md:pl-0 text-sm md:text-base"
      id="task-${task.id}"
      data-task-id="${task.id}"
    >
      ${text}
    </div>
    <div><i data-task-save="${task.id}" class="material-icons hidden" title="Save">save</i></div>
    <div><i data-task-edit="${task.id}" class="material-icons" title="Edit">edit</i></div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
