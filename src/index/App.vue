<template>
  <div class="progress" v-if='loading'>
    <div class="indeterminate"></div>
  </div>
<!-- {{ data }} -->
  <div class=row>
    <div class='col s12 m4 l3'>
      <div class='card waves-block waves-effect waves-yellow hoverable'>
        <div class=card-content>
          <div class=card-title>
            <h1> 您好 </h1>
            <template v-if='user.name'>
              <i class=material-icons> person </i>
              <b> {{ user.name }} </b>
            </template>
          </div>
        </div>
      </div>
    </div>
    <template v-for = 'i in data'>
      <div class='col s12 m6 l4' :key = 'i' v-if = 'user.name || i[4]'>
        <a class='card waves-block waves-effect hoverable black-text' :class = '`waves-${i[3]}`' :href = '`${i[1]}.html`'>
          <div class=card-content>
            <div class=card-title>
              <i class = material-icons> {{ i[2] }} </i>
              <h3> {{ i[0] }} </h3>
            </div>
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
      user: {
        id: undefined,
        name: undefined
      },
      data: [
        ['台南市公車', 'tainan_bus', 'directions_transit', 'teal', true],
        ['宿舍公車', 'ncku_bus', 'directions_railway', 'grey', true],
        ['MoodlAPI', 'moodlapi', 'drafts', 'orange', true],
        ['NCKU Database', 'NCKU_database', 'donut_large', 'purple', false]
      ]
    };
  },
  mounted () {
    M.AutoInit();
    this.init();
  },
  methods: {
    init() {
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
      })
    },
    isint(x){
      return /^\d+$/.test(x);
    }
  }
};
</script>
