<template>
  <div class="multichart">
    <div>В данном модуле можно получать графики курсов валют</div>
    <div>
      Пожалуйста не меняйте интервал при сравнении разных типов валют - это
      может привести к ошибкам
    </div>
    <div>
      Сначала настройте тип валюты и интервал для начала работы и загрузите
      данные с Get first
    </div>
    <div>
      Для добавления графиков измените тип валюты в полк TO и загрузите еще с
      get more
    </div>

    <!-- <v-btn @click="updateApex">apex update</v-btn> -->

    <v-btn @click="getFirst">get first</v-btn>
    <v-btn @click="getMore">get more</v-btn>

    <v-flex row class="mt-1">
      <v-col cols="3">
        <v-autocomplete
          v-model="selectBase"
          :hint="`${selectBase.abbr}`"
          :items="base"
          item-text="state"
          item-value="abbr"
          label="Base"
          return-object
          v-on:change="onChangeBaseCurrency"
        ></v-autocomplete>
      </v-col>

      <v-col cols="3">
        <v-autocomplete
          v-model="selectSymbols"
          :hint="`${selectSymbols.abbr}`"
          :items="base"
          item-text="state"
          item-value="abbr"
          label="To"
          return-object
          v-on:change="onChangeToCurrency"
        ></v-autocomplete>
      </v-col>

      <v-col cols="3" md="3">
        <v-menu
          v-model="menuStart"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateStart"
              label="Pick start date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateStart"
            @input="menu2 = false"
            v-on:change="onChangeTimeStart"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="3" md="3">
        <v-menu
          v-model="menuEnd"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateEnd"
              label="Pick end date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateEnd"
            @input="menu2 = false"
            v-on:change="onChangeTimeEnd"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-flex>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ApexMenu",
  data() {
    return {
      menuStart: false,
      dateStart: "",
      menuEnd: false,
      dateEnd: "",
      ...mapActions({
        getAllSymbols: "multiChartModule/getAllSymbols",
        getTimeSeries: "multiChartModule/getTimeseriesSymbolsAction",
        getMoreTimeSeries: "multiChartModule/getTimeseriesMore",
      }),
      selectBase: { state: "", abbr: "" },
      base: [],
      selectSymbols: { state: "", abbr: "" },
    };
  },
  computed: {
    ...mapGetters({
      all_symbols: "multiChartModule/allSymbols",
    }),
    baseItems: {
      get: function () {
        return this.base;
      },
    },
  },
  async mounted() {
    console.log("MultiChartBase is mounted");
    await this.getAllSymbols();
    console.log("symbols is pulled");
    this.setBaseCurrencySelect();
  },
  methods: {
    updateApex() {
      //this.$store.commit("multiChartModule/updateApex");
      // this.$refs.radar.updateSeries([
      //   {
      //     name: "Series 1",
      //     data: [1, 2, 3, 4], //ie [1,2,3,4]
      //   },
      // ]);

      // this.$refs.radar.updateOptions({
      //   xaxis: {
      //     categories: ["a", "b", "c", "d"], //ie ["a","b","c","d"]
      //   },
      // });
    },
    onChangeBaseCurrency(e) {
      console.log("selector", e.state);
      console.log("abbr", e.abbr);
      this.$store.commit("multiChartModule/setBase", e.abbr);
    },
    onChangeToCurrency(e) {
      // console.log("state", e.state);
      console.log("abbr", e.abbr);
      this.$store.commit("multiChartModule/setSymbols", e.abbr);
    },
    onChangeTimeStart(e) {
      console.log(e);
      this.$store.commit("multiChartModule/setStart", e);
    },
    onChangeTimeEnd(e) {
      console.log(e);
      this.$store.commit("multiChartModule/setEnd", e);
    },
    setBaseCurrencySelect() {
      let test = this.all_symbols;
      //console.log("symbs", test);
      let all = Object.entries(this.all_symbols);
      all.map((el) => {
        // console.log(el);
        let localObj = {
          state: el[1] + " " + el[0],
          abbr: el[0],
        };
        this.base.push(localObj);
      });
    },
    getFirst() {
      console.log("puk");
      this.getTimeSeries();
    },
    getMore() {
      console.log("puk 2");
      this.getMoreTimeSeries();
    },
  },
};
</script>

<style>
</style>