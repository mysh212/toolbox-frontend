<template>

Hello, {{ user }}<br>
You're going to upload a new problem.

<div class="row container">
    <h3> New Problem </h3>
    <div class="input-field col s1">
        <input type="text" :value='user' id="username" class="validate" disabled/>
        <label for="username" class="active"> Author </label>
    </div>
    <div class="input-field col s2">
        <input type="text" v-model="name"/>
        <label for="name"> Problem Name </label>
    </div>
    <div class="input-field col s3">
        <input type="text" v-model='url'/>
        <label for="name"> URL </label>
    </div>
    <div class="col s6 chips" id="tags">
        <!-- <label for="tags"> Tags </label> -->
    </div>
    <div class="input-field col s12">
        <input type="text" v-model='details'/>
        <label for="name"> Details <b v-if='details'> : {{ details }} </b> </label>
    </div>
    <button class="btn-large center-align waves-effect" @click="submit"> Submit <i class='material-icons'> send </i></button>
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
            id: null,
            user: null,
            name: '',
            url: '',
            details: ''
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
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.chips');
            var option = {
                autocompleteOptions: {
                data: {
                    'Apple': null,
                    'Microsoft': null,
                    'Google': null
                },
                limit: Infinity,
                minLength: 1
                },
                placeholder: 'Enter a tag',
                secondaryPlaceholder: '+Tag',
            }
            var instances = M.Chips.init(elems, option);
        });
        // console.log($('.chips')[0].chips());
        // alert(1);
    },
    methods: {
        submit() {
            // alert(this.details);
            M.toast({html: 'submitted'});
            var f = [];
            M.Chips.getInstance($('.chips')[0]).chipsData.forEach((i) => {f.push(i['tag'])});
            $.post('https://api.citrc.tw/ps/upload_problem', {
                id: this.id,
                name: this.name,
                url: this.url,
                tag: JSON.stringify(f),
                content: this.details
            }, (response) => {
                response = JSON.parse(response);
                M.toast(response);
            });
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