<template>
  <b-container fluid>
    <v-select label="Team:" @change="changeHandler()" placeholder="Select team..." v-model="selectedTeam" :options="teams.map(team => team.project_name)"></v-select>
    <br />
    <ul v-if="selectedTeam"><h4>Selected team: {{selectedTeam}}</h4></ul>
      <ul v-for="i in criterias.length - 1" :key='i'>
        <li><h4>{{criterias[i]}}</h4></li><br />
        <li>
          <b-form-radio-group :id="'selection-' + i" buttons button-variant="primary"
          size="lg" v-model="selected[i]" :options="options" name="radioBtnOutline" />
        </li>
        <li>{{selected[i]}}</li>
      </ul>
      <br />
      <h4>Verilen toplam puan: {{ selected.reduce((a, b) => { return a + b; }, 0) }} / 40</h4>
      <br />
      <b-button size="lg" variant="success" @click="onSubmit()" :disabled="isSubmitDisabled">{{submitLabel}}</b-button>
      <br /><br />
      <b-button size="lg">Sonuçlar</b-button>
      <b-button size="lg" @click="onLogout()">Çıkış</b-button>
      <br /><br />
      <p>Logged in as: {{voterIdFromCookie}}</p>
  </b-container>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'Index',
  data() {
    return {
      teams: [],
      isAlreadyVoted: true,
      selectedTeam: '',
      selectedTeamId: '',
      selected: [],
      voterIdFromCookie: '',
      options: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
      ],
      criterias: [
        '',
        'Uygulamanın müşteriye sağladığı fayda/kullanılabilirliğini değerlendiriniz:',
        'Uygulamayı, Yenilikçilik/Özgünlük bakımından değerlendiriniz:',
        'Çalışmanın sürdürülebilirliğini değerlendiriniz:',
        'Çalışmanın uygulanabilirliğini değerlendiriniz:',
        'Uygulamayı, tasarımının yalınlığı bakımından değerlendiriniz:',
        'Uygulamayı, mevcut kaynakları verimli kullanması bakımından değerlendiriniz:',
        'Ekibi, sunum başarısı bakımından değerlendiriniz:',
        'Bonus puan:',
      ],
      submitLabel: 'Gönder',
    };
  },
  computed: {
    btnStates() {
      return this.buttons.map(btn => btn.state);
    },
    isSubmitDisabled() {
      if (
      typeof this.selectedTeam === 'undefined' ||
      typeof this.selected[1] === 'undefined' ||
      typeof this.selected[2] === 'undefined' ||
      typeof this.selected[3] === 'undefined' ||
      typeof this.selected[4] === 'undefined' ||
      typeof this.selected[5] === 'undefined' ||
      typeof this.selected[6] === 'undefined' ||
      typeof this.selected[7] === 'undefined' ||
      typeof this.selected[8] === 'undefined' ||
      this.isAlreadyVoted) {
        return true;
      }
      return false;
    },
  },
  watch: {
    selectedTeam: {
      handler() {
        axios.get(`/team?project_name=${this.selectedTeam}`)
        .then((response) => {
          axios.get(`/voter/hasvoted?voter=${this.voterIdFromCookie}&team=${response.data[0].id}`)
          .then((res) => {
            if (res.data.status) {
              console.log('Has already voted for this team.');
              this.submitLabel = 'Bu takımı oyladınız!';
              this.isAlreadyVoted = true;
              this.selected = [];
            } else {
              console.log('Has not voted for this team.');
              this.isAlreadyVoted = false;
              this.submitLabel = 'Gönder';
              this.selected = [];
            }
          });
        });
      },
    },
  },
  created() {
    this.voterIdFromCookie = Cookies.get('secretCookie');
    this.checkId();
    this.getTeams();
    console.log('created');
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
    getTeamId(name) {
      axios.get(`/team?project_name=${name}`)
      .then((response) => {
        console.log(`hi: ${response.data[0].id}`);
        this.selectedTeamId = response.data[0].id;
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
          criteria8: this.selected[8],
        })
        .then((response) => {
          console.log(response);
          this.selected = [];
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
