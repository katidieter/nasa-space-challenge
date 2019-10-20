<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'app',
  async created() {
    // axios
    //   .get("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events")
    //   .then(response => {
    //     // eslint-disable-next-line
    //     this.volunteers = response.data.events[0];
    //   });

    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:4000/graphql',
    //   data: {
    //     query: `
    //       {
    //         volunteers {
    //           id
    //           name
    //         }
    //       }
    //     `,
    //   },
    // }).then((response) => {
    //   console.log('response:', response.data.data);
    // });
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
