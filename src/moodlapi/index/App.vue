<template>
  <div class="progress" v-if = 'loading'>
    <div class="indeterminate"></div>
  </div>

<div class = 'input-field'>
  <input type = 'text' v-model = 'search' id = 'search'/>
  <label for = 'search'><i class = 'material-icons'> search </i> 找課? </label>
  <p v-if = 'search'> 搜尋: <b> {{ search }} </b> </p>
</div>
<div>
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
      <a class = 'card waves-block waves-effect waves-red lighten-5'>
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
import jQuery from 'jquery';
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
      search: ''
    };
  },
  components: {
    course
  },
  mounted () {
    // this.loading = true;
    M.AutoInit();
    if(localStorage.getItem('moodleID') == undefined) location.href = '/moodlapi_login.html'
    this.id = localStorage.getItem('moodleID')
    $.post('https://api.citrc.tw/moodlapi/get_courses', {
      session: this.id
    }, (response) => {
      response = JSON.parse(response)
      if(!response['ok']) {
        M.toast({html: response['error'], classes: 'rounded red'})
        if(response['data'] != undefined && response['data']['logout']) {
          localStorage.removeItem('moodleID')
          localStorage.removeItem('moodleName')
          location.href = '/moodlapi_login.html?expired=1'
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