<template>
  <v-app>
    <v-main>
      <Server/>
    </v-main>
  </v-app>
</template>

<script>
import Server from './components/Server';

export default {
  name: 'App',

  components: {
    Server,
  },

  data: () => ({
    //
  }),
};
</script>
