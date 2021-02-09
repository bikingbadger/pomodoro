<template>
  <div class="flow-content">
    <div class="timer-display">25:00</div>
    <div class="pompoms">
      <ul>
        <li>🍅</li>
        <li>🍅</li>
        <li>🍅</li>
      </ul>
    </div>
    <ul>
      <li class="btn btn-go">Start</li>
      <li class="btn btn-reset">Reset</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
</style>
