<template>
    
    <nav>
        <div class="nav-wrapper grey">
            <ul>
                <a> <i class = 'material-icons sidenav-trigger' data-target = 'slide-out'> menu </i> </a>
                <a href="/" class="brand-logo">  <i class="material-icons hide-on-med-and-down" style="padding-left: 10px">cloud</i> ysh's toolbox</a>
            </ul>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href = '/moodlapi_login.html'><i v-if='mduser' class="material-icons tiny"> person </i></a></li>
                <li><a href="/moodlapi_login.html" v-if="mduser"> {{ mduser }} </a></li>
                <li><a href = '/user.html'><i v-if='user' class="material-icons tiny"> fingerprint </i></a></li>
                <li><a href="/user.html" v-if="user"> {{ user }} </a></li>
                <!-- <li><a href="/">Problems</a></li>
                <li><a @click="upload">Upload Problems</a></li>
                <li><a href="/login.html" v-if="!user">Login</a></li>
                <li><a v-if="user" @click="logout">Logout</a></li> -->
                <li><a href='tainan_bus.html'>Bus in <b class = 'orange-text'>Tainan</b></a></li>
                <li><a href='ncku_bus.html'>Bus in <b class = 'red-text'>NCKU</b></a></li>
                <li><a href='moodlapi.html'>Moodl <font color = 'orange'> api </font></a></li>
                <li><a href='NCKU_database.html' v-if = 'id'> NCKU <font class = 'purple-text'> Database </font></a></li>
            <li><a href="/login.html" v-if="!user">Login</a></li>
            <li><a v-if="user" @click="logout">Logout</a></li>
            </ul>
        </div>
    </nav>
    
    <ul id="slide-out" class="sidenav">
        <h5 style = 'padding-left: 25px;'> ysh's toolbox </h5>
        <!-- <li><div class="user-view">
            <div class="background">
                <i class = 'material-icons'> cloud </i>
            </div>
            <a href="#user"><img class="circle" src="images/yuna.jpg"></a>
            <a href="#name"><span class="white-text name">John Doe</span></a>
            <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
        </div></li>
        <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
        <li><a href="#!">Second Link</a></li> -->
        <li><div class="divider"></div></li>
        <li><a class="subheader">Bus</a></li>
        <li><a class = 'waves-effect' href='tainan_bus.html'>Bus in <b class = 'orange-text'>Tainan</b></a></li>
        <li><a class = 'waves-effect' href='ncku_bus.html'>Bus in <b class = 'red-text'>NCKU</b></a></li>
        <li><a class = 'waves-effect' href='moodlapi.html'>Moodl <font color = 'orange'> api </font></a></li>
        <li><a class = 'waves-effect' href='NCKU_database.html' v-if = 'id'> NCKU <font class = 'purple-text'> Database </font></a></li>
        <li v-if='mduser'><a href = '/moodlapi_login.html'><i class="material-icons"> person </i> {{ mduser }} </a></li>
        <li v-if='user'><a href = '/user.html'><i class="material-icons"> fingerprint </i> {{ user }} </a></li>
        <li><a href="/login.html" v-if="!user">Login</a></li>
        <li><a v-if="user" @click="logout">Logout</a></li>
        <!-- <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
        <li><a class="waves-effect" href="#!">Third Link With Waves</a></li> -->
    </ul>
<!-- <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a> -->


<!-- <p> id: {{ id }} </p> -->
                        
</template>

<script>
/*eslint-disable*/
import $ from 'jquery';
// import materialize from '/home/ysh/lab/vue/script/materialize'
import M from 'materialize-css'

export default {
    name: 'title_nav',
    data() {
        return {
            id: 0,
            user: undefined,
            mduser: undefined,
        }
    },
    props: {
        out_id: '',
        out_user: ''
    },
    mounted () {
        M.AutoInit();
        this.mduser = localStorage.getItem('moodleName')
        this.id = localStorage.getItem('id')
        if(location.href.indexOf('?mdlogin') != -1) M.toast({html: '<i class=\'material-icons\' style=\'padding-right: 10px;\'> check_circle </i> 你好, ' + this.mduser, classes: 'green rounded'})
        if(location.href.indexOf('?mdlogout') != -1) M.toast({html: '<i class=\'material-icons\' style=\'padding-right: 10px;\'> exit_to_app </i> 成功登出 Moodle', classes: 'cyan rounded'})
        
        $.post('https://api.citrc.tw/wbox/whoami', {'id': this.id}, (response) => {
            // alert(response)
            response = JSON.parse(response)
            if(!response['ok']) localStorage.removeItem('id'), this.id = undefined;
            else this.user = response['data'];
            if(location.href.indexOf('?login') != -1) M.toast({html: '<i class=\'material-icons\' style=\'padding-right: 10px;\'> check_circle </i> Hello, ' + this.user, classes: 'green rounded'})
        })

        // if(location.href.indexOf('?login') != -1) M.toast({html: '<i class=\'material-icons\' style=\'padding-right: 10px;\'> exit_to_app </i> 早安，' + this.user, classes: 'cyan rounded'})
        if(location.href.indexOf('?logout') != -1) M.toast({html: '<i class=\'material-icons\' style=\'padding-right: 10px;\'> exit_to_app </i> HARC 登出成功', classes: 'cyan rounded'})
        if(location.href.indexOf('?exlogout') != -1) this.logout()
        // alert('');
    },
    methods: {
        logout() {
            $.post('//api.citrc.tw/wbox/logout', {'id': this.id}, (response) => {
                // alert(response);
                localStorage.removeItem('id');
                if(localStorage.getItem('error') != undefined) M.toast({html: localStorage.getItem('error'), classes: 'red rounded'})
                else location.href = '?logout'
                localStorage.removeItem('error')
            });
        },
        upload() {
            if(this.user == undefined) {
                M.toast({'html': '<i class=\'material-icons\' style=\'padding-right: 10px\'> block </i> You haven\'t login', 'classes': 'rounded cyan'})
            } else {
                location.href = 'upload.html'
            }
        }
    }
};
</script>


<style>
.flex{
    display:flex;
    align-items:center;
    justify-content:center;
    width:600px;
    height:600px;
    background-color:#eee;
}
</style>