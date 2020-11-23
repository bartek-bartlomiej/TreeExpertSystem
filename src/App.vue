<template>
  <div id="app">

    <p>Kolor</p>
    <input type="radio" id="c1" value="zolty" v-model="color">
    <label for="n1">Żółty</label>
    <input type="radio" id="c2" value="zielony" v-model="color">
    <label for="n2">Zielony</label>
    <input type="radio" id="c3" value="czerwony" v-model="color">
    <label for="n2">Czerwony</label>
    <input type="radio" id="c4" value="czarny" v-model="color">
    <label for="n2">Czarny</label>
<!--    <p>{{color}}</p>-->

    <p>Numer</p>
    <input type="radio" id="n1" value="parzysty" v-model="number">
    <label for="n1">Parzysty</label>
    <input type="radio" id="n2" value="nieparzysty" v-model="number">
    <label for="n2">Nieparzysty</label>
<!--    <p>{{number}}</p>-->
    <p/>

    <button @click="run">Run it</button>
    <p v-for="(result, index) in results" :key="index">{{result}}</p>
  </div>
</template>

<script>
// import pl from 'tau-prolog'
import { getAnswersProvider } from './backend'

export default {
  name: 'App',
  data: () => {
    return {
      color: null,
      number: null,
      results: []
    }
  },
  computed: {
    facts () {

      let facts = []
      if (this.number) {
        facts.push({
          key: 'numer',
          value: this.number
        })
      }
      if (this.color) {
        facts.push({
          key: 'kolor',
          value: this.color
        })
      }
      return facts
    }
  },
  methods: {
    run() {
      getAnswersProvider(this.facts).then(answers => {
        this.results = answers
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
