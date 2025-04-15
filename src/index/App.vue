<template>
  <div class="progress" v-if='loading'>
    <div class="indeterminate"></div>
  </div>
<!-- {{ data }} -->
  <div class=row>
    <div class='col s12'>
      <div class='card' :class = '!user.name ? "hoverable waves-block waves-effect waves-yellow grey lighten-3" : ""' @click = 'header_click'>
        <div class = 'card-content lighten-4 center-align' :class = 'user.name ? random_color(false) : ""'>
          <div class=card-title>
            <h1 class = 'center-align'> 您好 </h1>
            <template v-if='user.name'>
              <div class = divider></div><br>
              <i class = 'material-icons small'> person </i>
              <b style = 'font-weight: 700'> {{ user.name }} </b>
            </template>
            <div class = chip v-else> 登入 </div>
            <!-- <a class = 'btn grey-text right text-lighten-4' href = 'login.html?exlogout'> <b> 登出 </b> </a> -->
          </div>
          <!-- <div class = card-action>
          </div> -->
        </div>
      </div>
    </div>
    <template v-for = 'i in data'>
      <div class='col s12 m5 l3' :key = 'i' v-if = 'user.name || i[4]'>
        <a class='card waves-block waves-effect hoverable black-text' :class = '`waves-${i[3]}`' :href = '`${i[1]}.html`'>
          <div class=card-content>
            <div class=card-title>
              <i class = 'material-icons text-darken-2' :class = '`${i[3]}-text`'> {{ i[2] }} </i>
              <h4> <b> {{ i[0] }} </b> </h4>
            </div>
            <b class = grey-text> {{ i[5] }} </b>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>

<script>
/*eslint-disable*/
import jQuery from 'jquery';
// import materialize from '/home/ysh/lab/vue/script/materialize'
import M from 'materialize-css'

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      md: {
        id: undefined,
        name: undefined
      },
      user: {
        id: undefined,
        name: undefined
      },
      data: [
        ['台南市公車', 'tainan_bus', 'directions_transit', 'teal', true, '台南市公車'],
        ['宿舍公車', 'ncku_bus', 'directions_railway', 'grey', true, '通往宿舍的公車'],
        ['MoodlAPI', 'moodlapi', 'drafts', 'orange', true, 'Moodle ，但是好看多了'],
        ['NCKU Database', 'NCKU_database', 'donut_large', 'purple', false, 'ououo']
      ],
      t: 0
    };
  },
  mounted () {
    M.AutoInit();
    this.init(true);
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
    header_click() {
      let pre = ['別點了又沒糖吃', '好喔^_^', '繼續阿:D', '好玩嗎?_?', '你點吧==']
      if(!this.user.name) location.href = 'login.html'
      else if(this.t + 1 >= pre.length) {
        M.toast({html: `<i class = material-icons> cake </i> ${++this.t}`, classes: this.random_color() + ' rounded'})
        for(var i = 0;i<this.data.length;i++) this.data[i][3] = this.random_color()
      } else M.toast({html: `<i class = material-icons> cake </i> ${pre[++this.t]}`, classes: 'amber rounded'})
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
</style>