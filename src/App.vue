<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Drzewiasty system ekspertowy</h1>
      <h2 class="subtitle">
        Wybierz proszę cechy charakterystyczne Twojego drzewa, a ja podam Ci jego gatunek.
      </h2>

      <div class="content"> <!--box-->
        <form>
          <b-field :label="typeProperty.displayName">
            <b-radio-button v-model="chosen[typeProperty.name]" v-for="(value, index) in typeProperty.values" :key="`value_${index}`" :native-value="value.name">
              {{ value.displayName }}
            </b-radio-button>
          </b-field>

          <b-field
            v-for="(property, index) in commonProperties"
            :key="`property_${index}`"
            :label="property.displayName">

            <b-radio-button
              v-for="(value, valueIndex) in property.values"
              :key="`value_${valueIndex}`"
              v-model="chosen[property.name]"
              :native-value="value.name">
              {{ value.displayName }}
            </b-radio-button>
          </b-field>

          <b-field label="Kora">
            <b-radio-button v-model="chosen.kora" v-for="item in kora" :key="item" :native-value="item">
              {{ item }}
            </b-radio-button>
          </b-field>

          <b-field label="Pokrój">
            <b-radio-button v-model="chosen.pokroj" v-for="item in pokroj" :key="item" :native-value="item">
              {{ item }}
            </b-radio-button>
          </b-field>

          <b-field label="Korona">
            <b-radio-button v-model="chosen.korona" v-for="item in korona" :key="item" :native-value="item">
              {{ item }}
            </b-radio-button>
          </b-field>

          <b-field label="Owoc">
            <b-radio-button v-model="chosen.owoc" v-for="item in owoc" :key="item" :native-value="item">
              {{ item }}
            </b-radio-button>
          </b-field>

          <template v-if="chosen.typ === 'lisciaste'">
            <b-field label="Kształt liścia">
              <b-radio-button v-model="chosen.ksztalt_liscia" v-for="item in ksztalt_liscia" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>

            <b-field label="Krawędź liścia">
              <b-radio-button v-model="chosen.krawedz_liscia" v-for="item in krawedz_liscia" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>

            <b-field label="Położenie liścia">
              <b-radio-button v-model="chosen.polozenie_liscia" v-for="item in polozenie_liscia" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>

            <b-field label="Krotność liścia">
              <b-radio-button v-model="chosen.krotnosc_liscia" v-for="item in krotnosc_liscia" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>
          </template>

          <template v-if="chosen.typ === 'iglaste'">
            <b-field label="Długość igły">
              <b-radio-button v-model="chosen.dlugosc_igly" v-for="item in dlugosc_igly" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>

            <b-field label="Miękkość igły">
              <b-radio-button v-model="chosen.miekkosc_igly" v-for="item in miekkosc_igly" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>

            <b-field label="Kolor igły">
              <b-radio-button v-model="chosen.kolor_igly" v-for="item in kolor_igly" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>

            <b-field label="Kształt szyszki">
              <b-radio-button v-model="chosen.ksztalt_szyszki" v-for="item in ksztalt_szyszki" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>

            <b-field label="Wektor szyszki">
              <b-radio-button v-model="chosen.wektor_szyszki" v-for="item in wektor_szyszki" :key="item" :native-value="item">
                {{ item }}
              </b-radio-button>
            </b-field>

          </template>

          <!-- <b-field v-for="(property, value) in chosen" :label="property" :key="value">
            <b-radio-button v-model="this[property]" v-for="item in this[property]" :key="item" :native-value="item">
              {{ item }}
            </b-radio-button>
          </b-field> -->

          <b-button type="is-primary" @click="run" class="mr-3">
            Uruchom
          </b-button>
          
          <b-button type="is-primary" @click="clear">
            Nowe zapytanie
          </b-button>
        </form>
      </div>

      <h1 class="title">Wyniki</h1>
      <div
          class="box"
          v-for="(result, index) in results"
          :key="index">
        <article class="media">
          <div class="media-left">
            <figure class="image">
              <img :src="getImageURL(result)" v-bind:alt="result">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <h2>
                <strong>{{result}}</strong>
              </h2>
              [Opis drzewa]
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
      typeProperty: {
        name: 'typ',
        displayName: 'Typ',
        values: [
          { name: 'lisciaste', displayName: 'Liściaste' },
          { name: 'iglaste', displayName: 'Iglaste' }
        ]
      },
      commonProperties: [
        {
          name: 'zimozielone',
          displayName: 'Zimozielone',
          values: [
            { name: 'tak', displayName: 'Tak' },
            { name: 'nie', displayName: 'Nie' }
          ]
        }
      ],
      kora: ['bura', 'brunatna', 'jasna', 'szara', 'popielata', 'brazowa', 'biala'],
      pokroj: ['okraglawy', 'kolumnowy', 'stozkowaty'],
      korona: ['rozlozysta', 'kopulasta', 'luzna', 'gesta', 'szeroka', 'stozkowata'],
      owoc: ['zoladz', 'orzech', 'kulka', 'bukiew', 'kasztan', 'szyszka'],
      ksztalt_liscia: ['klapiste', 'odwrocone_serca', 'sercowate', 'podluzne', 'jajowate', 'eliptyczne', 'okraglawe', 'palczaste'],
      krawedz_liscia: ['gladka', 'pilkowana', 'karbowana', 'zabkowana'],
      polozenie_liscia: ['skretolegle', 'naprzemianlegle'],
      krotnosc_liscia: ['pojedyncze', 'pierzasto_zlozone'],
      dlugosc_igly: ['dlugie', 'krotkie'],
      miekkosc_igly: ['klujace', 'miekkie'],
      kolor_igly: ['niebiesko_zielone', 'zielony_z_2_paskami', 'zielone'],
      ksztalt_szyszki: ['okraglawy', 'podluzny'],
      wektor_szyszki: ['wzniesiona', 'zwisajaca', '?'],

      chosen: {
        typ: null,
        zimozielone: null,
        kora: null,
        pokroj: null,
        korona: null,
        owoc: null,
        ksztalt_liscia: null,
        krawedz_liscia: null,
        polozenie_liscia: null,
        krotnosc_liscia: null,
        dlugosc_igly: null,
        miekkosc_igly: null,
        kolor_igly: null,
        ksztalt_szyszki: null,
        wektor_szyszki: null
      },
      results: [],

      images: {
        dab: "http://ekoexpo.pl/files/obrazki%20artykuly/quercus-robur003.jpeg",
        lipa: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Tilia_cordata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-139.jpg",
        jarzab: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Illustration_Sorbus_aucuparia0.jpg/800px-Illustration_Sorbus_aucuparia0.jpg",
        olcha: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Illustration_Alnus_glutinosa0.jpg/800px-Illustration_Alnus_glutinosa0.jpg",
        buk: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Illustration_Fagus_sylvatica0.jpg/800px-Illustration_Fagus_sylvatica0.jpg",
        grab: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Illustration_Carpinus_betulus_1.jpg/800px-Illustration_Carpinus_betulus_1.jpg",
        brzoza: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Illustration_Betula_pendula0.jpg/800px-Illustration_Betula_pendula0.jpg",
        kasztanowiec: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Illustration_Aesculus_hippocastanum0.jpg/371px-Illustration_Aesculus_hippocastanum0.jpg",
        sosna: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Illustration_Pinus_sylvestris0.jpg/800px-Illustration_Pinus_sylvestris0.jpg",
        jodla: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Illustration_Abies_alba0.jpg/392px-Illustration_Abies_alba0.jpg",
        swierk: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Illustration_Picea_abies0_clean.jpg/447px-Illustration_Picea_abies0_clean.jpg",
        modrzew: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Illustration_Larix_decudua0.jpg/448px-Illustration_Larix_decudua0.jpg"
      }
    }
  },
  computed: {
    facts () {
      let facts = []
      for (const [key, value] of Object.entries(this.chosen)) {
        if (value !== null) {
          facts.push({
            key: key,
            value: value
          })
        }
      }
      // console.log(facts)
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
    },
    clear() {
      Object.keys(this.chosen).forEach(k => this.chosen[k] = null)
      this.results = []
    },
    getImageURL(result) {
      return this.images[result]
    }
  }
}
</script>
