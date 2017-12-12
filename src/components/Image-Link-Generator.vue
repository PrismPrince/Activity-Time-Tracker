<template>
  <div class="image-link-generator">
    <navbar :auth="auth"/>
    <md-layout md-align="center">
      <md-layout md-gutter="16" md-flex="80">
        <md-layout md-flex="25">
          <md-image class="product-image" :md-src="'https://cdn3.minted.com/files/mintedProductsImages/MIN/' + prodkind + '/' + code + '/' + normalize_sku + '-007B_A_PD.jpg'" />
        </md-layout>
        <md-layout>
          <md-layout md-flex="100">
            <md-input-container md-clearable>
              <label>SKU Code (MIN-XXX-ZZZ)</label>
              <md-input type="text" v-model="sku" />
            </md-input-container>
          </md-layout>

          <md-layout md-flex="100">
            <md-switch class="md-primary" v-model="prepend_parameter">Append parameter <small class="md-caption">(for old PDP)</small></md-switch>
          </md-layout>

          <md-layout md-flex="100">
            <h4 class="label">Colorways</h4>
            <md-layout md-flex="100">
              <md-radio class="md-primary" name="colorway" md-value="A" v-model="colorway">A</md-radio>
              <md-radio class="md-primary" name="colorway" md-value="B" v-model="colorway">B</md-radio>
              <md-radio class="md-primary" name="colorway" md-value="C" v-model="colorway">C</md-radio>
              <md-radio class="md-primary" name="colorway" md-value="D" v-model="colorway">D</md-radio>
              <md-radio class="md-primary" name="colorway" md-value="E" v-model="colorway">E</md-radio>
              <md-radio class="md-primary" name="colorway" md-value="F" v-model="colorway">F</md-radio>
              <md-radio class="md-primary" name="colorway" md-value="G" v-model="colorway">G</md-radio>
              <md-radio class="md-primary" name="colorway" md-value="H" v-model="colorway">H</md-radio>
            </md-layout>
          </md-layout>

          <md-layout md-flex="100">
            <h4 class="label">Greetings <small class="md-caption">(select if applicable)</small></h4>
            <md-layout md-flex="100">
              <md-checkbox name="greetings" md-value="HOLIDAY" v-model="greetings">Holiday</md-checkbox>
              <md-checkbox name="greetings" md-value="CHRISTMAS" v-model="greetings">Christmas</md-checkbox>
              <md-checkbox name="greetings" md-value="NEWYEAR" v-model="greetings">New Year</md-checkbox>
              <md-checkbox name="greetings" md-value="RELIGIOUS" v-model="greetings">Religious</md-checkbox>
            </md-layout>
          </md-layout>

          <md-layout md-flex="100">
            <md-button class="md-raised md-primary" @click="generate_links">Generate</md-button>
            <md-button class="md-raised" @click="clear">Clear</md-button>
          </md-layout>

          <md-layout md-flex="100">
            <h4 class="label">Links <small class="md-caption" v-if="links.array.length > 100">Cache invalidator has maximum of 100 entry. {{ links.array.length }} links generated.</small></h4>
            <div class="input-links">
              <md-input-container>
                <md-textarea id="links" class="links-area" v-model="links.string" placeholder="https://cdn3.minted.com/files/mintedProductsImages/MIN/ZZZ/XXX/MIN-XXX-ZZZ-CODE_A_PD.jpg"></md-textarea>
              </md-input-container>
              <md-button class="md-icon-button md-raised btn-copy md-accent" @click="copy_to_clipboard" :disabled="links.string == ''">
                <md-icon>content_copy</md-icon>
                <md-tooltip>Copy</md-tooltip>
              </md-button>
            </div>
          </md-layout>
        </md-layout>
      </md-layout>
      <md-layout md-flex="80" v-if="links.array.length">
        <h2>Image Links</h2>
        <md-layout md-flex="100">
          <md-input-container class="select-filter">
            <label for="movie">Colorway</label>
            <md-select v-model="filter.colorway">
              <md-option :value="colorway" :key="key" v-for="(colorway, key) in colorways">{{ colorway }}</md-option>
            </md-select>
          </md-input-container>
          <md-input-container class="select-filter">
            <label for="movie">Layout</label>
            <md-select v-model="filter.layout">
              <md-option :value="layout" :key="key" v-for="(layout, key) in layouts">{{ layout }}</md-option>
            </md-select>
          </md-input-container>
          <md-input-container class="select-filter">
            <label for="movie">Format</label>
            <md-select v-model="filter.format">
              <md-option :value="format" :key="key" v-for="(format, key) in formats">{{ format }}</md-option>
            </md-select>
          </md-input-container>
          <md-input-container class="select-filter" v-if="greetings.length > 1">
            <label for="movie">Greeting</label>
            <md-select v-model="filter.greeting">
              <md-option :value="greeting" :key="key" v-for="(greeting, key) in greetings">{{ normalize_greeting(greeting) }}</md-option>
            </md-select>
          </md-input-container>
          <div class="btn-filter" v-if="filter.colorway || filter.layout || filter.format || filter.greeting">
            <md-button class="md-dense md-raised md-primary" @click="filter_images">Filter</md-button>
            <md-button class="md-dense md-raised" @click="reset_filter">Clear</md-button>
          </div>
        </md-layout>
        <md-layout md-flex="100" md-gutter="8">
          <md-layout class="img-container" md-flex="10" :key="key" v-for="(image, key) of filter.images">
            <a href="https://cdn3.minted.com/files/mintedProductsImages/MIN/HSM/7HM/MIN-7HM-HSM-007B_A_PD.jpg" target="_blank">
              <md-card md-with-hover>
                <md-card-media>
                  <md-image :md-src="image.link" />
                  <md-ink-ripple />
                </md-card-media>
              </md-card>
            </a>
            <md-tooltip>Colorway {{ image.colorway }}</md-tooltip>
          </md-layout>
        </md-layout>
      </md-layout>
    </md-layout>
    <md-snackbar ref="snackbar" :md-duration="4000">
      <span>Copied to clipboard.</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
