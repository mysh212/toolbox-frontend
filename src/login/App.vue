<template>

<div class="flex center-align" style="height: 100vh; width: 100vw">
    <div>
        <img src="https://citrc.tw/HARC.png" width="40%" height="40%">
        <h1> HARC Wbox {{ user }}</h1>
    </div>
    <!-- <img height="10%" width="10%" style="border: transparent;"/> -->
    <!-- {{ username }}<br>
    {{ password }} -->
    <!-- <div class="row">
        <div class="col s12 m6"> -->
            <div class="card" style="padding: 0%; width: 30%; height: 40%; padding-top: 5%; padding-bottom: 5%">
                <div class="card-image">
                </div>
                <div class="card-content" style="width: 100%">
                    <span class="card-title">Welcome{{ username ? ', ' + username : ' to HARC' }}</span><br>
                    <div class="input-field">
                        <input id="username" type="text" v-model="username" @keyup.enter="submit">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field">
                        <input id="password" type="password" v-model="password" @keyup.enter="submit">
                        <label for="password">Password</label>
                    </div>
                    <a class="btn-floating halfway-fab waves-effect waves-light red" @click="submit"><input type='submit' value="" hidden><i class="material-icons">add</i></a>
                </div>
            </div>
        <!-- </div>
    </div> -->
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
            password: ''
        };
    },
    mounted () {
        M.AutoInit();
        $('#username')[0].focus();
    },
    methods: {
        submit() {
            // alert(this.username);
            $.post('https://api.citrc.tw/wbox/login',{
                username: this.username,
                password: this.password
            }, (response) => {
                // alert(response);
                response = JSON.parse(response);
                if(response['ok']) {
                    localStorage.setItem('id', response['id']);
                    location.href='/?login';
                    this.username = this.password = 'ouob'
                } else M.toast({html: '登入失敗', classes: 'red rounded'});
            })
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