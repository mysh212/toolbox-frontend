<template>
  
  <!-- <div class = 'row'>
    <br>
    <div class = 'z-depth-2 cyan col s1'>
      <i class = 'material-icons'> location_on </i> <br>
      {{ loc.pos[0] }} <br> {{ loc.pos[1] }}
    </div>
  </div> -->
  
  <div class="progress" v-if = 'loading'>
    <div class="indeterminate"></div>
  </div>
<div class = 'input-field'>
  <input type = 'text' v-model = 'search.text' id = 'search'/>
  <label for = 'search'> Search Route </label>
  <p v-if = 'search.text'> Searching: {{ search.text }} </p>
</div>

<div class = 'btn' v-if = 'loc.mmin' @click = 'location.href = "#current"'> 距離最近的站牌： {{ bus?.data[loc.mmin]?.name }} </div>
        
  <div class="container" id = 'buses'>
    <div class="row">
      <div class="col s12 m4">
        <div class = 'card white waves-block waves-effect'>
          <div class = 'card-content' @click="this.app = ''; check(this.bus_number);" :class = 'this.app == "" ? "green" : ""'>
            <b> From </b>
            <h3> {{ bus?.Go }} </h3>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div class = 'card cyan'>
          <div class = 'card-content white-text'>
            <b> Route </b>
            <h3> {{bus?.name}} </h3>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div class = 'card white waves-block waves-effect' @click="this.app = '&goback=1'; check(this.bus_number);">
          <div class = 'card-content' :class = 'this.app != "" ? "green" : ""'>
            <b> To </b>
            <h3> {{ bus?.Back }} </h3>
          </div>
        </div>
      </div>
    </div>
    <!-- <a class = 'btn-large waves-effect cyan' href = '#buses'> Bus </a>
    <a class = 'btn-large waves-effect cyan' href = '#routes'> Route </a> -->
    <div class = 'row'>
      <div class = 'col s12 m6 hide-on-med-and-down'>
        <div v-for="i,j in bus?.data" :key = 'i'>
          <div class = 'card waves-block waves-effect' @click="get_stop(i?.name)">
            <div class = 'card-content'>
              <b> {{ i?.name }} </b>
              <b class = 'right'> {{ i?.stopStatus }}</b>
              <div class = 'chip'> {{ i?.lat }} </div>
              <div class = 'chip'> {{ i?.lon }} </div>
              <div class = 'chip' v-if = 'i?.dt'><i class = 'material-icons'> location_on </i> {{ i?.dt }} </div>
              <i class = 'material-icons' v-if = 'j == loc.mmin' id = 'current'> check </i>
            </div>
          </div>
        </div>
      </div>
      <div class = 'col s12 m6 hide-on-large-only'>
        <div v-for="i,j in bus?.data" :key = 'i'>
          <div class = 'card waves-block waves-effect' @click="get_stop(i?.name)" :class = 'j == loc.mmin ? "pulse" : ""'>
            <div class = 'card-content'>
              <b> {{ i?.name }} </b>
            </div>
            <div class = 'divider'></div>
            <div class = 'card-content'>
              <div class = 'chip'> {{ i?.lat }} </div>
              <div class = 'chip'> {{ i?.lon }} </div>
              <div class = 'chip' v-if = 'i?.dt'><i class = 'material-icons'> location_on </i> {{ i?.dt }} </div>
              <b class = 'right'> {{ i?.stopStatus }}</b>
              <i class = 'material-icons' v-if = 'j == loc.mmin' id = 'current'> check </i>
            </div>
          </div>
        </div>
      </div>
      <div id = 'routes' class = 'col s12 m6'>
        <div v-for="i in route" :key = 'i'>
          <div class = 'card yellow lighten-5 waves-block waves-effect' @click="check(i?.id)" v-if = '!search.text || i?.name.includes(search.text)'>
            <div class = 'card-content'>
              <b> {{ i?.name }} </b>
              <b v-if="i?.time" class = 'right'> {{ i?.time }} {{ isint(i?.time) ? "分鐘" : "" }} </b>
              <b v-else class = 'right'> {{ i?.id }} </b>
              <!-- <b class = 'right'> {{ i?.stopStatus }}</b>
              <div class = 'chip'> {{ i?.lat }} </div>
              <div class = 'chip'> {{ i?.lon }} </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>


