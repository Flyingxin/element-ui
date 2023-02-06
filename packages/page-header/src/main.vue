<template>
  <div class="el-page-header">
    <div class="el-page-header__left" @click="$emit('back')" v-if="!titleRight">
      <i class="el-icon-back"></i>
      <div class="el-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="el-page-header__right" @click="$emit('back')" v-else>
      <div class="el-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="el-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from 'element-ui/src/locale';
export default {
  name: 'ElPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('el.pageHeader.title');
      }
    },
    titleRight: {
      type: Boolean,
      default: false
    },
    content: String
  }
};
</script>
