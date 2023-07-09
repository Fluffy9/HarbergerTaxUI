<template>
    <div class="text-dark">
        <h2 class="text-white text-left">Scenario Generator</h2>
        <br>
        <b-alert variant="primary"  show>
            <b-row>
                <!-- <b-col cols="1">
                    <b-btn variant="primary" block class="h-100">
                        <BIconCaretLeftFill></BIconCaretLeftFill>
                    </b-btn>
                </b-col> -->
                <b-col>
                    <div v-for="c,index in activeCases.length" v-if="activeCases[index]['active']">
                        <h3>{{ activeCases[index].name }}</h3>
                        <p class="text-left"><VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section4/Cases/Case${index+1}.md`).default" flavor="github" :options="{ emoji: true }" /></p>
                        <hr v-show="activeCases.length > 1 && index < activeCases.length-2">
                    </div>
                </b-col>
                <!-- <b-col cols="1">
                    <b-btn variant="primary" block class="h-100">
                        <BIconCaretRightFill></BIconCaretRightFill>
                    </b-btn>
                </b-col> -->
            </b-row>
        </b-alert>
        <br>
        <b-card-group>
            <b-card>
                <Bar id="hamburger-chart" :options="HamburgerChart.chartOptions" :data="HamburgerChart.chartData"></Bar>
                <!-- <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                />                 -->
            </b-card>
            <b-card>
                <b-form-group
                label-cols-lg="3"
                label="Sliding Scales"
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

              </b-form-group>

            </b-card>
        </b-card-group>
    </div>

  </template>
  
  <script>
  import {BIconCaretLeftFill, BIconCaretRightFill } from 'bootstrap-vue'
  import { Bar, mixins } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartjsPluginStacked100)
  


  export default {
    name: 'BarChart',
    components: { 
        BIconCaretLeftFill, 
        BIconCaretRightFill, 
        Bar
    },
    data() {
      return {
        chartData: {
          labels: [ 'January', 'February', 'March' ],
          datasets: [ { data: [40, 20, 12] } ]
        },
        chartOptions: {
          responsive: true
        },
        HamburgerChart: {
            chartOptions: {
                plugins: {
                    stacked100: { enable: true }
                }
            },
            chartData: {
                labels: ["500K"],
                datasets: [
                    { label: "Tax Force", data: [5], backgroundColor: "rgba(255, 180, 98, .6)" },
                    { label: "Self-Assessed Value", data: [15], backgroundColor: "rgba(215, 100, 93, .6)"},
                    { label: "Turnover Force", data: [10], backgroundColor: "rgba(255, 180, 98, .6)"}
                ]
                // labels: ["Foo", "Bar"],
                // datasets: [
                //     { label: "bad", data: [5, 25], backgroundColor: "rgba(244, 143, 177, 0.6)" },
                //     { label: "better", data: [15, 10], backgroundColor: "rgba(255, 235, 59, 0.6)" },
                //     { label: "good", data: [10, 8], backgroundColor: "rgba(100, 181, 246, 0.6)" },
                // ],
            }
        },
        SlidingScale: {
            TaxRate: 0,
            TurnoverRate: 0
        },
        activeCases: [
            {name: "Tax Rate = Turnover Rate", active: false},
            {name: "Tax Rate < Turnover Rate", active: false},
            {name: "Turnover Rate < Tax Rate", active: false},
            {name: "Turnover Rate is low", active: false},
            {name: "Tax Rate is 0", active: false},
            {name: "Tax Rate is 100", active: false},
            {name: "Turnover Rate is 0", active: false},
            {name: "Turnover Rate is 100", active: false}
        ]
      }
    },
    watch: {
        SlidingScale: {
            handler(val) {
                let results = this.checkCases()
                this.activeCases = this.activeCases.map(x => { return {name: x.name, active: results.filter(y => y?.name == x.name)[0]?.active || false } })
            },
            deep: true
        }
    },
    methods: {
        checkCases(){
            let results = []
            if (this.SlidingScale.TaxRate == this.SlidingScale.TurnoverRate){
                results.push({name: "Tax Rate = Turnover Rate", active:true})
            }
            if (this.SlidingScale.TaxRate < this.SlidingScale.TurnoverRate){
                results.push({name: "Tax Rate < Turnover Rate", active:true})
            }
            if (this.SlidingScale.TurnoverRate < this.SlidingScale.TaxRate){
                results.push({name: "Turnover Rate < Tax Rate", active:true})
            }
            if(this.SlidingScale.TurnoverRate < 2){
                results.push({name: "Turnover Rate is low", active:true})
            }
            if(this.SlidingScale.TaxRate == 0 ){
                results.push({name: "Tax Rate is 0", active:true})
            }
            if(this.SlidingScale.TaxRate == 100){
                results.push({name: "Tax Rate is 100", active:true})
            }
            if(this.SlidingScale.TurnoverRate == 0){
                results.push({name: "Turnover Rate is 0", active:true})
            }
            if(this.SlidingScale.TurnoverRate == 100){
                results.push({name: "Turnover Rate is 100", active:true})
            }   
            return results
        }
    },
    mounted(){

        // this.addPlugin([ChartjsPluginStacked100]),
        // this.renderChart(this.HamburgerChart.chartData, this.HamburgerChart.chartData.options)

        let results = this.checkCases()
        this.activeCases = this.activeCases.map(x => { return {name: x.name, active: results.filter(y => y?.name == x.name)[0]?.active || false } })
        console.log(this.activeCases)

    }
  }
  </script>