<template>

    <div class="progress" v-if = 'loading' style = 'background-color: #eee;'>
      <div class="indeterminate"></div>
    </div>
    
<div style = 'background-color: #eee;'>
    <div class = 'flex center-align' v-if="moodleID" style = 'height: 100vh; width: 100vw'>
        <div class='card'>
            <h1> 您好 </h1>
            <div class = 'chip lighten-5' :class = 'color'> {{ color }} </div><br>
            <button class = 'btn-large waves-effect' :class = 'color' @pointerenter="p = '登出?'; random_color()" @pointerleave="p = username; random_color()" @click="logout()"> {{ p }} </button>
            <div class='card-content grey-text'>
                {{ moodleID }}
            </div>
            <div id = 'img'>
                <img :src = '`https://api.qrserver.com/v1/create-qr-code/?data=${moodleID}&amp;`' height = '250px' width = '250px' id = 'qr' />
                <div id = 'label' class = '' v-if = '!ok'>
                    <div class="preloader-wrapper big active">
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
                </div>
            </div>

        </div>
    </div>
    <div class="flex center-align" style="height: 100vh; width: 100vw" v-else>
        <div>
            <img src="https://citrc.tw/HARC.png" width="40%" height="40%">
            <h1> HARC Wbox {{ user }}</h1>
        </div>
        <!-- <img height="10%" width="10%" style="border: transparent;"/> -->
        <!-- {{ username }}<br>
    {{ password }} -->
        <!-- <div class="row">
        <div class="col s12 m6"> -->
        <br style = 'display: block'/>
        <div class="card hide-on-small-only" style="display: block">
            <!-- <div class="card-image">
            </div> -->
            <div class = 'card-content'>
                <div class = 'card-title'>
                    <span class="card-title">Welcome{{ username ? ', ' + username : ' to HARC' }}</span>
                    <h6 v-if = 'token' class = 'grey-text lighten-1'> Logging in with token <b> {{ token }} </b> </h6>
                </div>
            </div>
            <div class = 'card-tabs'>
                <ul class = 'tabs tabs-fixed-width'>
                    <li class = 'tab'><a href = '#login' @click = 'token = ""; focus("#username")'>Username / Password</a></li>
                    <li class = 'tab'><a href = '#token' @click = 'username = password = ""; focus("#token_input")'>Token</a></li>
                </ul>
            </div>
            <div class = 'card-content'>
                <div class="card-content" id="login">
                    <div class="input-field">
                        <input id="username" type="text" v-model="username" @keyup.enter="submit">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field">
                        <input id="password" type="password" v-model="password" @keyup.enter="submit">
                        <label for="password">Password</label>
                    </div>
                </div>
                <div class="card-content" id="token">
                    <div class="input-field">
                        <input id="token_input" type="text" v-model="token" @keyup.enter="submit">
                        <label for="username">Token</label>
                    </div>
                </div>
            </div>
            <a class="btn-floating halfway-fab waves-effect waves-light red" @click="submit"><input type='submit'
                    value="" hidden><i class="material-icons">add</i></a>
        </div>
    <!-- </div>
