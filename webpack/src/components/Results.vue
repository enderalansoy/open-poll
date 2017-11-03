<template>
  <b-container fluid>
    <h4>Sonuçlar</h4>
    <b-table striped hover :items="teams" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" ></b-table>
    <b-button variant="primary" @click="goBack()" size="lg">Geri Dön</b-button>
    <br /><br /><br />
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Results',
  data() {
    return {
      sortBy: 'total_points',
      sortDesc: true,
      fields: [
        { key: 'project_name', label: 'Ekip', sortable: true },
        { key: 'total_points', label: 'Toplam Puan', sortable: true },
        { key: 'vote_count', label: 'Oy Sayısı', sortable: false },
      ],
      teams: [],
    };
  },
  created() {
    axios.get('/team/api')
    .then((r1) => {
      r1.data.forEach((team) => {
        this.teams.push(team);
      });
    })
    .catch((err) => {
      this.errors.push(err);
    });
  },
  methods: {
    goBack() {
      this.$router.push('Index');
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
