<template>
  <div id="disaster-map">
    <h1>AQUI VAI VIM O MAPA</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DisasterMap',
  created() {
    axios
      .get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/8?status=open')
      .then((response) => {
        console.log(response.data.events);
      });
  },
};
</script>

<style scoped>

</style>
