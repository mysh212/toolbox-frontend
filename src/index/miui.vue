<template>

  <div class = 'card col s12 m5 l3 center-align'>
    <!-- <div class="progress" v-if='loading'>
      <div class="indeterminate"></div>
    </div> -->
    <div class = card-content>
      <b class = card-title> <i class = material-icons> backup </i> 最新系統版本 </b>
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
        <a href = 'https://sourceforge.net/projects/xiaomi-eu-multilang-miui-roms/files/xiaomi.eu/HyperOS-STABLE-RELEASES/HyperOS2.0/' target = '_blank'> <b class = 'blue-text' v-if = 'data.length != 0'> {{ data }} </b> </a>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import jQuery from 'jquery';
// import materialize from '/home/ysh/lab/vue/script/materialize'
import M from 'materialize-css'

export default {
  name: 'miui',
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
    $.post('https://api.citrc.tw/ysh/miui', {
      name: 'marble',
      id: this.id
    }, (response) => {
      response = JSON.parse(response);
      if(!response['ok']) M.toast({html: response.error, classes: 'red rounded'})
      this.data = response['data'][0]
      this.loading = false;
    })
  },
  props: {
    id: '',
    color: 'blue'
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