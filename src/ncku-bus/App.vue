<template>

<div class="progress" v-if = 'loading'>
      <div class="indeterminate"></div>
</div>

  <br>
  <div class="container">
    <a class = 'btn-large red lighten-3 waves-effect' @click="check(false)"> To Station </a>
    <a class = 'btn-large purple lighten-3 waves-effect' @click="check(true)"> To Dorm </a>
    <div id = 'routes' class = 'hide-on-med-and-down'>
      <div v-for="i in route" :key = 'i'>
        <div class = 'card yellow lighten-5 waves-block waves-effect waves-ripple' @click="check(i?.id)">
          <div class = 'card-content'>
            <b> {{ i?.name }} </b>
            <div class = 'chip'> {{ i?.from }} </div>
            <div class = 'chip'> {{ i?.to }} </div>
            <div class = 'chip red' v-if="i?.rev == 1"> 逆行 </div>
            <b v-if="i?.time" class = 'right'> {{ i?.time }} {{ isint(i?.time) ? "分鐘" : "" }} </b>
            <b class = 'right chip'> {{ i?.id }} </b>
            <b class = 'right chip'> {{ i?.stop }} </b>
            <!-- <b class = 'right'> {{ i?.stopStatus }}</b>
            <div class = 'chip'> {{ i?.lat }} </div>
            <div class = 'chip'> {{ i?.lon }} </div> -->
          </div>
        </div>
      </div>
    </div>
    <div id = 'routes' class = 'hide-on-large-only'>
      <div v-for="i in route" :key = 'i'>
        <div class = 'card yellow lighten-5 waves-block waves-effect waves-ripple' @click="check(i?.id)">
          <div class = 'card-content'>
            <b> {{ i?.name }} </b>
            <div class = 'chip right'> {{ i?.from }} </div>
            <div class = 'chip right'> {{ i?.to }} </div>
            <div class = 'chip red right' v-if="i?.rev == 1"> 逆行 </div>
          </div>
          <div class = 'divider'></div>
          <div class = 'card-content'>
            <b v-if="i?.time" class = 'right'> {{ i?.time }} {{ isint(i?.time) ? "分鐘" : "" }} </b>
            <b class = 'chip'> {{ i?.id }} </b>
            <b class = 'chip'> {{ i?.stop }} </b>
            <!-- <b class = 'right'> {{ i?.stopStatus }}</b>
            <div class = 'chip'> {{ i?.lat }} </div>
            <div class = 'chip'> {{ i?.lon }} </div> -->
          </div>
        </div>
      </div>
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
    <li><a class = 'btn-floating blue' href = '#buses'><i class = 'material-icons'>directions_bus</i></a></li>
    <li><a class = 'btn-floating green' href = '#routes'><i class = 'material-icons'>timeline</i></a></li>
  </ul>
</div>

  
  {{ test }}

</template>

<script>
/*eslint-disable*/
import $ from 'jquery';
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
      route_history: new Set(),
      app: '',
      to: JSON.parse('{"10450":"0","10451":"1","1070":"0","1077":"1","1117":"1","1412":"0","1602":"1","2902":"0","10019":"1","10162":"0"}'),
      rev: false,
      loading: false
    };
  },
  mounted () {
    M.AutoInit();
    // var tmp = {};
    // setTimeout(() => {
    //   for(var i of this.route) {
    //     tmp[i.id] = i.rev;
    //   }
    //   M.toast({html: JSON.stringify(tmp)});
    // }, 3000);
    // this.route_history.delete('77路');
    // this.get_stop('成大醫院(小東路)', 1, '77');
  //   $('.nav').each(function() {
  //   var $this = $(this);
  //   var $target = $('#' + $(this).attr('data-target'));
  //   $this.pushpin({
  //     top: $target.offset().top,
  //     bottom: $target.offset().top + $target.outerHeight() - $this.height()
  //   });
  // });
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.pushpin');
    //   var instances = M.Pushpin.init(elems, options);
    // });
    // this.check('10162');
  },
  methods: {
    check(rev) {
      this.loading = true;
      this.route_history = new Set()
      this.route = []
      if(rev) {
        this.get_stop('台南火車站(南站)',1);
        this.get_stop('台南火車站(北站)',1);
        this.get_stop('香格里拉飯店',1);
      } else {
        this.get_stop('成大醫院(小東路)');
        this.get_stop('長榮小東路口');
        this.get_stop('東興里');
      }
    },
    get_stop(name, rev = 0, key = '') {
      this.loading = true;
      location.href = '#routes';
      var url = 'https://2384.tainan.gov.tw/NewTNBusAPI_V2/API/CrossRoutesV2.ashx'
      $.post(url, {stopnamecht: name}, (data) => {
        // M.toast({html: JSON.stringify(data)});
        // this.route = [];
        if(!this.route) this.route = []
        for(var now of data) {
          for(var i of now['info']) {
            if(this.route_history.has(i?.RouteName)) continue
            if(this.to[i?.RouteID] == undefined) continue
            if((this.to[i?.RouteID] != i.GoBack) ^ (rev == 1)) continue
            // M.toast({html: JSON.stringify([this.to[i?.RouteID], i.GoBack])})
            this.route.push({name: i?.RouteName, id: i?.RouteID, time: i?.Time, from: i?.Dept, to: i?.Dest, rev: i?.GoBack, stop: name});
            this.route_history.add(i?.RouteName);
          }
        }
        // M.toast({html: JSON.stringify(this.route_history)});
        this.route.sort()
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
    isint(x){
      return /^\d+$/.test(x);
    }
  }
};
</script>