<div class="fixed-action-btn">
  <a class="btn-floating btn-large red">
    <i class="large material-icons">mode_edit</i>
  </a>
  <ul>
    <!-- <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
    <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
    <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
    <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li> -->
    <li><a class = 'btn-floating blue' href = '#current' v-if = 'loc.mmin' ><i class = 'material-icons'>directions_bus</i></a></li>
    <li><a class = 'btn-floating blue' href = '#buses'><i class = 'material-icons'>directions_bus</i></a></li>
    <li><a class = 'btn-floating green' href = '#routes'><i class = 'material-icons'>timeline</i></a></li>
  </ul>
</div>

<!-- <a ref = 'current'>ouob</a> -->
  
  <!-- {{ test }} -->

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
      test: '',
      bus_number: '',
      bus: null,
      route: null,
      app: '',
      loading: false,
      loc: {
        pos: [-1,-1],
        mmin: null
      },
      search: {
        text: ''
      }
    };
  },
  mounted () {
    M.AutoInit();
    $.get('https://2384.tainan.gov.tw/NewTNBusAPI_V2/API/PathListV2.ashx', (data) => {
      this.route = data;
    })
    setInterval(() => {
      if(this.bus_number != '') this.check(this.bus_number, false);
    }, 10000);
    // M.toast({html: 'testing', classes: 'green rounded'})
    navigator.geolocation.getCurrentPosition((loc) => {
      // M.toast({html: 'ok'})
      M.toast({html: '<i class = "material-icons"> check </i>' + ([loc.coords.latitude, loc.coords.longitude]), classes: 'green rounded'})
      this.loc.pos = [loc.coords.latitude, loc.coords.longitude];
      this.update_location();
    }, (error) => {M.toast({html: 'ERROR while getting location.', classes: 'red rounded'})})

  },
  methods: {
    check(id, o = true) {
      this.loading = true;
      if(o) location.href = '#buses';
      this.bus_number = id;
      var url = 'https://2384.tainan.gov.tw/IMP/jsp/rwd_api/ajax_routeinfo.jsp?id=' + id + '&lang=cht' + this.app;
      $.get(url, (data) => {
        // M.toast({html: 'ouob'});
        // M.toast({html: JSON.stringify(data)});
        this.test = data;
        if(!data['result']) M.toast({html: JSON.stringify(data), classes: 'rounded red'});
        else M.toast({html: 'Bus status updated.', classes: 'rounded green'})
        // data = JSON.parse(data);
        // M.toast({html: data['result']});
        this.bus = data;
        this.update_location(o);
        this.loading = false;
      })
    },
    get_stop(name) {
      this.loading = true;
      location.href = '#routes';
      var url = 'https://2384.tainan.gov.tw/NewTNBusAPI_V2/API/CrossRoutesV2.ashx'
      $.post(url, {stopnamecht: name}, (data) => {
        // M.toast({html: JSON.stringify(data)});
        this.route = [];
        for(var i of data[0]['info']) {
          this.route.push({name: i.RouteName, id: i.RouteID, time: i.Time});
        }
        this.route.sort((a,b) => {
          // M.toast({html: a?.time + ' ' + b?.time})
          var l = a?.time,r = b?.time;
          if(a?.time == '即將進站') l = "-10000";
          else if(!this.isint(a?.time)) l = "10000";
          if(b?.time == '即將進站') r = "-10000";
          else if(!this.isint(b?.time)) r = "10000";
          // M.toast({html: l + ' ' + r})
          return (parseInt(l) - parseInt(r));
        })
        this.loading = false;
      })
    },
    update_location(o = true) {
      if(this.bus == null || (this.loc.pos[0] == -1 && this.loc.pos[1] == -1)) return;
      var dt = (a,b) => {
        return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
      }
      var mmin, d;
      mmin = 1000000;
      d = -1;
      var t = 0;
      for(var i of this.bus?.data) {
        var now = dt(this.loc.pos, [i.lat, i.lon])
        i['dt'] = dt(this.loc.pos, [i.lat, i.lon])
        if(now < mmin) mmin = now, d = t;
        t++;
      }
      this.loc.mmin = d;
      if(o) setTimeout(() => {location.href = '#current'}, 100)
      // this.$refs.current.lastElementChild?.scrollIntoView({behavior: 'smooth'})
    },
    isint(x){
      return /^\d+$/.test(x);
    }
  }
};
</script>