</div> -->
</div>
<br>
<div class = 'row' v-if = '!moodleID'>
    <div class="card hide-on-med-and-up col s12">
    <!-- <div class="card-image">
    </div> -->
        <div class = 'card-content'>
            <div class = 'card-title'>
                <span class="card-title">Welcome{{ username ? ', ' + username : ' to HARC' }}</span>
                <h6 v-if = 'token' class = 'grey-text lighten-1'> Logging in with token <b> {{ token }} </b> </h6>
            </div>
        </div>
        <div class = 'card-tabs'>
            <ul class = 'tabs tabs-fixed-width'>
                <li class = 'tab'><a href = '#login2' @click = 'token = ""; focus("#username")'>Username / Password</a></li>
                <li class = 'tab'><a href = '#token2' @click = 'username = password = ""; focus("#token_input")'>Token</a></li>
            </ul>
        </div>
        <div class = 'card-content'>
            <div class="card-content" id="login2">
                <div class="input-field">
                    <input id="username2" type="text" v-model="username" @keyup.enter="submit">
                    <label for="username">Username</label>
                </div>
                <div class="input-field">
                    <input id="password2" type="password" v-model="password" @keyup.enter="submit">
                    <label for="password">Password</label>
                </div>
            </div>
            <div class="card-content" id="token2">
                <div class="input-field">
                    <input id="token_input2" type="text" v-model="token" @keyup.enter="submit">
                    <label for="username">Token</label>
                </div>
            </div>
        </div>
        <a class="btn-floating halfway-fab waves-effect waves-light red" @click="submit"><input type='submit'
                value="" hidden><i class="material-icons">add</i></a>
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
    name: 'App',
    data() {
        return {
            username: '',
            password: '',
            moodleID: '',
            p: '',
            loading: false,
            color: 'orange',
            token: '',
            ok: false
        };
    },
    mounted () {
        M.AutoInit();
        if(localStorage.getItem('moodleName') != undefined) this.p = this.username = localStorage.getItem('moodleName')
        let as = new URLSearchParams(window.location.search);
        if(as.has('expired')) M.toast({html: 'Session expired', classes: 'red rounded'})
        if(as.has('logout')) M.toast({html: 'bye', classes: 'blue rounded'})
        if(as.has('exlogout')) this.logout(), M.toast({html: 'bye', classes: 'blue rounded'})
        $('#username')[0].focus();
        this.moodleID = localStorage.getItem('moodleID')

        var pre = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'black']
        this.color = pre[Math.floor(Math.random() * pre.length)]
        window.onload = () => {
            while(!document.getElementById('qr').complete) this.ok = false;
            this.ok = true;
        }
    },
    methods: {
        random_color() {
            var pre = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'black']
            this.color = pre[Math.floor(Math.random() * pre.length)]
        },
        submit() {
            this.loading = true
            // alert(this.username);
            if(this.username != '') $.post('https://api.citrc.tw/moodlapi/login',{
                username: this.username,
                password: this.password
            }, (response) => {
                // alert(response);
                response = JSON.parse(response);
                if(response['ok']) {
                    this.moodleID = response['data']
                    localStorage.setItem('moodleID', response['data']['session'])
                    localStorage.setItem('moodleName', response['data']['username'])
                    localStorage.setItem('username', response['data']['username'])
                    M.toast({html: response['data'], classes: 'green rounded'})
                    location.href = '/moodlapi.html?mdlogin'
                } else M.toast({html: response['error'], classes: 'red rounded'});
                this.loading = false
            })
            else if(this.token != '') $.post('https://api.citrc.tw/moodlapi/whoami',{
                session: this.token
            }, (response) => {
                // alert(response);
                response = JSON.parse(response);
                if(response['ok']) {
                    this.moodleID = response['data']
                    localStorage.setItem('moodleID', response['data']['session'])
                    localStorage.setItem('moodleName', response['data']['username'])
                    localStorage.setItem('username', response['data']['username'])
                    M.toast({html: response['data'], classes: 'green rounded'})
                    location.href = '/moodlapi.html?mdlogin'
                } else M.toast({html: response['error'], classes: 'red rounded'});
                this.loading = false
            })
        },
        focus(x) {
            setTimeout(() => {$(x)[0].focus()}, 100);
        },
        logout() {
            localStorage.removeItem('moodleID')
            localStorage.removeItem('moodleName')
            localStorage.removeItem('extended')
            location.href = ('/moodlapi_login.html?mdlogout')
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
#img {
    display: grid;
    place-content: center;
    /* align-items: center;
    justify-content: center; */
    position: relative;
    width: 250px;
    height: 250px;
}
#qr {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
}
#label {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    color: cyan;
    /* background-color: red; */
    z-index: 10;
}
</style>