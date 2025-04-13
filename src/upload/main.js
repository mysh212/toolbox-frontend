import { createApp } from 'vue'
import App from './App.vue'
import nav from '../title/App.vue'

import jQuery from 'jquery';
<script
  src="https://code.jquery.com/jquery-3.7.1.min.js"
  integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
  crossorigin="anonymous"></script>

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css'
import 'materialize-css/dist/js/materialize.min.js'


Object.assign(window, { $: jQuery, jQuery });
// window.$ = window.jQuery = jQuery
createApp(App).mount('#app')
createApp(nav).mount('#nav')

  