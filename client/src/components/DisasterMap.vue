<template>
  <div id="disaster-map">
    <div class="disaster-map__title">
      OCORRÊNCIAS PERTO DE VOCÊ
    </div>
    <SearchAddress/>
    <GmapMap
      :center="currentLocation"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 100vh"
    >
      <GmapMarker
        :key="index"
        v-for="(disasterPoint, index) in disastersPoints"
        :position="disasterPoint"
        :clickable="true"
        :draggable="true"
        @click="center=disasterPoint"
      />

      <GmapPolygon :paths="disastersPaths"/>
    </GmapMap>
  </div>
</template>

<script>
import axios from 'axios';
import SearchAddress from './SearchAddress.vue';

const CATEGORIES = [
  { id: 9, name: 'Floods' },
  // { id: 10, name: 'Severe Storms' },
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
    SearchAddress,
  },
  async created() {
    await Promise.all(
      CATEGORIES.map(category => this.fetchDisasterByCategoryId(category.id)),
    );
  },
  computed: {
    currentLocation() {
      return { lat: -30.0277, lng: -51.2287 };
    },
    disastersPoints() {
      const pointMakers = [];
      if (this.loading) return pointMakers;
      this.disasters.forEach((disaster) => {
        const { geometries } = disaster;
        geometries.forEach((geometry) => {
          if (geometry.type === 'Point') {
            pointMakers.push({ lat: geometry.coordinates[1], lng: geometry.coordinates[0] });
          }
        });
      });
      return pointMakers;
    },
    disastersPaths() {
      const polygonsPaths = [];
      if (this.loading) return polygonsPaths;
      this.disasters.forEach((disaster) => {
        const { geometries } = disaster;
        const paths = [];
        geometries.forEach((geometry) => {
          if (geometry.type === 'Polygon') {
            geometry.coordinates.forEach((coordinateGroup) => {
              coordinateGroup.forEach((coordinate) => {
                paths.push({ lat: coordinate[1], lng: coordinate[0] });
              });
            });
          }
        });
        if (paths.length > 0) {
          polygonsPaths.push(paths);
        }
      });
      return polygonsPaths;
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
.disaster-map__title {
  text-align: left;
  font-weight: 600;
  font-size: 22px;
}
</style>
