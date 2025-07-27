<template>

  <div class="progress" v-if='loading'>
    <div class="indeterminate"></div>
  </div>
  <!-- <title_nav :out_id = 'user.id' :out_user = 'user.name'/> -->
   <template v-for = 'i, j in result' :key = 'j'>
<div class = 'modal' :id = '`user${j}`'>
    <div class="modal-content">
      <img :src = 'i.profileimageurl' />
      <div class = 'right chip teal' v-if = 'i["宿舍"]'> 宿舍 </div>
      <h3 class = right> {{ i['宿舍'] }} </h3><br>
      <div class = 'chip right pink' v-if = 'i["宿舍候補序號"]'> 候補序號 </div>
      <b class = 'grey-text large right' v-if = 'i["宿舍候補序號"]'> <h5> {{ i["宿舍候補序號"] }} </h5> </b>
      <h3 class = cyan-text> {{ i.fullname }} </h3> 
      <div class = 'amber chip'> 學院 </div>
      <b class = amber-text> {{ i.department }} </b>
      <b class = 'grey-text right'> {{ i.idnumber }} </b>
      <div v-for = 'k, l in i' :key = 'l'>
        <template v-if = '!["fullname", "department", "idnumber", "profileimageurlsmall", "profileimageurl", "宿舍", "宿舍候補序號", "old_dorm"].includes(l) && k != null'>
          <div class = chip> {{ l }} </div>
          <b class = grey-text> {{ k }} </b>
        </template>
      </div>
      <template v-if = 'i.idnumber && i.idnumber?.length == 9'>
        <div>
          <div class = chip> 入學方式 </div>
          <b> {{ get_tunnel(i.idnumber) }} </b>
        </div>
        <div>
          <div class = chip> 入學年度 </div>
          <b> {{ get_year(i.idnumber) }} </b>
        </div>
      </template>
      <table v-if = 'i.old_dorm?.length != 0'>
        <thead>
          <tr>
            <td v-for = 'j, k in i.old_dorm[0]' :key = 'j'>
              <b> {{ k }} </b>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for = 'j in i.old_dorm' :key = 'j' :class = 'j["年段"] == 113 ? "orange-text" : ""'>
            <td v-for = 'k in j' :key = 'k'>
              {{ k }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-blue btn-flat">Close</a>
    </div>
</div>
</template>
  <div class='row'>
    <div class='col' :class = 'all_pages > 1 ? "s6 m10" : "s12"'>
      <div class='input-field'>
        <input type='text' v-model='search' id='search' @keydown.enter='page = 0; find()' />
        <label for='search'><i class='material-icons tiny'> search </i> 找人? </label>
        <!-- <a class='btn-large amber waves-effect waves-amber hoverable' @click='page = 0; find()'> 找人! </a> -->
        <div class = 'row'>
          <a class='card col s12 amber waves-effect waves-block hoverable' :class = 'now_search == search ? "" : "pulse"' @click='page = 0; find()' @dblclick="page = 0; find(true)"> <div class = 'card-content center-align white-text'> 找人! </div> </a>
        </div>
        <p v-if='search'> 搜尋: <b> {{ search }} </b> </p>
      </div>
    </div>
    <div class='col s6 m2' v-if = 'all_pages > 1'>
      <div class='input-field'>
        <input type='text' v-model.lazy='user_page' id='page'  @change = 'get_page'/>
        <label for='page'><i class='material-icons tiny'> av_timer </i> 頁碼 </label>
        <!-- <a class='btn-large amber waves-effect waves-amber hoverable right' @click='get_page'> 找頁數! </a> -->
        <div class = 'row'>
          <a class='card col s12 amber waves-effect waves-block hoverable right' :class = 'user_page - 1 == page ? "" : "pulse"' @click='get_page' @dblclick="get_page(true)"> <div class = 'card-content center-align white-text'> 找頁數! </div> </a>
        </div>
        <!-- <p v-if='search'> 搜尋: <b> {{ search }} </b> </p> -->
      </div>
    </div>
  </div>

  <ul class="pagination" v-if='all_pages > 1'>
    <li class="waves-effect" v-if='page != 0'><a href="#!"
        @click='this.page--; find()'><i class="material-icons">chevron_left</i></a></li>
    <li class="waves-effect" v-if='page != 0'><a href="#!" @click='this.page = 0; find()'> 1 </a></li>
    <li class="waves-effect"><a href="#!"> {{ page + 1 }}</a></li>
    <li class="waves-effect" v-if='page != all_pages - 1'><a href="#!" @click='this.page = all_pages - 1; find()'> {{
        all_pages }} </a></li>
    <li class="waves-effect" v-if='page != all_pages - 1'><a href="#!"
        @click='this.page++; find()'><i class="material-icons">chevron_right</i></a></li>
  </ul>

  <div class='row' v-if='result.length == 0'>
    <div class='col s12'>
      <div class='center-align grey-text'>
        <i class='material-icons large'>search</i>
        <h5> 輸入來開始 </h5>
      </div>
    </div>
  </div>

  <b v-if='all_pages != -1'> 共有 <i class='orange-text'> {{ all_pages }} </i> 頁 </b>

  <table>
    <thead>
      <tr>
        <template v-for='i, j in result[0]' :key='i'>
          <th v-if = 'j != "old_dorm"'>
            <a class = 'waves-block waves-effect' :class = 'sort == j ? "cyan-text" : "black-text"' @click = 'sort = (sort == j ? null : j); find()'> {{ j }} </a>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr class='hoverable modal-trigger' v-for='i, j in result' :key='j' :href = '`#user${j}`'>
        <template v-for='k, l in i' :key='k'>
          <td v-if = 'l != "old_dorm"'>
            <!-- <div class='chip'> {{ l }} </div> -->
            <img  class = 'center-align' :src = 'k' v-if = 'k != null && k != undefined && k.toString().indexOf("moodle.ncku.edu.tw") != -1' width = '25px' height = '25px'/>
            <template v-else> {{ k }} </template>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
  
  <!-- {{ user.id }}
  {{ user.name }} -->
  
  <!-- Striped Table
  {{ data }} -->
</template>

<script>
/*eslint-disable*/
import $ from 'jquery';
// import materialize from '/home/ysh/lab/vue/script/materialize'
import title_nav from '@/title/App.vue'
import M from 'materialize-css'

export default {
  name: 'discuss',
  data() {
    return {
      data: [],
      result: [],
      all_pages: -1,
      loading: false,
      search: '',
      page: 0,
      user_page: 0,
      now_search: '',
      sort: null,
      user: {
        name: '2',
        id: -1
      }
    };
  },
  components: {
    title_nav
  },
  mounted () {
    M.AutoInit();
    // this.find(true)
    
    this.user.id = localStorage.getItem('id')
      // if(this.user.id) $.post('https://api.citrc.tw/wbox/whoami', {'id': this.user.id}, (response) => {
      //       // alert(response)
      //       response = JSON.parse(response)
      //       if(!response['ok']) M.toast({html: response.error, classes: 'red rounded'})
      //       if(!response['ok'] && response.data.logout) localStorage.removeItem('id'), this.id = undefined;
      //       else this.user.name = response['data'];
      //       if(location.href.indexOf('?login') != -1) M.toast({html: '<i class=\'material-icons\' style=\'padding-right: 10px;\'> check_circle </i> Hello, ' + this.user, classes: 'green rounded'})
      //   }
      // )
  },
  methods: {
    find(ignore_warning = false) {
      this.user_page = this.page + 1
      // alert(1)
      this.loading = true
      if(!ignore_warning && this.search == '') {
        M.toast({html: '你倒是輸入點東西啊', classes: 'teal rounded'})
        this.loading = false
        return
      }
      $.post('https://api.citrc.tw/NCKU/whoisthis', {
        id: this.user.id,
        key: this.search,
        n: this.page,
        sort: this.sort
      }, (response) => {
        response = JSON.parse(response.replace('nan', 'None'))
        if(!response['ok']) {
          if(response.data.logout) {
            localStorage.setItem('error', response.error)
            location.href = '/login.html?exlogout'
          }
          M.toast({html: response.error, classes: 'red rounded'})
        }
        this.data = response.data
        this.result = response.data.result
        // alert(JSON.stringify(this.result))
        this.all_pages = response.data.pages
        this.loading = false
        setTimeout(M.updateTextFields, 100)
        setTimeout(M.AutoInit, 100)
        this.now_search = this.search
        // for(var i = 0; i<this.result.length;i++) this.result[i]['old_dorm'] = JSON.parse(this.result[i]['歷年宿舍']);
      })
    },
    get_tunnel(x) {
      x = parseInt(x.slice(5, 6));
      let pre = {
        0: '體保生',
        1: '指考 / 分科',
        4: '繁星 / 特殊選材',
        5: '僑生',
        6: '學測申請',
        7: '外籍生',
        8: '交換生'
      };
      // M.toast({html: x});
      return (pre[x] ? pre[x] : '未知');
    },
    get_year(x) {
      return '1' + x.slice(3,5);
    },
    get_page(o = false) {
      if(!this.isint(this.user_page) || this.user_page <= 0 || this.user_page > this.all_pages) {
        M.toast({html: '好好打數字好嗎', classes: 'blue rounded'})
        this.user_page = this.page + 1
        return;
      }
      this.page = parseInt(this.user_page) - 1
      this.find(o)
    },
    isint(x){
      return /^\d+$/.test(x);
    },
    isalpha(x) {
      return /^[A-Z]$/i.test(x);
    }
  }
};
</script>
<style>
overflow {
    text-overflow: ellipsis;
}
</style>