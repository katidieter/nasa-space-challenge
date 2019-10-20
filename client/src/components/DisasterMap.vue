<template>
  <div id="disaster-map">
    <h3>OCORRÊNCIAS PERTO DE VOCÊ</h3>
    <SearchAddressCoord/>
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
  </div>
</template>

<script>
import axios from 'axios';
import SearchAddressCoord from './SearchAddressCoord.vue';

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
  components: {
    SearchAddressCoord,
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
      if (this.loading) return [this.currentLocation];
      const disasters = [];
      this.disasters.forEach((disaster) => {
        const { geometries } = disaster;
        geometries.forEach((geometry) => {
          if (geometry.type === 'Point') {
            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(geometry.coordinates[1]) && !isNaN(geometry.coordinates[0])) {
              disasters.push({ lat: geometry.coordinates[1], lng: geometry.coordinates[0] });
            }
          }
        });
      });
      return disasters;
    },
    paths() {
      const disasters = [];
      this.disasters.forEach((disaster) => {
        const { geometries } = disaster;
        const paths = [];
        geometries.forEach((geometry) => {
          if (geometry.type === 'Polygon') {
            geometry.coordinates.forEach((coord) => {
              const path = [];
              coord.forEach((coordb) => {
                const a = { lat: coordb[1], lng: coordb[0] };
                path.push(a);
              });
              paths.push(path);
            });
          }
        });
        if (paths.length > 0) {
          disasters.push(paths);
        }
      });
      return disasters;
    },
  },
  methods: {
    fetchDisasterByCategoryId(id) {
      return axios
        .get(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/${id}?status=open`)
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
