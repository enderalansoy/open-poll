<template>
  <b-container>
    <b-form-input id="input-large" size="lg" v-model="secret" type="text" 
    placeholder="Enter your secret here..."></b-form-input>
    <br />
    <b-button @click="loginAction()" size="lg">Enter</b-button>
    {{resp}}
  </b-container>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  data() {
    return {
      secret: '',
      voterData: '',
    };
  },
  created() {
    this.checkId();
  },
  methods: {
    checkId() {
      axios.get(`/voter/isvoter?id=${Cookies.get('secretCookie')}`)
        .then((r1) => {
          if (r1.data.status === true) {
            this.$router.push('Home');
          }
        })
        .catch((err) => {
          this.errors.push(err);
          this.$router.push('Login');
        });
    },
    loginAction() {
      axios.get(`/voter/isvoter?id=${this.secret}`)
        .then((r1) => {
          if (!r1.data.status) {
            alert('username is not correct');
            return;
          }
          Cookies.set('secretCookie', this.secret, { expires: 7 });
          this.$router.push('Home');
        })
        .catch((err) => {
          this.errors.push(err);
        });
    },
  },
};

</script>

