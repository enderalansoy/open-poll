<template>
  <b-container fluid>
    <h4>Results will be here.</h4>
    <b-button @click="goBack()" size="lg">Geri Dön</b-button>
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Results',
  data() {
    return {
    };
  },
  created() {
    axios.get('/team')
    .then((r1) => {
      console.log(r1.data[0].total_points);
      console.log(r1.data[1].total_points);
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
