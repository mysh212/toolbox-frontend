<template>

  <div class="progress" v-if = 'loading'>
    <div class="indeterminate"></div>
  </div>

  
  <div class="row">
    <div class="col s12">
      <ul class="tabs" id = 'tab'>
        <li class="tab col s4"><a class = 'active' :href="`#contents${course_id}`">課程</a></li>
        <!-- <li class="tab col s3"><a class="active" href="#test2">Test 2</a></li> -->
        <li class="tab col s4" :class = 'discuss ? "" : "disabled"'><a :href="`#discuss${course_id}`">討論</a></li>
        <li class="tab col s4"><a :href="`#score${course_id}`">成績</a></li>
      </ul>
    </div>
        
    <div class = 'container' :id = '`contents${course_id}`'>
      <br>
      <ul class = 'collapsible'>
        <li v-for = 'i, l in courses' :key = 'i'>
          <div class = 'collapsible-header'>
            <b :class = 'i.content && i.content.length == 0 ? "grey-text" : ""'> <i class = 'material-icons'> {{ i.content.length != 0 ? "bookmark" : "bookmark_border"}} </i> {{ i.name }} </b>
            <!-- <i class = 'material-icons right' v-if = 'i.content && i.content.length == 0'>bubble_chart</i> -->
          </div>
          <div class = 'collapsible-body' :class = 'i.content.length == 0 ? "center-align" : ""'>
            <!-- {{ i.content }}  -->
            <a :href = 'i.url' class = 'btn waves-effect orange' v-if = 'i.url'> Follow </a>
            <p class = 'red-text lighten-5 center-align' v-if = 'i.content.length == 0'><i class = 'material-icons'>error</i><br>Nothing Here.</p>
            <div class = 'row'>
              <div class = 'col s12 m4 s3' v-for = 'j, k in i.content' :key = 'j'>
                <!-- <a class = 'btn' @click="p(course_id,k,l)">click me for cookies</a> -->
                <div class = 'card waves-block waves-effect waves-orange hoverable' @click="p(course_id,k,l)" v-if = "j.type == 'modtype_forum'">
                  <div class = 'card-content'>
                    <div class = 'card-title_nav'>
                      {{ j.name }}
                    </div>
                  </div>
                  <div class = 'card-action'>
                    <a :href = ' j.url ' class = 'card-link'>LINK</a>
                    <!-- <div class = 'chip right truncate'>{{ j.type }}</div> -->
                  </div>
                </div>
                <a class = 'card waves-block waves-effect waves-teal hoverable black-text' v-else-if = 'j.type == `modtype_resource`' :href = '`https://api.citrc.tw/moodlapi/course/content/get_file?session=${id}&n=${JSON.stringify([course_id, l, k])}`' target = '_blank'>
                  <div class = 'card-content'>
                    <div class = 'card-title_nav'>
                      {{ j.name }}
                    </div>
                  </div>
                  <div class = 'card-action'>
                    <a :href = ' j.url ' class = 'card-link'>LINK</a>
                    <a :href = '`https://api.citrc.tw/moodlapi/course/content/get_file?session=${id}&n=${JSON.stringify([course_id, l, k])}`' class = 'card-link'>GET</a>
                    <!-- <div class = 'chip right truncate'>{{ j.type }}</div> -->
                  </div>
                </a>
                <a class = 'card waves-block waves-effect waves-purple hoverable black-text' v-else-if = 'j.type == `modtype_assign`' @click = 'get_homework(course_id, l, k)'>
                  <div class = 'card-content'>
                    <div class = 'card-title_nav'>
                      {{ j.name }}
                    </div>
                  </div>
                  <div class = 'card-action'>
                    <a :href = ' j.url ' class = 'card-link'>LINK</a>
                    <!-- <div class = 'chip right truncate'>{{ j.type }}</div> -->
                  </div>
                </a>
                <a class = 'card waves-block waves-effect waves-green hoverable black-text' v-else-if = 'j.type == `modtype_page`' @click = 'get_page(course_id, l, k)'>
                  <div class = 'card-content'>
                    <div class = 'card-title_nav'>
                      {{ j.name }}
                    </div>
                  </div>
                  <div class = 'card-action'>
                    <a :href = ' j.url ' class = 'card-link'>LINK</a>
                    <!-- <div class = 'chip right truncate'>{{ j.type }}</div> -->
                  </div>
                </a>
                
                <div class = 'card waves-block waves-effect' v-else>
                  <div class = 'card-content'>
                    <div class = 'card-title_nav'>
                      {{ j.name }}
                    </div>
                  </div>
                  <div class = 'card-action'>
                    <a :href = ' j.url ' class = 'card-link'>LINK</a>
                    <a :href = '`https://api.citrc.tw/moodlapi/course/content/get_file?session=${id}&n=${JSON.stringify([course_id, l, k])}`' class = 'card-link' v-if = 'j.type == "modtype_resource"'>GET</a>
                    <div class = 'chip right truncate'>{{ j.type }}</div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div :id = '`score${course_id}`'> <score :session = 'id' :id = 'course_id'></score> </div>
    <div :id = '`discuss${course_id}`'> <discuss :data = 'test'></discuss> </div>
  </div>

  <table>
    <tr v-for = 'i, j in tmp' :key = 'i'>
      <td> {{ j }} </td>
      <td> {{ i.content }} </td>
      <td v-html = 'i.html'> </td>
    </tr>
  </table>

  <div :id='`html`' class="modal">
    <div class="modal-content">
      <!-- <h4>Modal Header</h4>
      <p>A bunch of text {{ i }}</p> -->
      <div class = 'card'>
        <div class = 'card-content' v-html = 'html' />
      </div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  <div v-html = 'html' />
  <!-- <HelloWorld msg = 'ouob'/>
  <title_nav /> -->
  <!-- {{ c_id }} -->

  <!-- Modal Trigger -->
   <!-- {{ t }}
   <button @click = 't = 2'>ouob</button>
  <a class="waves-effect waves-light btn modal-trigger" :href="`#modal${t}`">Modal</a> -->

  <!-- Modal Structure -->
  <!-- <div v-for="i in [1,2,3]" :key="i">
  <div :id='`modal${i}`' class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text {{ i }}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  </div> -->

