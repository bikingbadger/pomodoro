<template>
  <button @click="pasteTasks()">Paste Tasks</button>
  <ul>
    <li v-for="(task, index) in tasks" v-bind:key="index" :class="{completed:task.completed}">
      <input
        @click="toggleCompleted(index)"
        type="checkbox"
        name=""
        v-bind:id="index"
        v-bind="task.completed"
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
      tasks: [
        { title: 'Look at buying a cabinet for electrics for the [[Smart Garden]]' },
        {
          title:
            'Buy and watch [Complete Harley Smith Master Grower Video Library - Save 30% – merchandise.npk-industries.com](https://npk-industries.com/collections/harley-smith-master-growers-video-library/products/365710)',
        },
        { title: 'Research LED and CO2 for use during germination and growth' },
        {
          title:
            'Read [SA-19.pdf (hawaii.edu)](https://www.ctahr.hawaii.edu/oc/freepubs/pdf/SA-19.pdf)',
        },
        {
          title:
            'Read [Listening to the Voices of Trees: The Bonsai World of Kawabe Takeo | Nippon.com](https://www.nippon.com/en/views/b02317/) 🔼',
        },
        { title: 'Teachers meeting  of Dean @9:15' },
        {
          title:
            'Order pump [1/2 1 VA-90 EXTERNAL PUMP MADE BY VALEX | PROFESSIONAL WATER AND SEWAGE PUMPS | KIMCHI TOOLS (workimhi.co.il)](https://www.workimhi.co.il/items/608608-608608-D7-9E-D7-A9-D7-90-D7-91-D7-94-D7-97-D7-99-D7-A6-D7-95-D7-A0-D7-99-D7-AA-1-2-1-VA-90-Valex)',
        },
        {
          title:
            'Read up about [Facade (refactoring.guru)](https://refactoring.guru/design-patterns/facade) 🔼',
        },
        {
          title:
            'Take a look at [Bonsai Galleries](http://bonsai4me.com/bonsai_galleries.html) 🔁 every week on Wednesday',
        },
        {
          title:
            'Check a tree from the [Artisan Cup](http://www.theartisanscup.com/page-06) talks 🔼 🔁 every day',
        },
        {
          title:
            'Read up about [algos and data structures](https://www.youtube.com/watch?v=8hly31xKli0) 🔁 every day',
        },
        { title: 'Do daily problem on [LeetCode](https://leetcode.com/) 🔼 🔁 every day' },
        { title: 'Download financial data and input into GNUCash 🔁 every month on the 8th' },
        { title: 'Check Specula ⏫ 🔁 every week on Monday, Tuesday, Wednesday, Thursday, Sunday' },
        {
          title:
            'Write down hours ⏫ 🔁 every week on Monday, Tuesday, Wednesday, Thursday, Sunday',
        },
        { title: 'Send mom R4200 for her car 🔁 every month on the 8th' },
        { title: 'Reflect on the month ⏫ 🔁 every month on the 29th' },
        {
          title:
            'Read [Japanese Flowering Plum Basics | Peter Tea Bonsai (wordpress.com)](https://peterteabonsai.wordpress.com/2012/03/06/japanese-flowering-plum-basics/)',
        },
        {
          title:
            '[Vue.js Fundamentals with the Composition API, a FREE Vue.js Course (vueschool.io)](https://vueschool.io/courses/vue-js-fundamentals-with-the-composition-api)',
        },
      ],
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
