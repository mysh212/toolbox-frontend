<template>
  <h1> Hello World </h1>
  <library test="ouob"/>
  {{ test }}
  <a class = 'btn-flat waves-effect' @click = 'get_test'> Check </a>
</template>

<script>
/*eslint-disable*/
import { $emit } from 'vue';
import jQuery from 'jquery';
import library from '@/test/library.vue'
import M from 'materialize-css'

export default {
  name: 'App',
  data() {
    return {
      test: ''
    };
  },
  components: {
    library
  },
  mounted () {
    M.AutoInit();
    // this.init(true);
  },
  methods: {
    get_test() {
      // this.test = library.$.test();                          
      $emit('1', '2')
    }
  }
};
</script>

<style>
html {
  background-color: #eee;
}
.material-icons {
    display: inline-flex;
    vertical-align: middle;
}
</style>