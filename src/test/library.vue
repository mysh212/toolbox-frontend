<template>
{{ test }}
  <div class = 'card col s12 m5 l3 center-align'>
    <!-- <div class="progress" v-if='loading'>
      <div class="indeterminate"></div>
    </div> -->
    <div class = card-content>
      <b class = card-title> <i class = material-icons> insert_chart </i>成大圖書館現況 </b>
        <div class="preloader-wrapper big active" v-if = 'loading'>
            <div class="spinner-layer" v-for = 'i in [`blue`, `yellow`, `red`, `green`]' :key = 'i' :class = '`spinner-${i}`'>
                <div class="circle-clipper left">
                <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
                </div><div class="circle-clipper right">
                <div class="circle"></div>
                </div>
            </div>
        </div>
      <div class = row>
        <div v-for = 'i, j in data' class = 'col s4' :key = 'j'>
          <b> {{ '總館 醫分館 新K館 D-24 未來館'.split(' ')[j] }} </b>
          <h3 :class = '`${color}-text`'> {{ i[1][0] }} </h3>
          <!-- <div class = divider /> -->
          
          <div class="progress">
            <div class="determinate" :style="`width: ${get_rate(i[1][0], i[1][1])}%`"></div>
          </div>
          <b class = grey-text> {{ i[1][1] }} </b>
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
    id: '',
    color: 'blue',
    test: ''
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
    get_rate(a, b) {
      a = parseInt(a.replace(',', ''))
      b = parseInt(b.replace(',', ''))
      return Math.round(a * 100 / b);
    },
    isint(x){
      return /^\d+$/.test(x);
    }
  },
  computed: {
    test() {
      return this.test;
      let t = new VueElement();
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