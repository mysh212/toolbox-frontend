<template>
  <div class="progress" v-if = 'loading'>
    <div class="indeterminate"></div>
  </div>

  <div class = row>
    <div class = 'col s12'>
      <div class = 'card'>
        <div class = 'card-content blue lighten-5'>
          <div class = card-title> Hello, Early users </div>
          <b> 早安，這是 Moodlapi 前端的 <font class = 'cyan-text'> Alpha 測試版 </font> ，也就是說，這裡的功能還非常不完善，請各位見諒，如果有發現 bug 或是有甚麼想要的新功能，歡迎來 <a href = 'https://github.com/mysh212/toolbox-frontend'> 這裡 </a> 提 <font class = 'red-text text-lighten-2'> Issue </font> 或 <font class = 'green-text lighten-1'> Pull Request </font> ouob</b>
          <b class = 'right amber-text'> <i> ysh <sup> ST </sup> 2025 </i></b>
        </div>
      </div>
    </div>
  </div>

<div class = 'input-field'>
  <input type = 'text' v-model = 'search' id = 'search'/>
  <label for = 'search'><i class = 'material-icons'> search </i> 找課? </label>
  <p v-if = 'search'> 搜尋: <b> {{ search }} </b> </p>
</div>
<div>

  <div class = 'btn waves-effect green hoverable' @click = 'extend' :class = 'extended ? "disabled" : ""'> 延長連線時間 </div>
  <!-- <a class="waves-effect waves-light btn modal-trigger" :href="`#modal${t}`">Modal</a> -->
  <div v-for='i, j in courses' :key = 'j'>
  <!-- <div v-for="i in [1,2,3]" :key="i"> -->
  <div :id='`modal${j}`' class="modal">
    <div class="modal-content">
      <!-- <h4>Modal Header</h4>
      <p>A bunch of text {{ i }}</p> -->
      <div class = 'card'>
        <div class = 'card-content'>
          <h3> {{ i.name }} </h3>
          <blockquote> {{ i.eng }} </blockquote>
          <b class = 'grey-text text-lighten-4 right'> {{ i.id }} </b>
        </div>
      </div>
      <course :c_id = 'j' v-if = 't[j]'></course>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  <!-- </div> -->
  </div>
</div>

<div class = 'row'>
  <template v-for="i, j in courses" :key = 'i'>
    <div class = 'col s12 m4 l3' v-if = 'search == "" || i.name.indexOf(search) != -1'>
      <a class = 'card waves-block waves-effect waves-red lighten-5 hoverable'>
        <div class = 'card-content modal-trigger' style="color: black" @click = 't[j] = true' :href = '`#modal${j}`'>
          <h5 class = 'truncate'>
            {{ i.name }}
          </h5>
          <blockquote class = 'truncate'>
            {{ i.eng == '' ? ':D' : i.eng }}
          </blockquote>
        </div>
        <div class = 'card-action'>
          <a class = 'card-link waves-effect waves-orange btn-flat' :href = 'i.url' target = '_blank' v-if="i.url"><i class = 'material-icons'>link</i></a>
          <a class = 'card-link waves-effect waves-orange btn-flat disabled grey-text' disabled v-else><i class = 'material-icons'>link</i></a>
          <a class = 'card-link waves-effect waves-orange btn-flat modal-trigger' @click = 't[j] = true' :href = '`#modal${j}`' v-if="i.url"><i class = 'material-icons'>pageview</i></a>
          <a class = 'card-link waves-effect waves-orange btn-flat modal-trigger disabled grey-text' v-else><i class = 'material-icons'>pageview</i></a>
          <a class = 'card-link waves-effect waves-orange btn-flat' :href = '`/moodlapi_course.html?id=${j}`' v-if="i.url"><i class = 'material-icons'>open_in_new</i></a>
          <a class = 'card-link waves-effect waves-orange btn-flat disabled grey-text' v-else><i class = 'material-icons'>open_in_new</i></a>
          <!-- <div class = 'chip right' v-if = 'i.root'> <i class = 'material-icons'> group_work </i> </div> -->
          <div class = 'chip right'>{{ j + 1 }}</div>
        </div>
      </a>
    </div>
  </template>
</div>

<!-- <a ref = 'current'>ouob</a> -->
  
  <!-- {{ test }} -->

</template>

<script>
/*eslint-disable*/
import $ from 'jquery';
// import materialize from '/home/ysh/lab/vue/script/materialize'
import M from 'materialize-css'
import course from '@/moodlapi/course/App.vue'

export default {
  name: 'App',
  data() {
    return {
      id: '',
      courses: [],
      loading: true,
      t: [],
      search: '',
      extended: false
    };
  },
  components: {
    course
  },
  mounted () {
    // this.loading = true;
    M.AutoInit();
    if(localStorage.getItem('extended') != undefined) this.extended = true;
    if(localStorage.getItem('moodleID') == undefined) location.href = '/moodlapi_login.html'
    this.id = localStorage.getItem('moodleID')
    $.post('https://api.citrc.tw/moodlapi/get_courses', {
      session: this.id
    }, (response) => {
      response = JSON.parse(response)
      if(!response['ok']) {
        M.toast({html: response['error'], classes: 'rounded red'})
        if(response['data'] != undefined && response['data']['logout']) {
          location.href = '/moodlapi_login.html?expired=1&exlogout'
        }
      }
      else this.courses = response['data']
      for(var i of this.courses) {
        // M.toast({html: JSON.stringify(i)})
        var ans = ''
        if(i?.name?.indexOf('(母課程)') != -1) i['root'] = true;
        else i['root'] = false;
        // i.name = i?.name?.replace('(母課程)', '')
        for(var j = i?.name?.length;j>=0;j--) {
          // alert(i?.name)
          if(i.name[j] == undefined) continue
          if(this.isalpha(i?.name[j]) || i?.name[j] == ' ') {
            ans = i?.name[j] + ans
          } else break
        }
        if(ans.length != 0) i.name = i.name.slice(0, -ans.length)
        i.eng = ans
      }
      this.t = Array(this.courses.length).fill(false)
      this.loading = false;
    })
  },
  methods: {
    extend() {
      $.post('https://api.citrc.tw/moodlapi/extend_session', {
        'session': this.id,
        'id': localStorage.getItem('id')
      }, (response) => {
        response = JSON.parse(response);
        if(!response['ok']) M.toast({html: response.error, classes: 'red rounded'})
        else {
          M.toast({html: '<i class = material-icons> check </i> 成功', classes: 'green rounded'})
          localStorage.setItem('extended', true)
          this.extended = true
        }
      })
    },
    isint(x){
      return /^\d+$/.test(x);
    },
    isalpha(x) {
      return /^[A-Z\(\)\d\_\，\-]$/i.test(x);
    }
  }
};
</script>
<style>
overflow {
    text-overflow: ellipsis;
}
</style>