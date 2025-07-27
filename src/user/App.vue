<template>

<div class="container">
    <h3> Change password for {{ user }} </h3>
    <div class="input-field">
        <input id='old' type="password" @keyup.enter="submit" v-model="old" class="orange-text"/>
        <label for="old"> Old password </label>
    </div>
    <div class="input-field">
        <input id='new' type="password" @keyup.enter="submit" v-model="np" :class='np == retype ? "green-text" : "red-text"'/>
        <label for="new"> New password </label>
    </div>
    <div class="input-field">
        <input id='retype' type="password" @keyup.enter="submit" v-model="retype" :class='np == retype ? "green-text" : "red-text"'/>
        <label for="retype"> Retype new password </label>
    </div>

    <button class="waves-effect red rounded btn-large" @click="submit"><i class='material-icons'>arrow_forward</i> Change password</button>
</div>

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
            id: null,
            user: null,
            old: '',
            np: '',
            retype: ''
        };
    },
    mounted () {
        M.AutoInit();
        this.id = localStorage.getItem('id')
        if(this.id != undefined) {
            $.post('//api.citrc.tw/wbox/whoami', {'id': this.id}, (response) => {
                response = JSON.parse(response);
                if(!response['ok']) this.id = undefined, localStorage.removeItem('id'), location.href = '/';
                else this.user = response['data'];
            })
        }
    },
    methods: {
        submit() {
            if(this.np == '' || this.old == '' || this.retype == '') {
                M.toast({'html': 'Field empty', 'classes': 'red rounded'});
                return;
            }
            if(this.np != this.retype) return M.toast({'html': 'Passwords doesn\'t match', 'classes': 'red rounded'})
            M.toast({'html': 'Changing password...', 'classes': 'orange rounded'});
            $.post('https://api.citrc.tw/wbox/chgpswd', {
                'password': this.old,
                'npswd': this.np,
                'username': this.user,
                'id': this.id
            }, (response) => {
                // alert(response);
                response = JSON.parse(response);
                if(!response['ok']) M.toast({'html': response['error'], 'classes': 'rounded red'})
                else M.toast({'html': 'Password Changed.', 'classes': 'green rounded'}), this.old = this.np = this.retype = ''
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