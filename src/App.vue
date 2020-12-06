<template>
  <section class="section">
    <div class="container">
      <h1 class="title"
          id="system">
        Drzewiasty system ekspertowy
      </h1>
      <h2 class="subtitle">
        Wybierz proszę cechy charakterystyczne Twojego drzewa, a ja podam Ci jego gatunek.
      </h2>

      <div class="content"> <!--box-->
        <form>
          <b-field
              :label="typeProperty.displayName"
              grouped>
            <b-field>
              <b-radio-button
                  v-for="(value, index) in typeProperty.values"
                  v-model="chosen[typeProperty.name]"
                  :key="`type_value_${index}`"
                  :native-value="value.name">
                {{ value.displayName }}
              </b-radio-button>
            </b-field>

            <b-button
                type="is-light"
                icon-right="delete"
                :disabled="chosen.typ === null"
                @click="chosen.typ = null" />
          </b-field>

          <b-field
            v-for="(property, index) in commonProperties"
            :key="`common_property_${index}`"
            :label="property.displayName"
            grouped>

            <b-field>
              <b-radio-button
                  v-for="(value, valueIndex) in property.values"
                  :key="`common_value_${valueIndex}`"
                  v-model="chosen[property.name]"
                  :native-value="value.name">
                {{ value.displayName }}
              </b-radio-button>
            </b-field>

            <b-button
                type="is-light"
                icon-right="delete"
                :disabled="chosen[property.name] === null"
                @click="chosen[property.name] = null" />
          </b-field>

          <template v-if="chosen.typ === 'lisciaste'">
            <b-field
              v-for="(property, index) in leafProperties"
              :key="`leaf_property_${index}`"
              :label="property.displayName"
              grouped>

              <b-field>
                <b-radio-button
                    v-for="(value, valueIndex) in property.values"
                    :key="`leaf_value_${valueIndex}`"
                    v-model="chosen[property.name]"
                    :native-value="value.name">
                  {{ value.displayName }}
                </b-radio-button>
              </b-field>

              <b-button
                  type="is-light"
                  icon-right="delete"
                  :disabled="chosen[property.name] === null"
                  @click="chosen[property.name] = null" />
            </b-field>
          </template>

          <template v-if="chosen.typ === 'iglaste'">
            <b-field
              v-for="(property, index) in coniferousProperties"
              :key="`needle_property_${index}`"
              :label="property.displayName"
              grouped>

              <b-field>
                <b-radio-button
                    v-for="(value, valueIndex) in property.values"
                    :key="`needle_value_${valueIndex}`"
                    v-model="chosen[property.name]"
                    :native-value="value.name">
                  {{ value.displayName }}
                </b-radio-button>
              </b-field>

              <b-button
                  type="is-light"
                  icon-right="delete"
                  :disabled="chosen[property.name] === null"
                  @click="chosen[property.name] = null" />
            </b-field>
          </template>

          <div class="buttons mt-6">
            <b-button 
                type="is-primary is-medium" 
                icon-left="nature" 
                @click="run" 
                class="mr-3">
              Uruchom
            </b-button>
            
            <b-button 
                type="is-primary is-medium" 
                icon-left="replay" 
                outlined 
                @click="clear">
              Nowe zapytanie
            </b-button>
          </div>
        </form>
      </div>

      <h1 class="title"
          id="results">
        Wyniki
      </h1>
      <div
          class="box"
          v-for="(result, index) in results"
          :key="index">
        <article class="media">
          <div class="media-left">
            <figure class="image">
              <b-image 
                :src="treeData[result].image" 
                :alt="result"
                style="max-width:343px"
              ></b-image>
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <h2>
                <strong>{{ treeData[result].displayName }}</strong>
              </h2>
              {{ treeData[result].description }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { getAnswersProvider } from './backend'

import VueScrollTo from "vue-scrollto"

export default {
  name: 'App',
  data: () => {
    return {
      typeProperty: {
        name: 'typ',
        displayName: 'Typ',
        values: [
          { name: 'lisciaste', displayName: 'liściaste' },
          { name: 'iglaste', displayName: 'iglaste' }
        ]
      },
      commonProperties: [
        {
          name: 'zimozielone',
          displayName: 'Zimozielone',
          values: [
            { name: 'tak', displayName: 'tak' },
            { name: 'nie', displayName: 'nie' }
          ]
        },
        {
          name: 'kora',
          displayName: 'Kora',
          values: [
            { name: 'bura', displayName: 'bura' },
            { name: 'brunatna', displayName: 'brunatna' },
            { name: 'jasna', displayName: 'jasna' },
            { name: 'szara', displayName: 'szara' },
            { name: 'popielata', displayName: 'popielata' },
            { name: 'brazowa', displayName: 'brązowa' },
            { name: 'biala', displayName: 'biała' }
          ]
        },
        {
          name: 'pokroj',
          displayName: 'Pokrój',
          values: [
            { name: 'okraglawy', displayName: 'okrągławy' },
            { name: 'kolumnowy', displayName: 'kolumnowy' },
            { name: 'stozkowaty', displayName: 'stożkowaty' }
          ]
        },
        {
          name: 'korona',
          displayName: 'Korona',
          values: [
            { name: 'rozlozysta', displayName: 'rozłożysta' },
            { name: 'kopulasta', displayName: 'kopulasta' },
            { name: 'luzna', displayName: 'luźna' },
            { name: 'gesta', displayName: 'gęsta' },
            { name: 'szeroka', displayName: 'szeroka' },
            { name: 'stozkowata', displayName: 'stożkowata' }
          ]
        },
        {
          name: 'owoc',
          displayName: 'Owoc',
          values: [
            { name: 'zoladz', displayName: 'żołądź' },
            { name: 'orzech', displayName: 'orzech' },
            { name: 'kulka', displayName: 'kulka' },
            { name: 'bukiew', displayName: 'bukiew' },
            { name: 'kasztan', displayName: 'kasztan' },
            { name: 'szyszka', displayName: 'szyszka' }
          ]
        }
      ],

      leafProperties: [
        {
          name: 'ksztalt_liscia',
          displayName: 'Kształt liścia',
          values: [
            { name: 'klapiste', displayName: 'klapiste' },
            { name: 'odwrocone_serca', displayName: 'odwrócone serca' },
            { name: 'sercowate', displayName: 'sercowate' },
            { name: 'podluzne', displayName: 'podłużne' },
            { name: 'jajowate', displayName: 'jajowate' },
            { name: 'eliptyczne', displayName: 'eliptyczne' },
            { name: 'okraglawe', displayName: 'okrągławe' },
            { name: 'palczaste', displayName: 'palczaste' }
          ]
        },
        {
          name: 'krawedz_liscia',
          displayName: 'Krawędź liścia',
          values: [
            { name: 'gladka', displayName: 'gładka' },
            { name: 'pilkowana', displayName: 'piłkowana' },
            { name: 'karbowana', displayName: 'karbowana' },
            { name: 'zabkowana', displayName: 'ząbkowana' }
          ]
        },
        {
          name: 'polozenie_liscia',
          displayName: 'Położenie liścia',
          values: [
            { name: 'skretolegle', displayName: 'skrętoległe' },
            { name: 'naprzemianlegle', displayName: 'naprzemianległe' }
          ]
        },
        {
          name: 'krotnosc_liscia',
          displayName: 'Krotność liścia',
          values: [
            { name: 'pojedyncze', displayName: 'pojedyncze' },
            { name: 'pierzasto_zlozone', displayName: 'pierzasto złożone' }
          ]
        }
      ],

      coniferousProperties: [
        {
          name: 'dlugosc_igly',
          displayName: 'Długość igły',
          values: [
            { name: 'dlugie', displayName: 'długie' },
            { name: 'krotkie', displayName: 'krótkie' }
          ]
        },
        {
          name: 'miekkosc_igly',
          displayName: 'Miękkość igły',
          values: [
            { name: 'klujace', displayName: 'kłujące' },
            { name: 'miekkie', displayName: 'miękkie' }
          ]
        },
        {
          name: 'kolor_igly',
          displayName: 'Kolor igły',
          values: [
            { name: 'niebiesko_zielone', displayName: 'niebiesko zielone' },
            { name: 'zielony_z_2_paskami', displayName: 'zielony z 2 paskami' },
            { name: 'zielone', displayName: 'zielone' }
          ]
        },
        {
          name: 'ksztalt_szyszki',
          displayName: 'Kształt szyszki',
          values: [
            { name: 'okraglawy', displayName: 'okrągławy' },
            { name: 'podluzny', displayName: 'podłużny' }
          ]
        },
        {
          name: 'wektor_szyszki',
          displayName: 'Wektor szyszki',
          values: [
            { name: 'wzniesiona', displayName: 'wzniesiona' },
            { name: 'zwisajaca', displayName: 'zwisająca' }
          ]
        }
      ],

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

      treeData: {
        dab: {
          displayName: "Dąb",
          description: "Jest gatunkiem długowiecznym, żyje ponad 700 lat. Jest powszechnie uważany za jedno z najszlachetniejszych drzew i praktycznie wszędzie na terenie swojego występowania cieszy się wyjątkowym szacunkiem i sympatią. Ze względu na okazałe rozmiary jakie osiąga, sprawia majestatyczne wrażenie.",
          image: "http://ekoexpo.pl/files/obrazki%20artykuly/quercus-robur003.jpeg",
        },
        lipa: {
          displayName: "Lipa",
          description: "Wysokie i bardzo okazałe drzewo liściaste o grubym pniu oraz gęstej, szerokiej koronie. Jest często sadzona w parkach, wzdłuż dróg, na osiedlach i przy kościołach. Lubi świeże i żyzne, piaszczysto-ilaste gleby, dobrze znosi zacienienie, jest najbardziej mrozoodporna ze wszystkich lip, ale też jak większość z nich atakowana przez liczne szkodniki i mało odporna na zanieczyszczenia powietrza.",
          image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Tilia_cordata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-139.jpg",
        },
        jarzab: {
          displayName: "Jarząb",
          description: "Niewielkie drzewko o dość regularnym, ładnym pokroju i ciekawych liściach. Jego największą dekoracją są owoce – drobne kuleczki, które naniziane na nitkę wyglądają jak najpiękniejsze korale - jarzębina.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Illustration_Sorbus_aucuparia0.jpg/800px-Illustration_Sorbus_aucuparia0.jpg",
        },
        olcha: {
          displayName: "Olcha",
          description: "Olsza jest drzewem liściastym. Jest gatunkiem szybkorosnącym, żyje do ok. 120 lat. Najbardziej charakterystyczną cechą olszy czarnej, są niewielkie, szyszeczkowate owocostany osadzone na trzoneczkach i utrzymujące się na drzewie przez kilka lat.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Illustration_Alnus_glutinosa0.jpg/800px-Illustration_Alnus_glutinosa0.jpg",
        },
        buk: {
          displayName: "Buk",
          description: "Okazałe, potężnie zbudowane drzewo liściaste o grubym pniu, masywnych konarach i szerokiej, kopulasto wysklepionej koronie. Osiąga wiek do 350 lat. Najbardziej charakterystyczną cechą buka, pozwalającą bez trudu rozpoznać to drzewo o każdej porze roku, jest jego jasna, szara, zawsze gładka kora. Lubi dość wysoką wilgotność powietrza i jest wrażliwy na wiosenne przymrozki, dlatego brak jest jego naturalnych stanowisk w centralnej i wschodniej Polsce. Rośnie na glebach żyznych, wapiennych, napowietrzonych i wilgotnych, ale nie podmokłych. Młode rośliny doskonale znoszą zacienienie.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Illustration_Fagus_sylvatica0.jpg/800px-Illustration_Fagus_sylvatica0.jpg",
        },
        grab: {
          displayName: "Grab",
          description: "Grab to drzewo liściaste, zrzucające liście na zimę, o szerokiej, często miotastej koronie. Najłatwiej je rozpoznać po zawsze gładkiej, szarej korze z jaśniejszymi paskami. Stanowi on jeden z ważniejszych rodzimych gatunków drzew tworzących lasy w Polsce. Jest drzewem rosnącym nawet w silnym zacienieniu.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Illustration_Carpinus_betulus_1.jpg/800px-Illustration_Carpinus_betulus_1.jpg",
        },
        brzoza: {
          displayName: "Brzoza",
          description: "Brzoza jest bardzo charakterystycznym drzewem, nie sposób jej nie rozpoznać ze względu na wyjątkową białą korę, a także delikatne i wiotkie gałązki, zwisające i poruszające się przy podmuchach wiatru. Należy do najpopularniejszych i darzonych największą sympatią drzew, powszechnie sadzonych w parkach i ogrodach, przy domach, na placach i osiedlach.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Illustration_Betula_pendula0.jpg/800px-Illustration_Betula_pendula0.jpg",
        },
        kasztanowiec: {
          displayName: "Kasztanowiec",
          description: "Jest to duże i okazałe drzewo liściaste o grubym pniu i kopulastej, często bardzo rozłożystej koronie. Zimą łatwo je rozpoznać z daleka dzięki unikalnemu układowi powyginanych konarów, przechodzących stopniowo w długie, zwisające pionowo niczym grube kable, ciemnobrunatne gałęzie.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Illustration_Aesculus_hippocastanum0.jpg/371px-Illustration_Aesculus_hippocastanum0.jpg",
        },
        sosna: {
          displayName: "Sosna",
          description: "Sosna limba występuje na obszarze Alp, Tatr i Karpat Wschodnich. Jest to drzewo iglaste, wolno rosnące. Może osiągnąć wiek do 500 lat. W Polsce w stanie dzikim występuje tylko w Tatrach, gdzie rośnie pojedynczo wśród kosodrzewiny. Limba rośnie na skalistych zboczach, chociaż dobrze czuje się także na nizinach na glinianych glebach, dobrze nawodnionych. Lubi miejsca nasłonecznione.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Illustration_Pinus_sylvestris0.jpg/800px-Illustration_Pinus_sylvestris0.jpg",
        },
        jodla: {
          displayName: "Jodła",
          description: "Sylwetką jodła przypomina świerka i modrzewia, jednak w odróżnieniu od nich wierzchołek starych jodeł jest na ogół charakterystycznie spłaszczony, tworząc tzw. bocianie gniazdo. Na tle innych drzew iglastych jodła pospolita wyróżnia się wyraźnie jasną, srebrzystopopielatą i stosunkowo gładką korą oraz stojącymi, przypominającymi z daleka świece, szyszkami.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Illustration_Abies_alba0.jpg/392px-Illustration_Abies_alba0.jpg",
        },
        swierk: {
          displayName: "Świerk",
          description: "Świerk pospolity jest uznawany za drugie (po jodle) najwyższe rodzime drzewo europejskie - w sprzyjających warunkach może on osiągać nawet ponad 60m wysokości(!), choć normalnie rzadko przekracza 40m. Dobrą cechą rozpoznawczą świerka pospolitego są jego zwisające szyszki, których podługowaty kształt przypomina „cygaro”.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Illustration_Picea_abies0_clean.jpg/447px-Illustration_Picea_abies0_clean.jpg",
        },
        modrzew: {
          displayName: "Modrzew",
          description: "Bardzo wysokie, zrzucające igły na zimę drzewo iglaste - osiąga 50m wysokości. Igły miękkie i delikatne, zebrane na krótkopędach po kilkadziesiąt sztuk w gęste pęczki. Latem są trawiasto-zielone, jesienią przebarwiają się na żółty kolor. W Polsce na stanowiskach naturalnych modrzew europejski występuje niezwykle rzadko i tylko w Tatrach. ",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Illustration_Larix_decudua0.jpg/448px-Illustration_Larix_decudua0.jpg",
        }
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
  watch: {
    results(value) {
      let element = value !== null ? '#results' : '#system'
      VueScrollTo.scrollTo(element, 750, { easing: 'ease-in-out' })
    }
  },
  methods: {
    run() {
      getAnswersProvider(this.facts).then(answers => {
        this.results = answers
        console.log(answers)
      }).catch(err => {
        console.log(err)
      })
    },
    clear() {
      Object.keys(this.chosen).forEach(k => this.chosen[k] = null)
      this.results = []
    }
  }
}
</script>
