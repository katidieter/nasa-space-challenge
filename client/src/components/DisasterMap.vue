<template>
  <div id="disaster-map">
    <h1>AQUI VAI VIM O MAPA</h1>
    <h2>{{disasters[0].categories[0].title}}</h2>
  </div>
</template>

<script>
import axios from 'axios';

const CATEGORIES = [
  { id: 9, name: 'Floods' },
  { id: 10, name: 'Severe Storms' },
  { id: 14, name: 'Landslides' },
];

export default {
  name: 'DisasterMap',
  data() {
    return {
      disasters: [],
      loading: true,
    };
  },
  created() {
    Promise.all(
      CATEGORIES.map(category => this.fetchDisasterByCategoryId(category.id)),
    ).then(() => console.log(this.disasters));
  },
  methods: {
    fetchDisasterByCategoryId(id) {
      return axios
        .get(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/${id}?status=closed`)
        .then((response) => {
          this.disasters.push(...response.data.events);
        });
    },
  },
};
</script>

<style scoped>

</style>
