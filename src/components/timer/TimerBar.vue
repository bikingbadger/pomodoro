<template>
  <div class="timer flow-content">
    <div class="timer-display">{{ getCurrentTime }}</div>
    <div class="pompoms">
      <ul>
        <li v-for="pompom in numberOfPompoms" v-bind:key="pompom.id">🍅</li>
      </ul>
    </div>
    <ul>
      <button class="btn btn-go" @click="toggleTimer">{{ buttonText }}</button>
      <button class="btn btn-reset" @click="resetTimer">Reset</button>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('timer', ['getCurrentTime', 'isRunning', 'numberOfPompoms']),
    buttonText() {
      return this.isRunning ? 'Pause' : 'Start';
    },
  },
  methods: {
    ...mapActions('timer', ['createTimer', 'startTimer', 'stopTimer', 'resetTimer']),
    toggleTimer() {
      if (this.isRunning) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
    },
  },
  mounted() {
    this.createTimer();
  },
};
</script>

<style scoped>
.timer {
  border: 1px solid blue;
  border-radius: 10px;
  padding: 1rem;
  width: 50%;
  margin: 0 auto;
}

.timer-display {
  text-align: center;
  font-size: 2rem;
}

.pompoms {
  text-align: center;
}

ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

ul > * + * {
  margin-left: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  background: var(--clr-accent-500);
  color: white;
  border-radius: 1rem;
}

.btn:focus {
  outline: none;
  border: 3px dashed red;
  border-radius: 1rem;
}
</style>
