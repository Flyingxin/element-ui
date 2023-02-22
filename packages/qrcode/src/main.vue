<template>
    <vue-qr
      :text="src"
      :correctLevel="3"
      :colorDark="color"
      :logoSrc="logoSrc"
      :size="size"
      :margin="borderMargin"
      :logoMargin="logoMargin"
    ></vue-qr>
</template>
<script>
import VueQr from 'vue-qr';
export default {
  name: 'ElQrcode',
  props: {
    src: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 50
    },
    logoMargin: {
      type: Number,
      default: 3
    },
    borderMargin: {
      type: Number,
      default: 10
    },
    logoSrc: String,
    color: String

  },
  components: {
    VueQr
  }
};
</script>

