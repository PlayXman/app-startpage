<template>
  <div class="time">
    {{ time }}
  </div>
</template>

<script>
function createTime() {
  const d = new Date();

  return `${d.getHours()}:${(d.getMinutes() < 10 ? "0" : "") + d.getMinutes()}`;
}

export default {
  name: "Time",
  data() {
    return {
      listener: null,
      time: createTime()
    };
  },
  mounted() {
    this.listener = setInterval(() => {
      this.time = createTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.listener);
  }
};
</script>

<style>
.time {
  font-size: 5.5rem;
  font-weight: 100;
  line-height: 1;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.35), 0 2px 2px rgba(0, 0, 0, 0.25);
}

@media (min-width: 32em) {
  .time {
    font-size: 9rem;
  }
}
</style>
