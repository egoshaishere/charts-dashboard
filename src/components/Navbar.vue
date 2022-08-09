<template>
  <div>
    <v-app-bar app elevate-on-scroll>
      <v-icon class="grey--text" v-on:click="navOpenCloseHandler">
        mdi-menu
      </v-icon>

      <v-toolbar-title class="text-uppercase grey--text toolbar__title">
        <span class="font-weight-light">Egosha</span>
        <span>IsHere</span>
      </v-toolbar-title>

      <v-spacer />

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon> mdi-login </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="isOpen" app class="primary">
      <v-layout class="mt-16" column align-center>
        <v-flex>
          <v-avatar size="100">
            <img src="/cat.png" alt="" />
          </v-avatar>
          <div style="text-align: center" class="white--text subheading mt-1">
            eg0sha
          </div>
        </v-flex>

        <v-flex class="mt-4 mb-3" column align-center>
          <Popup />
        </v-flex>
      </v-layout>

      <v-list class="mt-5">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import Popup from "./Popup.vue";

export default {
  name: "Navbar",
  components: {
    Popup,
  },
  data() {
    return {
      isOpen: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "currency_exchange", text: "Exchange", route: "/exchange" },
        { icon: "analytics", text: "Charts", route: "/charts" },
        {
          icon: "ssid_chart",
          text: "MultiChart Chart.js",
          route: "/multicharts",
        },
        { icon: "emoji_symbols", text: "Sandbox", route: "/sandbox" },
        {
          icon: "area_chart",
          text: "Apex MultiCharts",
          route: "/apexmulticharts",
        },
      ],
    };
  },
  methods: {
    navOpenCloseHandler() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
.toolbar__title {
  margin-left: 50px;
}

/* .navbar__container{
  margin-top: 30px;
} */
</style>