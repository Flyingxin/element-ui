<template>
  <div
    v-show="ready"
    class="el-carousel__item"
    :class="{
      'is-active': active,
      'el-carousel__item--card': $parent.type === 'card',
      'el-carousel__item--rotate': $parent.type === 'rotate',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    @click="handleItemClick"
    :style="itemStyle">
    <!-- 面纱mask -->
    <div
      v-if="$parent.type === 'card' || 'rotate'"
      v-show="!active"
      class="el-carousel__mask">
    </div>
    <slot></slot>
  </div>
</template>

<script>
  import { autoprefixer } from 'element-ui/src/utils/util';
  const CARD_SCALE = 0.83;
  export default {
    name: 'ElCarouselItem',

    props: {
      name: String,
      label: {
        type: [String, Number],
        default: ''
      }
    },

    data() {
      return {
        hover: false,
        translate: 0,
        rotate: 0,
        scale: 1,
        active: false,
        ready: false,
        inStage: false,
        animating: false
      };
    },

    methods: {
      processIndex(index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
          return -1;
        } else if (activeIndex === length - 1 && index === 0) {
          return length;
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          return length + 1;
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          return -2;
        }
        return index;
      },

      calcCardTranslate(index, activeIndex) {
        const parentWidth = this.$parent.$el.offsetWidth;
        if (this.inStage) {
          return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
        } else if (index < activeIndex) {
          return -(1 + CARD_SCALE) * parentWidth / 4;
        } else {
          return (3 + CARD_SCALE) * parentWidth / 4;
        }
      },
      //  计算转动后 z轴的偏移量
      calcRotateTranslate() {
        const parentWidth = this.$parent.$el.offsetWidth;
        const length = this.$parent.items.length;
        switch (length) {
          case 1:
          case 2: return 0;
          case 3:
          case 4: return parentWidth * 0.5;
          case 5: return parentWidth * 0.6882; // 内切圆半径
          case 6: return parentWidth * 1;
          default:
            console.warn('[Element Warn][Carousel]items length are not supported >= 7');
            return;
        }
      },

      calcTranslate(index, activeIndex, isVertical) {
        const distance = this.$parent.$el[isVertical ? 'offsetHeight' : 'offsetWidth'];
        return distance * (index - activeIndex);
      },
      // 移动item
      translateItem(index, activeIndex, oldIndex) {
        const parentType = this.$parent.type;
        const parentDirection = this.parentDirection;
        const length = this.$parent.items.length;
        if ((parentType !== 'card' || 'rotate') && oldIndex !== undefined) {
          this.animating = index === activeIndex || index === oldIndex;
        }
        if (index !== activeIndex && length > 2 && this.$parent.loop && parentType !== 'rotate') {
          index = this.processIndex(index, activeIndex, length);
        }
        if (parentType === 'card') {
          if (parentDirection === 'vertical') {
            console.warn('[Element Warn][Carousel]vertical direction is not supported in card mode');
          }
          this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
          this.active = index === activeIndex;
          this.translate = this.calcCardTranslate(index, activeIndex);
          this.scale = this.active ? 1 : CARD_SCALE;
        } else if (parentType === 'rotate') {
          if (parentDirection === 'vertical') {
            console.warn('[Element Warn][Carousel]vertical direction is not supported in card mode');
          }
          this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
          this.active = index === activeIndex;
          this.rotate = index * Number(Math.floor(360 / length));
          this.translate = this.calcRotateTranslate();
        } else {
          this.active = index === activeIndex;
          const isVertical = parentDirection === 'vertical';
          this.translate = this.calcTranslate(index, activeIndex, isVertical);
          this.scale = 1;
        }
        this.ready = true;
      },
      // 点击舞台(中央)两侧卡片切换
      handleItemClick() {
        const parent = this.$parent;
        if (parent && (parent.type === 'card' || 'rotate')) {
          const index = parent.items.indexOf(this);
          parent.setActiveItem(index);
        }
      }
    },

    computed: {
      // 获取父组件规定的方向
      parentDirection() {
        return this.$parent.direction;
      },
      // item样式
      itemStyle() {
        const parentType = this.$parent.type;
        let style;
        if (parentType === 'rotate') {
          const rotateType = this.parentDirection === 'vertical' ? 'rotateX' : 'rotateY';
          const value = `${rotateType}(${ this.rotate }deg) translateZ(${this.translate}px)`;
          style = {transform: value};
        } else {
          const translateType = this.parentDirection === 'vertical' ? 'translateY' : 'translateX';
          const value = `${translateType}(${ this.translate }px) scale(${ this.scale })`;
          style = {transform: value};
        }
        return autoprefixer(style); //  兼容浏览器autoprefixer
      }
    },
    //  更新所有item
    created() {
      this.$parent && this.$parent.updateItems();
    },

    destroyed() {
      this.$parent && this.$parent.updateItems();
    }
  };
</script>
