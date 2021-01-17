<template>
  <div class="home">
    <h1>Pompom</h1>
    <timer-bar></timer-bar>
  </div>
</template>

<script>
import TimerBar from "../components/timer/TimerBar";

export default {
  name: "Home",
  components: { TimerBar }
};
</script>
