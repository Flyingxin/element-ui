<template>
  <div class="el-number"
  :class="[
    color? 'el-number--' + color : '',
    fontSize? 'el-number--' + fontSize : '',
    {
      'is-bold': bold,
      'is-hover': hover,
      'is-border': border
    }
  ]"
  :style="style">
  <i :class="icon" :style='iconStyle' v-if="icon"></i>
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
    },
    size: String,
    bold: Boolean,
    color: String,
    hover: Boolean,
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    iconSize: Number,
    border: Boolean
  },
  data() {
    return {
      number: 0,
      offsetHeight: ''
    };
  },
  computed: {
    fontSize() {
      return this.size || '';
    },
    style() {
      return {
        'line-height': `${this.offsetHeight}px`
      };
    },
    iconStyle() {
      return {
        color: this.iconColor,
        'font-size': `${this.iconSize}px`
      };
    }
  },
  methods: {
    scrollNumber() {
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
          this.number = start + (this.value % step);
        }
      }, steps);
    }
  },
  mounted() {
    this.scrollNumber();
    this.offsetHeight = this.$el.offsetHeight;
  }
};
</script>
