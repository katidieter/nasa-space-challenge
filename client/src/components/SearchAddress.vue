<template>
  <div id="search-address">
    <input name="address" type="text" v-model="address" />
    {{ coordinate.lat }}{{ coordinate.lng }}
    <button v-on:click="getCoordinates">Ir para</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FindAddress',
  data() {
    return {
      address: '',
      coordinate: '',
    };
  },
  methods: {
    getCoordinates() {
      const api = 'AIzaSyBxBoZpytJVnJQKAzRQgKiV-KGUh_B9BZk';
      return axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(this.address)}&key=${api}`,
        )
        .then((response) => {
          this.coordinate = response.data.results[0].geometry.location;
        });
    },
  },
};
</script>

<style scoped>
#search-address {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0;
}
input {
  font-size: 20px;
}

button {
  font-size: 20px;
}
</style>
