import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// 40 % осталось 05,08
const API_KEY = 'jDayz1ZsFklm09ANyUygRMme63Qne8Yl'
const SECOND_API_KEY = "nA86ZXAOOPaCClF50VFDrUcVALuY70cO"
const THIRD_API_KEY = "pIpF9E4r4VAOCfxsc0wscoFnubZiKgHK"
const SYMBOLS = "RUB"
const BASE = "USD"
const START_DATE = "2022-02-20"
const END_DATE = "2022-03-30"
// https://apilayer.com/marketplace/exchangerates_data-api#details-tab
//https://apilayer.com/marketplace/exchangerates_data-api#documentation-tab
var myHeaders = new Headers();
myHeaders.append("apikey", THIRD_API_KEY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

async function getLatest() {
  let latest = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${SYMBOLS}&base=${BASE}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      //console.log(result)
      return result
    })
    .catch(error => console.log('error', error))
  return latest
}

async function getTimeseries() {
  const timeseries = await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${START_DATE}&end_date=${END_DATE}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      return JSON.stringify(result)
    })
    .catch(error => console.log('error', error));
  return timeseries
}

async function getTimeseriesSymbols() {
  let timeseriesSymbols = ''
  await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?symbols=${SYMBOLS}&base=${BASE}&start_date=${START_DATE}&end_date=${END_DATE}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      //console.log(result)
      timeseriesSymbols = JSON.parse(result)
    })
    .catch(error => console.log('error', error));
  return timeseriesSymbols
}

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  return await response.json();
}


const multiChartModule = {
  namespaced: true,
  state: {
    //отладочная переменная для ответа
    responseJSON: "",
    rates: "",

    timeseriesSymbolsResponse: "",
    timeseriesSymbolsRates: "",
    values: [],
    marks: [],

    all_symbols: '',
    symbols: '',
    base: '',
    start: '',
    end: '',
    chartData: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ],
      datasets: [
        {
          label: `Курс  к `,
          backgroundColor: "#f87979",
          data: [30, 30, 30, 30, 30, 30, 50],
        },
        // {
        //   label: "еще 1 датасет",
        //   backgroundColor: "#f87979",
        //   data: [50, 50, 50, 50, 50, 50, 50],
        // },
      ],
    },
    apexChartData: {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chartOptions: {
        chart: {
          height: 600,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    }
  },
  mutations: {
    updateApex(state) {

      this.$refs.radar.updateSeries([
        {
          name: "Series 1",
          data: [1, 2, 3, 4], //ie [1,2,3,4]
        },
      ]);

      this.$refs.radar.updateOptions({
        xaxis: {
          categories: ["a", "b", "c", "d"], //ie ["a","b","c","d"]
        },
      });
      // state.apexChartData.chartOptions.xaxis.categories = ["a", 'b', 'c']
      // let newData = [{
      //   name: 'zaza',
      //   data:  [100, 410, 350],
      // }]
      // state.apexChartData.series = newData


    },
    gotData(state, payload) {
      console.log('mutation - gotData')
      console.log("payload", payload)
      state.responseJSON = payload
    },
    gotTimeseriesMore(state, payload) {
      console.log('mutation - gotTimeseriesMore')
      console.log("payload", payload)
      //отладочная запись
      state.responseJSON = payload

      //норм запись данных из апи
      state.timeseriesSymbolsResponse = payload
      state.timeseriesSymbolsRates = payload.rates

      //для построения графика условные обозначения на осях
      state.marks = Object.keys(payload.rates)
      state.chartData.labels = Object.keys(payload.rates)

      let loco = Object.entries(payload.rates)
      let resultArr = []
      loco.map(el => {
        let roco = new Array(el[1])
        roco.map(subEl => {
          let coco = Object.values(subEl)[0]
          resultArr.push(coco)
        })
      })
      state.values = resultArr

      let locoObj = {
        label: `Курс ${state.base} к  ${state.symbols}`,
        backgroundColor: '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
        data: resultArr
      }
      state.chartData.datasets.push(locoObj)



      //for apex
      let locoApexObj = {
        name: `Курс ${state.base} к  ${state.symbols}`,
        data: resultArr
      }
      state.apexChartData.series.push(locoApexObj)
      state.apexChartData.chartOptions.xaxis.categories = Object.keys(payload.rates)

    },
    gotTimeseriesSymbols(state, payload) {
      console.log('mutation - gotTimeseriesSymbols')
      console.log("payload", payload)
      //отладочная запись
      state.responseJSON = payload

      //норм запись данных из апи
      state.timeseriesSymbolsResponse = payload
      state.timeseriesSymbolsRates = payload.rates

      //для построения графика обозначения на оси
      let newMarks = Object.keys(payload.rates)
      state.marks = newMarks
      state.chartData.labels = newMarks

      let loco = Object.entries(payload.rates)
      let resultArr = []
      loco.map(el => {
        let roco = new Array(el[1])
        roco.map(subEl => {
          let coco = Object.values(subEl)[0]
          resultArr.push(coco)
        })
      })
      state.values = resultArr

      //insert data into chart js
      state.chartData.datasets[0].label = `Курс ${state.base} к  ${state.symbols}`
      state.chartData.datasets[0].backgroundColor = 'red'
      state.chartData.datasets[0].data = resultArr;

      //insert data into apexcharts
      let newData = [{
        name: `Курс ${state.base} к  ${state.symbols}`,
        data: resultArr,
      }]
      state.apexChartData.series = newData

      console.log(newMarks)
      state.apexChartData.chartOptions = {
        ...state.apexChartData.chartOptions,
        ...{
          xaxis: { categories: newMarks },
        },
      };


      //state.apexChartData.chartOptions.xaxis.categories = Object.keys(payload.rates)

    },
    setBase(state, payload) {
      state.base = payload
    },
    setSymbols(state, payload) {
      state.symbols = payload
    },
    setStart(state, payload) {
      state.start = payload
    },
    setEnd(state, payload) {
      state.end = payload
    },
    setAllSymbols(state, payload) {
      state.all_symbols = payload.symbols
    }
  },
  actions: {
    async getLatest({ commit }) {
      commit('gotData', await getLatest())
    },
    async getTimeseriesSymbolsAction({ commit, state }) {
      const result = await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?symbols=${state.symbols}&base=${state.base}&start_date=${state.start}&end_date=${state.end}`, requestOptions)
      // console.log(result)
      // console.log(result.json())
      commit('gotTimeseriesSymbols', await result.json())
    },
    async getTimeseriesMore({ commit, state }) {
      const timeseriesSymbols = await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?symbols=${state.symbols}&base=${state.base}&start_date=${state.start}&end_date=${state.end}`, requestOptions)
      commit('gotTimeseriesMore', await timeseriesSymbols.json())
    },
    async getTimeseries({ commit }) {
      commit('gotData', await getTimeseries())
    },
    async getAllSymbols({ commit }) {
      const result = await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      commit('setAllSymbols', await result.json())
    },

  },
  getters: {
    responseJSON(state) {
      return state.responseJSON
    },
    timeseriesSymbolsRates(state) {
      return state.timeseriesSymbolsRates
    },
    values(state) {
      return state.values
    },
    marks(state) {
      return state.marks
    },
    allSymbols(state) {
      return state.all_symbols
    },
    chartData(state) {
      return state.chartData
    },


    apexData(state) {
      return state.apexChartData
    },
    apexOptions(state) {
      return state.apexChartData.chartOptions
    },
    apexSeries(state) {
      return state.apexChartData.series
    }
  }
}






