<template>
  <div class="mt-4">
    <br>
    <div id="Section1" class="section">
      <div class="container">
        <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section1/Title.md`).default" flavor="github" :options="{ emoji: true }" />
        <br>
        <b-row>
          <b-col class="text-left" cols="6">
            <VueShowdown :markdown="require(`@/assets/custom/docs/Section1/Main.md`).default" flavor="github" :options="{ emoji: true }" />
          </b-col>
          <b-col>
            <b-img rounded fluid cols="6" src="@/assets/custom/images/Section1.png"></b-img>
          </b-col>
        </b-row>
      </div>
    </div>
    <br>
    <div id="Section2" class="section">
      <div class="container">
        <VueShowdown class="text-center" :markdown="require(`@/assets/custom/docs/Section2/Title.md`).default" flavor="github" :options="{ emoji: true }" />
        <br>
        <b-row>
          <b-col class="text-left" cols="4">
            <VueShowdown :markdown="require(`@/assets/custom/docs/Section1/Main.md`).default" flavor="github" :options="{ emoji: true }" />
          </b-col>
          <b-col>
            <b-card
              class="border-0"
              overlay
              img-src="@/assets/custom/images/Section2.png"
              img-alt="Card Image"
              text-variant="white"
            >
              <b-card-text class="container h-100">
                <div class="row align-items-center h-100">
                  <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section2/Caption.md`).default" flavor="github" :options="{ emoji: true }" />
                </div>      
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <br>
        <VueShowdown class="text-center" :markdown="require(`@/assets/custom/docs/Section2/Subheading.md`).default" flavor="github" :options="{ emoji: true }" />
        <br>
        <b-row>
          <b-col v-for="index in 3" :key="index">
            <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section2/Item${index}/Title.md`).default" flavor="github" :options="{ emoji: true }" />
            <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section2/Item${index}/Main.md`).default" flavor="github" :options="{ emoji: true }" />
          </b-col>
        </b-row>
      </div>
    </div>
    <div id="Section3" class="section">
      <div class="container">
        <VueShowdown class="text-center" :markdown="require(`@/assets/custom/docs/Section3/Title.md`).default" flavor="github" :options="{ emoji: true }" />
        <br>
        <b-alert show variant="info">
          <h4 class="alert-heading text-left">Remember!</h4>
          <hr>
          <VueShowdown class="text-left text-info" :markdown="require(`@/assets/custom/docs/Section3/Info.md`).default" flavor="github" :options="{ emoji: true }" />
        </b-alert>
        <br>
        <b-row>
          <b-col class="text-left">
            <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section3/Main.md`).default" flavor="github" :options="{ emoji: true }" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card class="text-dark">
              <b-form-group
                label-cols-lg="3"
                label="Hamberger Sliding Scales"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
              >
                <b-form-group
                  :label="`Tax Rate ${SlidingScale.TaxRate}%:`"
                  label-for="TaxRate"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input id="TaxRate" v-model="SlidingScale.TaxRate" type="range" min="0" max="100"></b-form-input>
                </b-form-group>

                <b-form-group
                  :label="`Turnover Rate ${SlidingScale.TurnoverRate}%:`"
                  label-for="TurnoverRate"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input id="TurnoverRate" v-model="SlidingScale.TurnoverRate" type="range"  min="0" max="100"></b-form-input>
                </b-form-group>

                <b-form-group
                  class="text-left"
                  label=""
                  label-for="Result"
                  label-cols-sm="3"
                  label-align-sm="right"
                  description="Formula: Turnover Rate - Tax Rate ??? IDK"
                >
                  <b-form-input id="Result" disabled :value="SlidingScale.TurnoverRate - SlidingScale.TaxRate"></b-form-input>
                </b-form-group>

              </b-form-group>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
    <div id="Section4" class="section">
      <div class="container">
        <VueShowdown class="text-center" :markdown="require(`@/assets/custom/docs/Section4/Title.md`).default" flavor="github" :options="{ emoji: true }" />
        <br>
        <b-row>
          <b-col>
            <b-card
              class="border-0"
              overlay
              img-src="@/assets/custom/images/Section4.png"
              img-alt="Card Image"
              text-variant="white"
            >
              <b-card-text class="container h-100">
                <div class="row align-items-center h-100">
                  <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section4/Caption.md`).default" flavor="github" :options="{ emoji: true }" />
                </div>      
              </b-card-text>
            </b-card>
          </b-col>
          <b-col>
            <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section4/Main.md`).default" flavor="github" :options="{ emoji: true }" />
          </b-col>
        </b-row>
        <br>
        <VueShowdown class="text-center" :markdown="require(`@/assets/custom/docs/Section4/Subheading.md`).default" flavor="github" :options="{ emoji: true }" />
        <br>
        <b-row>
          <b-col v-for="index in 3" :key="index">
            <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section4/Item${index}/Title.md`).default" flavor="github" :options="{ emoji: true }" />
            <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section4/Item${index}/Main.md`).default" flavor="github" :options="{ emoji: true }" />
          </b-col>
        </b-row>
      </div>
    </div>
    <div id="Section5" class="container section">
      <VueShowdown class="text-center" :markdown="require(`@/assets/custom/docs/Section5/Title.md`).default" flavor="github" :options="{ emoji: true }" />
      <br>
      <VueShowdown class="text-center" :markdown="require(`@/assets/custom/docs/Section5/Main.md`).default" flavor="github" :options="{ emoji: true }" />
      <br>
      <b-row>
        <b-col v-for="index in 3" :key="index">
          <b-card bg-variant="dark">
            <b-card-header>
              <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section5/Item${index}/Title.md`).default" flavor="github" :options="{ emoji: true }" />
            </b-card-header>
            <b-card-body>
              <VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section5/Item${index}/Main.md`).default" flavor="github" :options="{ emoji: true }" />
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { VueShowdown } from 'vue-showdown';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    VueShowdown,
  },
  data() {
    return { 
      SlidingScale: {
        TaxRate: 0,
        TurnoverRate: 0
      }
    }
  }
}

</script>
