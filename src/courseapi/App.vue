<template>
  <titlenav />
  <div class="progress" v-if='loading'>
    <div class="indeterminate"></div>
  </div>

  

  
</template>

<script>
/*eslint-disable*/
import $ from 'jquery';
// import materialize from '/home/ysh/lab/vue/script/materialize'
import M from 'materialize-css'
import titlenav from '@/title/App.vue'

export default {
  name: 'App',
  data() {
    return {
      loading: true,
    };
  },
  mounted () {
    M.AutoInit();
    this.init(true);
  },
  components: {
    titlenav
  },
  methods: {
    init(deloading = false) {
      this.user.id = localStorage.getItem('id')
      if(this.user.id) $.post('https://api.citrc.tw/wbox/whoami', {'id': this.user.id}, (response) => {
        response = JSON.parse(response);
        if(!response['ok']) {
          M.toast({html: response.error, classes: 'red rounded'})
          if(response.data?.logout) {
            location.href = '/login.html?exlogout';
          }
        }
        this.user.name = response.data;
        if(deloading) this.loading = false;
      })
      else if(deloading) this.loading = false;
    },
    random_color(getblack = true) {
      var pre = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'black']
      if(!getblack) pre = pre.slice(0, -1)
      return pre[Math.floor(Math.random() * pre.length)]
    },
    // mdinit(deloading = false) {

    // },
    isint(x){
      return /^\d+$/.test(x);
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