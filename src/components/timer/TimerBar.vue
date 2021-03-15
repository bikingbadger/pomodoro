<template>
  <div class="timer">
    <div class="pompom-area">
      <ul class="pompoms">
        <li v-for="pompom in numberOfPompoms" v-bind:key="pompom.id">🍅</li>
      </ul>
    </div>
    <div class="button-area">
      <Button @click="toggleTimer">{{ buttonText }}</Button>
      <Button @click="resetTimer">Reset</Button>
    </div>

    <time :datetime='getDurationString' class="timer-display">{{ getCurrentTime }}</time>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('timer', ['getCurrentTime', 'isRunning', 'numberOfPompoms', 'getDurationString']),
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
  /* border: 1px solid blue; */
  /* border-radius: 10px; */
  /* padding: 1rem; */
  /* width: 50%; */
  /* margin: 0 auto; */
  display: flex;
  align-items: center;
}

.timer-display {
  font-size: 2rem;
  margin: 0 1rem;
}

.pompom-area {
  margin: 0 1rem;
}

.pompoms {
  display: flex;
  font-size: 1.5rem;
}

.button-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.button-area > * + * {
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
