<template>
  <div class="el-water-mark" :style="outerStyle">
    <ul>
      <li class="el-water-mark__inner" :style="innerStyle" ref="waterMark" v-for="i in waterMarkNumber" :key="i">
        <span class="el-water-mark__inner--content" :style="contentStyle">{{content}}</span>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ElWaterMark',
  props: {
    content: {
      type: String,
      required: true
    },
    markWidth: String,
    markHeight: String,
    color: String,
    rotate: Number,
    fontSize: String,
    gapX: String,
    gapY: String,
    borderRadius: String,
    opacity: {
      type: Number,
      default: 0.5
    }
  },
  data() {
    return {
      waterMarkNumber: 1
    };
  },
  computed: {
    outerStyle() {
      return {
        'border-radius': this.borderRadius
      };
    },
    innerStyle() {
      return {
        'margin-right': this.gapX,
        'margin-bottom': this.gapY
      };
    },
    contentStyle() {
      return {
        width: this.markWidth,
        height: this.markHeight,
        color: this.color,
        transform: `rotateZ(${this.rotate}deg)`,
        opacity: this.opacity,
        'font-size': this.fontSize
      };
    }
  },
  methods: {
    /**
     * 获取父盒子宽高 和 水印宽高
     * 计算出需要的水印数目
     * +1为了底部大部分位置不够而留白了，故多加
     */
    calcWaterMarkNumber() {
      let outerWidth = this.$el.offsetWidth;
      let outerHeight = this.$el.offsetHeight;
      let innerWidth = this.$refs.waterMark[0].offsetWidth;
      let innerHeight = this.$refs.waterMark[0].offsetHeight;
      let widthMarkNum = parseInt(outerWidth / innerWidth, 0);
      let heightMarkNum = parseInt(outerHeight / innerHeight, 0);
      this.waterMarkNumber = (widthMarkNum + 1) * heightMarkNum;
    }
  },
  mounted() {
    this.calcWaterMarkNumber();
  }
};
</script>