const exchangeModule = {
  namespaced: true,
  state: {
    //отладочная переменная для ответа
    responseJSON: "",
    rates: "",
    test: 'Testando azazahizxfgiyagk',

    timeseriesSymbolsResponse: "",
    timeseriesSymbolsRates: "",
    values: [],
    marks: [],
    symbols: '',
    base: '',
    start: '',
    end: ''
  },
  mutations: {
    gotData(state, payload) {
      console.log('mutation - gotData')
      console.log("payload", payload)
      state.responseJSON = payload
    },
    gotTimeseriesSymbols(state, payload) {
      console.log('mutation - gotTimeseriesSymbols')
      console.log("payload", payload)
      //отладочная запись
      state.responseJSON = payload

      //норм запись данных из апи
      state.timeseriesSymbolsResponse = payload
      state.timeseriesSymbolsRates = payload.rates

      //для построения графика
      state.marks = Object.keys(payload.rates)

      let loco = Object.entries(payload.rates)
      let resultArr = []
      loco.map(el => {
        let roco = new Array(el[1])
        roco.map(subEl => {
          let coco = Object.values(subEl)[0]
          resultArr.push(coco)
        })
      })

      state.values = resultArr
    }
  },
  actions: {
    async getLatest({ commit }) {
      commit('gotData', await getLatest())
    },
    async getTimeseriesSymbolsAction({ commit }) {
      const timeseriesSymbols = await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?symbols=${SYMBOLS}&base=${BASE}&start_date=${START_DATE}&end_date=${END_DATE}`, requestOptions)
      commit('gotTimeseriesSymbols', await timeseriesSymbols.json())
    },
    async getTimeseries({ commit }) {
      commit('gotData', await getTimeseries())
    }
  },
  getters: {
    getResponseJSON(state) {
      return state.responseJSON
    },
    getTimeseriesSymbolsRates(state) {
      return state.timeseriesSymbolsRates
    },
    getValues(state) {
      console.log('values', state.values)
      return state.values
    },
    getMarks(state) {
      return state.marks
    }
  }
}

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    exchangeModule: exchangeModule,
    multiChartModule: multiChartModule
  }
})
