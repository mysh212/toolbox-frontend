<template>

<!-- <div class = 'row'>
  <div class = 'card col s12 m4 s3' v-for = 'i in data' :key = 'i'>
    <div class = 'card-content'>
      <div v-for = 'j, k in i' :key = 'j'>
        <div class = 'chip'> {{ k }} </div>
        {{ j }}
      </div>
    </div>
  </div>
</div> -->
<div class = 'row'>
  <div class = 'card col s12 m4 s3' v-for = 'i in data' :key = 'i'>
    <div class = 'card-content'>
      <div class = 'card-title valign-wrapper'>
        <i class = 'material-icons'> assignment_turned_in </i>
        {{ i['評分項目'] }}
      </div>
      <div v-for = 'j, k in i' :key = 'j'>
        <template v-if = 'k != "評分項目" && j != " "'>
          <div class = 'chip' v-if = 'k != "成績"'> {{ k }} </div>
          <b v-if = 'k != "成績"'> {{ j }} </b>
          <h3 class = 'teal-text' v-else> {{ j }} </h3>
        </template>
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
  name: 'score',
  data() {
    return {
      data: []
    };
  },
  props: {
    id: '',
    session: ''
  },
  mounted () {
    // M.toast({html: this.c_id != undefined, classes: 'blue rounded'})
    M.AutoInit();
    // M.toast({html: 'ouob'})
    setTimeout(() => {
      $.post('https://api.citrc.tw/moodlapi/course/get_scores', {
        session: this.session,
        n: this.id
      }, (response) => {
        response = JSON.parse(response);
        if(!response['ok']) {
          M.toast({html: response['error'], classes: 'red rounded'})
          if(response['data'] != undefined && responsep['data']['logout']) {
            localStorage.removeItem('moodleID')
            localStorage.removeItem('moodleName')
            localStorage.removeItem('username')
            location.href = '/moodlapi_login.html'
          }
        }
        this.data = JSON.stringify(response.data)
        var columns = response.data.columns
        var data = response.data.data
        // M.toast({html: JSON.stringify(data)})

        var ans = []
        for(var i of data) {
          var pre = {}
          var skip = false
          for(var j = 0;j<columns.length;j++) {
            if(columns[j] == '成績' && i[j] == '-') {
              skip = 1
              break
            }
            pre[columns[j]] = i[j];
          }
          if(skip) continue;
          ans.push(pre)
        }
        this.data = ans.slice(1, ans.length)
      })
    }, 100);
  },
  methods: {
    isint(x){
      return /^\d+$/.test(x);
    },
    isalpha(x) {
      return /^[A-Z\(\)]$/i.test(x);
    }
  }
};
</script>
<style>
overflow {
    text-overflow: ellipsis;
}
</style>