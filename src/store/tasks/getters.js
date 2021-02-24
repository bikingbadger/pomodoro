const compare = (a, b) => {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
};

export default {
  allTasks: (state) => {
    const sortedArray = Object.values(state.tasks).sort(compare);
    console.log(sortedArray);

    return { ...sortedArray };
  },
};
