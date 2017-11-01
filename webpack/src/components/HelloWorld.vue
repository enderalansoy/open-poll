<template>
  <b-container>
    <v-select label="Team:" placeholder="Select team..." v-model="selectedTeam" :options="teams.map(team => team.project_name)"></v-select>
    <br />
    <ul v-if="selectedTeam"><li>Selected team: {{selectedTeam}}</li></ul>
      <ul v-for="i in 5" :key='i'>
        <li>Criteria {{i}}:</li>
        <li>
        <b-form-radio-group :id="'selection-' + i" buttons button-variant="primary"
        size="lg" v-model="selected[i]" :options="options" name="radioBtnOutline" />
        </li>
        <li>{{selected[i]}}</li>
      </ul>
      <b-button size="lg">Clear</b-button>
      <b-button size="lg" variant="success" @click="onSubmit()">Submit</b-button>
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      teams: [],
      selectedTeam: '',
      selected: [],
      options: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
      ],
    };
  },
  computed: {
    btnStates() {
      return this.buttons.map(btn => btn.state);
    },
  },
  created() {
    this.getTeams();
  },
  methods: {
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
