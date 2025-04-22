<template>

  <div class = row>
    <div class = 'card col s12 m5 l3 center-align'>
      <div class="progress" v-if='loading'>
        <div class="indeterminate"></div>
      </div>
      <div class = card-content>
        <b class = card-title> <i class = material-icons> insert_chart </i>成大圖書館現況 </b>
        <div class = row>
          <div v-for = 'i, j in data' class = 'col s4' :key = 'j'>
            <b> {{ '總館 醫分館 新K館 D-24 未來館'.split(' ')[j] }} </b>
            <h3 class = blue-text> {{ i[1][0] }} </h3>
            <div class = divider />
            <b class = grey-text> {{ i[1][1] }} </b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import jQuery from 'jquery';
// import materialize from '/home/ysh/lab/vue/script/materialize'
import M from 'materialize-css'

export default {
  name: 'library',
  data() {
    return {
      loading: true,
      data: []
    };
  },
  mounted () {
    M.AutoInit();
    // this.init(true);
    // while(this.id === undefined)
    $.get(`https://api.citrc.tw/NCKU/library?id=${this.id}`, (response) => {
      response = JSON.parse(response);
      if(!response['ok']) M.toast({html: response.error, classes: 'red rounded'})
      this.data = response['data']
      this.loading = false;
    })
  },
  props: {
    id: ''
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