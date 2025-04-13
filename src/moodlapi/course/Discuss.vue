<template>

<div>
  <div class = 'row'>
    <div class = 'col s12 m4 s3' v-for = 'i in data' :key = i>
      <a class = 'card waves-block waves-effect black-text' :href = 'i.url' target = '_blank'>
        <div class = 'card-content'>
          <!-- <div v-for = 'j, k in i' :key = j>
            <div class = 'chip'>{{ k }}</div>
            <div v-html = 'j'></div>
          </div> -->
          <h6> {{ i.title }} </h6>
          <div class = 'chip'> 作者 </div> {{ i.user }}
          <div class = 'chip'> 時間 </div> {{ i.time }}
          <div class = 'divider'></div>
          <div v-html = 'i.content'></div>
        </div>
      </a>
    </div>
  </div>
</div>

</template>

<script>
/*eslint-disable*/
import jQuery from 'jquery';
import title_nav from '@/title/App.vue'
// import materialize from '/home/ysh/lab/vue/script/materialize'
import M from 'materialize-css'
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'discuss',
  data() {
    return {
      id: '',
      courses: [],
      course_id: '',
      loading: true,
      t: 0
    };
  },
  props: {
    data: []
  },
  components: {
    HelloWorld,
    title_nav
  },
  mounted () {
    M.AutoInit();
  },
  methods: {
    isint(x){
      return /^\d+$/.test(x);
    },
    isalpha(x) {
      return /^[A-Z]$/i.test(x);
    }
  }
};
</script>
<style>
overflow {
    text-overflow: ellipsis;
}
</style>