<!-- <a ref = 'current'>ouob</a> -->
  
  <!-- {{ test }} -->

</template>

<script>
/*eslint-disable*/
import $ from 'jquery';
import title_nav from '@/title/App.vue'
// import materialize from '/home/ysh/lab/vue/script/materialize'
import M from 'materialize-css'
import HelloWorld from '@/components/HelloWorld.vue';
import discuss from '@/moodlapi/course/Discuss.vue'
import score from '@/moodlapi/course/score.vue'

export default {
  name: 'course',
  data() {
    return {
      id: '',
      courses: [],
      course_id: '',
      loading: true,
      t: 0,
      test: undefined,
      discuss: false,
      inited: false,
      tmp: [],
      html: ''
    };
  },
  props: {
    c_id: ''
  },
  components: {
    HelloWorld,
    title_nav,
    discuss,
    score
  },
  mounted () {
    // location.href = '#score'
    // M.toast({html: this.c_id != undefined, classes: 'blue rounded'})
    M.AutoInit();
    
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });
    let as = new URLSearchParams(window.location.search);
    if(!as.has('id') && this.c_id == undefined) M.toast({html: 'No course ID given', classes: 'red rounded'})
    else this.course_id = as.get('id')
    if(localStorage.getItem('moodleID') == undefined) location.href = '/moodlapi_login.html'
    this.id = localStorage.getItem('moodleID')
    if(this.c_id != undefined) this.course_id = this.c_id;
    this.course_id = parseInt(this.course_id)
    $.post('https://api.citrc.tw/moodlapi/course/get_contents', {
      session: this.id,
      n: this.course_id
    }, (response) => {
      response = JSON.parse(response)
      if(!response['ok']) {
        M.toast({html: response['error'], classes: 'rounded red'})
        if(response['data'] != undefined && response['data']['logout']) {
          location.href = '/moodlapi_login.html?expired=1&exlogout'
        }
      }
      else this.courses = response['data']
      this.loading = false;
      this.inited = true;
    })

    var instance = M.Tabs.getInstance(document.getElementById('tab'));
    instance.swipeable = true
    // $('.tabs').tabs('swapeable', true);
  },
  methods: {
    p(n,k,l) {
      this.loading = true
      $.post('https://api.citrc.tw/moodlapi/course/content/get_discuss', {
        session: this.id,
        n: JSON.stringify([n, l, k])
      }, (response) => {
        // M.toast({html: response})
        response = JSON.parse(response)
        if(!response['ok']) {
          M.toast({html: "<i class = 'material-icons'>error</i>" + response['error'], classes: 'red rounded'})
          if(response['data'] != undefined && response['data']['logout']) {
            location.href = '/moodlapi_login.html?expired=1&exlogout'
          }
        } else this.test = response['data']
        this.loading = false
        this.discuss = true
        location.href = '#discuss'
      })
      // M.toast({html: `${n} ${l} ${k}`})
    },
    get_homework(a, b, c) {
      $.post('https://api.citrc.tw/moodlapi/get_assignment', {
        session: this.id,
        n: JSON.stringify([a, b, c])
      }, (response) => {
        // M.toast({html: response});
        response = JSON.parse(response);
        if(!response['ok']) M.toast({html: response.error, classes: 'red rounded'});
        if(!response['ok'] && response.data.logout) location.href = 'moodlapi_login.html?exlogout=1'
        this.tmp = response.data;
      })
    },
    get_page(a, b, c) {
      $.post('https://api.citrc.tw/moodlapi/get_page', {
        session: this.id,
        n: JSON.stringify([a, b, c])
      }, (response) => {
        // M.toast({html: response});
        response = JSON.parse(response);
        if(!response['ok']) M.toast({html: response.error, classes: 'red rounded'});
        if(!response['ok'] && response.data.logout) location.href = 'moodlapi_login.html?exlogout=1'
        location.href = '#html';
        console.log(M.Modal.init($('#html')[0]).open());
        this.html = response.data;
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