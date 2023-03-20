<template>
  <div class="el-number">
    {{ number }}
  </div>
</template>

<script>
export default {
  name: 'ElNumber',
  props: {
    value: {
      type: Number,
      require: true
    },
    delay: {
      type: Number,
      require: true
    }
  },
  computed: {
    number() {
      let index = 0;
      let start = 0;
      let steps = parseInt(this.delay / 200, 0);
      let step = parseInt(this.value / steps, 0);
      let timer = setInterval(() => {
        index += 1;
        start += step;
        this.number = start;
        if (index === steps) {
          clearInterval(timer);
          return start + (this.value % step);
        }
      }, steps);
    }
  }
};
</script>
