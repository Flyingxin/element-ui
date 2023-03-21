<template>
  <div :class="['el-notice', outerStyle]">
    <i :class="[icon, 'el-notice__icon']" v-if='icon'></i>
    <p
      :class="[
        'el-notice__inner',
        {
          'is-infinite': infinite,
        }
      ]"
      :style='innerStyle'
    >
      {{ text }}
      <slot v-if='!text'></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ElNotice',
  props: {
    text: {
      type: String,
      default: ''
    },
    delay: {
      type: String,
      defalut: '10s'
    },
    infinite: Boolean,
    fontSize: String,
    color: String,
    backgroundColor: String,
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    outerStyle() {
      return {
        'background-color': this.backgroundColor
      };
    },
    innerStyle() {
      return {
        'animation-durin': this.delay,
        color: this.color,
        'font-size': this.fontsize
      };
    }
  }
};
</script>