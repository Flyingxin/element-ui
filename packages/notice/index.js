import Notice from './src/main';

/* istanbul ignore next */
Notice.install = function(Vue) {
  Vue.component(Notice.name, Notice);
};

export default Notice;
