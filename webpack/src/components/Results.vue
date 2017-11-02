<template>
  <b-container fluid>
  </b-container>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'Index',
  data() {
    return {
    };
  },
  computed: {
    btnStates() {
      return this.buttons.map(btn => btn.state);
    },
  },
  created() {
    this.voterIdFromCookie = Cookies.get('secretCookie');
    this.checkId();
    this.getTeams();
  },
  methods: {
    checkId() {
      axios.get(`/voter/isvoter?id=${this.voterIdFromCookie}`)
        .then((r1) => {
          if (r1.data.status !== true) {
            this.$router.push('Login');
            console.log('not found2');
            console.log(Cookies.get('secretCookie'));
          }
        })
        .catch((err) => {
          this.errors.push(err);
          this.$router.push('Login');
        });
    },
    onLogout() {
      Cookies.remove('secretCookie');
      this.$router.push('Login');
    },
    getTeams() {
      axios.get('/team')
      .then((response) => {
        this.teams = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    onSubmit() {
      axios.get(`/team?project_name=${this.selectedTeam}`)
      .then((r1) => {
        axios.post('/vote/new', {
          team: r1.data[0].id,
          voter: this.voterIdFromCookie,
          criteria1: this.selected[1],
          criteria2: this.selected[2],
          criteria3: this.selected[3],
          criteria4: this.selected[4],
          criteria5: this.selected[5],
          criteria6: this.selected[6],
          criteria7: this.selected[7],
        })
        .then((response) => {
          console.log(response);
          alert('Oylama gerçekleştirildi.');
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
