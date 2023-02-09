<template>
  <div
    :class="carouselClasses"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <!-- 组件容器 -->
    <div
      class="el-carousel__container"
      :style="{ height: height , transform: `rotateY(${rotate}deg)`}">
      <!-- 左按钮 -->
      <transition
        v-if="arrowDisplay && type !== 'rotate'"
        name="carousel-arrow-left">
        <button
          type="button"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="el-carousel__arrow el-carousel__arrow--left">
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <!-- 右按钮 -->
      <transition
        v-if="arrowDisplay && type !== 'rotate'"
        name="carousel-arrow-right">
        <button
          type="button"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
          class="el-carousel__arrow el-carousel__arrow--right">
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <!-- 卡片插槽 -->
      <slot></slot>
    </div>
    <!-- 走马灯外部显示指示器 -->
    <ul
      v-if="indicatorPosition !== 'none'"
      :class="indicatorsClasses">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'el-carousel__indicator',
          'el-carousel__indicator--' + direction,
          { 'is-active': index === activeIndex }]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="el-carousel__button">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// throttle 节流函数 （下一次函数执行与上一次函数执行的时间间隔，控制在一定范围内）
import throttle from 'throttle-debounce/throttle';
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';

export default {
  name: 'ElCarousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    }
  },

  data() {
    return {
      items: [], // 所有子元素
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false,
      rotate: 0 // rotate模式下开启
    };
  },

  computed: {
    // 切换箭头显示时机
    arrowDisplay() {
      return this.arrow !== 'never' && this.direction !== 'vertical';
    },
    // 指示器有label时->显示label
    hasLabel() {
      return this.items.some(item => item.label.toString().length > 0);
    },
    // 走马灯类名
    carouselClasses() {
      const classes = ['el-carousel', 'el-carousel--' + this.direction];
      if (this.type === 'card' || 'rotate') {
        classes.push(`el-carousel--${this.type}`);
      }
      return classes;
    },
    // 指示器类名
    indicatorsClasses() {
      const classes = ['el-carousel__indicators', 'el-carousel__indicators--' + this.direction];
      if (this.hasLabel) {
        classes.push('el-carousel__indicators--labels');
      }
      if (this.indicatorPosition === 'outside' || (this.type === 'card' || 'rotate')) {
        classes.push('el-carousel__indicators--outside'); // 走马灯外面显示
      }
      return classes;
    }
  },

  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },
    // 改变
    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit('change', val, oldVal);
      }
    },
    // 自动播放
    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },
    // 循环播放
    loop() {
      this.setActiveItem(this.activeIndex);
    },
    // 间隔
    interval() {
      this.pauseTimer();
      this.startTimer();
    }
  },

  methods: {
    // 更新items的所有子元素item
    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'ElCarouselItem');
    },
    // 鼠标进入
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },
    // 鼠标离开
    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },
    // 中央显示的item
    itemInStage(item, index) {
      const length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
        return 'left';
      } else if (index === 0 && item.inStage && this.items[length - 1].active ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
        return 'right';
      }
      return false;
    },
    // 侧边两边item某一边触发hover
    handleButtonEnter(arrow) {
      if (this.direction === 'vertical') return;
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },

    handleButtonLeave() {
      if (this.direction === 'vertical') return;
      this.items.forEach(item => {
        item.hover = false;
      });
    },
    // 重置item
    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },

    playSlides() {
      const length = this.items.length;
      if (this.activeIndex < length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
      if (this.type === 'rotate') {
        this.rotate -= Math.floor(360 / length);
      }
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },

    resetTimer() {
      this.pauseTimer();
      this.startTimer();
    },
    //  设置激活的item的索引值
    setActiveItem(index) {
      //  为string是 传入的是幻灯片的名字name
      if (typeof index === 'string') {
        const filteredItems = this.items.filter(item => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (this.type === 'rotate' && this.activeIndex !== -1) {
        this.rotate += (oldIndex - index) * Math.floor(360 / length);
      }
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
      this.resetTimer();
    },
    // 切换到上一张卡片的索引值
    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },
    // 切换到下一张卡片的索引值
    next() {
      this.setActiveItem(this.activeIndex + 1);
    },

    handleIndicatorClick(index) {
      if (this.type === 'rotate' && this.activeIndex !== -1) {
        const length = this.items.length;
        const oldIndex = this.activeIndex;
        this.rotate += (oldIndex - index) * Math.floor(360 / length);
      }
      this.activeIndex = index;

    },

    handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        if (this.type === 'rotate' && this.activeIndex !== -1) {
          const length = this.items.length;
          const oldIndex = this.activeIndex;
          this.rotate += (oldIndex - index) * Math.floor(360 / length);
        }
        this.activeIndex = index;
      }
    }
  },

  created() {
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, index => {
      this.handleIndicatorHover(index);
    });
  },

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemPosition);
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },

  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
    this.pauseTimer();
  }
};
</script>
