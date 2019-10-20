<template>
  <div id="map">
    <input name="address" type="test" v-model="address" />
    {{ coordinate.lat }}{{ coordinate.lng }}
    <button v-on:click="getCoordinates">find</button>
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
</style>
