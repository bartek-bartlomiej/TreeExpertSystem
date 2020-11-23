<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Section</h1>
      <h2 class="subtitle">
        A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
      </h2>

      <div class="content"> <!--box-->
        <form>
          <b-field label="Kolor">
            <b-radio v-model="color"
                     name="color"
                     native-value="zolty">
              Żółty
            </b-radio>
            <b-radio v-model="color"
                     name="color"
                     native-value="zielony">
              Zielony
            </b-radio>
            <b-radio v-model="color"
                     name="color"
                     native-value="czerwony">
              Czerwony
            </b-radio>
            <b-radio v-model="color"
                     name="color"
                     native-value="czarny">
              Czarny
            </b-radio>
          </b-field>
          <!--    <p class="content">-->
          <!--      <b>Selection:</b>-->
          <!--      {{ color }}-->
          <!--    </p>-->

          <b-field label="Numer">
            <b-radio v-model="number"
                     name="number"
                     native-value="parzysty">
              Parzysty
            </b-radio>
            <b-radio v-model="number"
                     name="number"
                     native-value="nieparzysty">
              Nieparzysty
            </b-radio>
          </b-field>
          <!--    <p class="content">-->
          <!--      <b>Selection:</b>-->
          <!--      {{ number }}-->
          <!--    </p>-->

            <b-button
                type="is-primary"
                @click="run">
              Run it
            </b-button>
        </form>
      </div>

      <h1 class="title">Results</h1>
      <div
          class="box"
          v-for="(result, index) in results"
          :key="index">
        <article class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{result}}</strong>
                <br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
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

