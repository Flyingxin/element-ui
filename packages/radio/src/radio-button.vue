<template>
  <!-- 与radio类似 -->
  <label
    class="el-radio-button"
    :class="[
      size ? 'el-radio-button--' + size : '',
      { 'is-active': value === label },
      { 'is-disabled': isDisabled },
      { 'is-focus': focus }
    ]"
    role="radio"
    :aria-checked="value === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="value = isDisabled ? value : label"
  >
    <!-- 被隐藏的input，单选框button不需要圆圈 -->
    <input
      class="el-radio-button__orig-radio"
      :value="label"
      type="radio"
      v-model="value"
      :name="name"
      @change="handleChange"
      :disabled="isDisabled"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
      autocomplete="off"
    >
    <!-- 真实显示出的按钮 -->
    <span
      class="el-radio-button__inner"
      :style="value === label ? activeStyle : null"
      @keydown.stop>
      <!-- 如果有文字，则出现在插槽中 -->
      <slot></slot>
      <!-- 如果没有文字，则显示label值 -->
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElRadioButton',

    mixins: [Emitter],

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      label: {},
      disabled: Boolean,
      name: String
    },
    data() {
      return {
        focus: false
      };
    },
    computed: {
      value: {
        get() {
          return this._radioGroup.value;
        },
        set(value) {
          this._radioGroup.$emit('input', value);
        }
      },
      _radioGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'ElRadioGroup') {
            parent = parent.$parent;
          } else {
            return parent;
          }
        }
        return false;
      },
      // 选中单选框样式变化
      activeStyle() {
        return {
          backgroundColor: this._radioGroup.fill || '',
          borderColor: this._radioGroup.fill || '',
          boxShadow: this._radioGroup.fill ? `-1px 0 0 0 ${this._radioGroup.fill}` : '',
          color: this._radioGroup.textColor || ''
        };
      },
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      size() {
        return this._radioGroup.radioGroupSize || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      isDisabled() {
        return this.disabled || this._radioGroup.disabled || (this.elForm || {}).disabled;
      },
      tabIndex() {
        return (this.isDisabled || (this._radioGroup && this.value !== this.label)) ? -1 : 0;
      } 
    },

    methods: {
      handleChange() {
        this.$nextTick(() => {
          this.dispatch('ElRadioGroup', 'handleChange', this.value);
        });
      }
    }
  };
</script>