/* eslint no-fallthrough: 0 */

import navbar from '@/components/_navbar'
import firebase from './firebaseInit'
import layout from './mixins/layout'
import prodkind from './mixins/prodkind'

export default {
  name: 'image-link-generator',
  mixins: [prodkind, layout],
  components: {
    navbar
  },
  data () {
    return {
      auth: firebase.auth().currentUser,
      sku: '',
      colorway: '',
      greetings: [],
      layouts: [],
      formats: [],
      prepend_parameter: true,
      links: {
        string: '',
        array: []
      },
      filter: {
        colorway: '',
        layout: '',
        format: '',
        greeting: '',
        images: []
      }
    }
  },
  computed: {
    normalize_sku () {
      return this.sku.trim().toUpperCase()
    },
    code () {
      return this.normalize_sku.split('-')[1]
    },
    prodkind () {
      return this.normalize_sku.split('-')[2]
    },
    colorways () {
      var colorways = []

      switch (this.colorway) {
        case 'H':
          colorways.push('H')
        case 'G':
          colorways.push('G')
        case 'F':
          colorways.push('F')
        case 'E':
          colorways.push('E')
        case 'D':
          colorways.push('D')
        case 'C':
          colorways.push('C')
        case 'B':
          colorways.push('B')
        case 'A':
          colorways.push('A')
      }

      return colorways.sort()
    }
  },
  methods: {
    copy_to_clipboard () {
      document.getElementById('links').select()
      document.execCommand('copy')

      this.$refs.snackbar.open()
    },
    clear () {
      this.sku = ''
      this.colorway = ''
      this.greetings = []
      this.layouts = []
      this.formats = []
      this.prepend_parameter = false
      this.links = {
        string: '',
        array: []
      }
      this.filter = {
        colorway: '',
        layout: '',
        format: '',
        greeting: '',
        images: []
      }
    },
    reset_filter () {
      var links = []

      for (let link of this.links.array) {
        links.push(link.link)
      }

      this.filter = {
        colorway: '',
        layout: '',
        format: '',
        greeting: '',
        images: this.links.array
      }
    },
    normalize_greeting (greeting) {
      switch (greeting) {
        case 'HOLIDAY': return 'Holiday'
        case 'CHRISTMAS': return 'Christmas'
        case 'NEWYEAR': return 'New Year'
        case 'RELIGIOUS': return 'Religious'
      }
    },
    filter_images () {
      let filter = this.links.array
      let temp = []

      if (this.filter.colorway !== '') {
        for (let i of filter.filter(img => this.filter.colorway === img.colorway)) {
          temp.push(i)
        }

        filter = temp
        temp = []
      }

      if (this.filter.layout !== '') {
        for (let i of filter.filter(img => this.filter.layout === img.layout)) {
          temp.push(i)
        }

        filter = temp
        temp = []
      }

      if (this.filter.format !== '') {
        for (let i of filter.filter(img => this.filter.format === img.format)) {
          temp.push(i)
        }

        filter = temp
        temp = []
      }

      if (this.filter.greeting !== '' && this.greetings.length > 1) {
        for (let i of filter.filter(img => this.filter.greeting === img.greeting)) {
          temp.push(i)
        }

        filter = temp
        temp = []
      }

      for (let f of filter) {
        temp.push(f.link)
      }

      this.filter.images = filter
    },
    generate_links () {
      let links = []

      this.reset_filter()

      switch (this.prodkind) {
        case 'AIO':
          this.links.array = this.layout_AIO()
          break
        case 'BLB':
          this.links.array = this.layout_BLB()
          break
        case 'FPC':
          this.links.array = this.layout_FPC()
          break
        case 'HFM':
          this.links.array = this.layout_HFM()
          break
        case 'FHB':
        case 'HFS':
          this.links.array = this.layout_FHB_HFS()
          break
        case 'HSM':
          this.links.array = this.layout_HSM()
          break
        case 'HLW':
          this.links.array = this.layout_HLW()
          break
        case 'HCP':
        case 'HNP':
        case 'HNY':
        case 'HYC':
          this.links.array = this.layout_HCP_HNP_HNY_HYC()
          break
        case 'HMC':
          this.links.array = this.layout_HMC()
          break
        case 'HPC':
          this.links.array = this.layout_HPC()
          break
        default: return
      }

      for (let link of this.links.array) {
        links.push(link.link)
      }

      this.links.string = links.toString().replace(/,/g, '\n')
      this.filter.images = this.links.array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .product-image {
    margin: 0 auto;
    height: 200px;
  }

  .label {
    margin-bottom: 0;
  }

  .input-links {
    position: relative;
    width: 100%;

    > .btn-copy {
      position: absolute;
      right: 0;
      bottom: 5px;

      &[disabled] {
        background-color: darken(#fff, 12%);
      }
    }

    textarea {
      max-height: 90px;
    }
  }

  .select-filter {
    width: auto;

    + .select-filter {
      margin-left: 10px;
    }
  }

  .btn-filter {
    margin-top: 14px;
  }

  .img-container {
    margin-bottom: 8px;

    > a {
      width: 100%;
    }
  }
</style>
