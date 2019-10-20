<template>
  <div id="disaster-map">
    <h1>AQUI VAI VIM O MAPA</h1>
    <GmapMap
      :center="currentLocation"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(marker, index) in markers"
        :position="marker"
        :clickable="true"
        :draggable="true"
        @click="center=marker"
      />
    </GmapMap>
    {{markers[0]}}
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
  async created() {
    await Promise.all(
      CATEGORIES.map(category => this.fetchDisasterByCategoryId(category.id)),
    );
    // console.log(this.disasters);
  },
  computed: {
    currentLocation() {
      return { lat: -30.0277, lng: -51.2287 };
    },
    markers() {
      if (this.loading) return { lat: 75.498046875, lng: 12.945675729694095 };
      return this.disasters.map((disaster) => {
        const { coordinates } = disaster.geometries[0];
        // eslint-disable-next-line
        const latitude = isNaN(coordinates[0]) ? coordinates[0][0][0] : coordinates[0];
        // eslint-disable-next-line
        const longitude = isNaN(coordinates[0]) ? coordinates[0][0][1] : coordinates[1];
        return {
          lat: latitude,
          lng: longitude,
        };
      });
    },
  },
  methods: {
    fetchDisasterByCategoryId(id) {
      return axios
        .get(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/${id}?status=closed`)
        .then((response) => {
          this.disasters.push(...response.data.events);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
