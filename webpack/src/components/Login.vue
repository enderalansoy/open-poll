<template>
  <b-container>
    <b-alert variant="danger"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
    Girdiğiniz kullanıcı adı yanlış!
    </b-alert>
    <b-form-input id="input-large" size="lg" v-model="username" type="text" 
    placeholder="Kullanıcı adı"></b-form-input>
    <br />
    <b-button variant="primary" @click="loginAction()" size="lg">Giriş</b-button>
  </b-container>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      voterData: '',
      secret: '',
      showDismissibleAlert: false,
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
      axios.get(`/voter?username=${this.username}`)
        .then((r1) => {
          this.secret = r1.data[0].id;
          axios.get(`/voter/isvoter?id=${r1.data[0].id}`)
          .then((r2) => {
            if (!r2.data.status) {
              this.showDismissibleAlert = true;
              return;
            }
            Cookies.set('secretCookie', r1.data[0].id, { expires: 7 });
            this.$router.push('Home');
          })
          .catch((err) => {
            this.showDismissibleAlert = true;
            console.log(err);
          });
        })
        .catch((err) => {
          this.showDismissibleAlert = true;
          console.log(err);
          this.$router.push('Login');
        });
    },
  },
};

</script>

