import WaterMark from './src/main';

/* istanbul ignore next */
WaterMark.install = function(Vue) {
  Vue.component(WaterMark.name, WaterMark);
};

export default WaterMark;
