<template>
  <div>
    <v-select v-model="selectedTeam" :options="teams.map(team => team.project_name)"></v-select>
    <p>{{teams}}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      teams: [],
      selectedTeam: '',
    };
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
