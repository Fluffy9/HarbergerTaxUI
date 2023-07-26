<template>
    <div class="text-dark">
        <h2 class="text-white text-left">Scenario Generator</h2>
        <br>
        <b-alert variant="primary"  :show="Boolean(activeCase['id'])">
            <b-row>
                <!-- <b-col cols="1">
                    <b-btn variant="primary" block class="h-100">
                        <BIconCaretLeftFill></BIconCaretLeftFill>
                    </b-btn>
                </b-col> -->
                <b-col>
                    <h3>{{ activeCase.name }}</h3>
                    <p class="text-left" v-if="Boolean(activeCase['id'])"><VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section4/Cases/Case${activeCase['id']}.md`).default" flavor="github" :options="{ emoji: true }" /></p>
                </b-col>
                <!-- <b-col>
                    <div v-for="c,index in activeCases.length" v-if="activeCases[index]['active']">
                        <h3>{{ activeCases[index].name }}</h3>
                        <p class="text-left"><VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section4/Cases/Case${index+1}.md`).default" flavor="github" :options="{ emoji: true }" /></p>
                        <hr v-show="activeCases.length > 1 && index < activeCases.length-2">
                    </div>
                </b-col> -->
                <!-- <b-col cols="1">
                    <b-btn variant="primary" block class="h-100">
                        <BIconCaretRightFill></BIconCaretRightFill>
                    </b-btn>
                </b-col> -->
            </b-row>
        </b-alert>
        <br>
        <b-pagination
            v-model="pagination.currentPage"
            :total-rows="pagination.rows"
            :per-page="pagination.perPage"
            aria-controls="my-table"
            :limit="10"
            align="fill"
        ></b-pagination>
        <br>
        <b-card-group>
            <b-card>
                <Bar id="hamburger-chart" :options="HamburgerChart.chartOptions" :data="chartData"></Bar>
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
                Adjustment Percentage: <br> {{ adjustmentPercentage }} = (({{this.SlidingScale.TurnoverRate}} - {{this.SlidingScale.TaxRate}})/abs({{ this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate }})) * ((2^abs({{ this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate }})) -1) * 0.05 
                <br>Top Bun: <br> {{ chartData.datasets[1].data }} = 100 - 10 - {{adjustmentPercentage}}
                <br>Middle Bun: <br> 10
                <br>Bottom Bun: <br> 
                <br>{{ chartData.datasets[2].data }}= (100 - 10)*round(0.5+{{ adjustmentPercentage }})
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
        selfAssessedValue: 10,
        turnoverForce: 45,
        pagination: {
            currentPage: 1,
            rows: 10,
            perPage: 1,
        },
        HamburgerChart: {
            chartOptions: {
                plugins: {
                    stacked100: { enable: true }
                }
            },
            // chartData: {
            //     labels: ["500K"],
            //     datasets: [
            //         { label: "Turnover Force", data: [45], backgroundColor: "rgba(255, 180, 98, .6)"},
            //         { label: "Self-Assessed Value", data: [10], backgroundColor: "rgba(215, 100, 93, .6)"},
            //         { label: "Tax Force", data: [45], backgroundColor: "rgba(255, 180, 98, .6)" },
            //     ]
            // }
        },
        SlidingScale: {
            TaxRate: 0,
            TurnoverRate: 0
        },
        activeCases: [
            {id: 5, name: "Tax Rate is 0", importance: 10, active: false},
            {id: 6, name: "Tax Rate is 100", importance: 9, active: false},
            {id: 7, name: "Turnover Rate is 0", importance: 8, active: false},
            {id: 8, name: "Turnover Rate is 100", importance: 7, active: false},
            {id: 4, name: "Turnover Rate is low", importance: 6, active: false},
            {id: 1, name: "Tax Rate = Turnover Rate", importance: 5, active: false},
            {id: 2, name: "Tax Rate < Turnover Rate", importance: 4, active: false},
            {id: 3, name: "Turnover Rate < Tax Rate", importance: 3, active: false},
        ],
        activeCase: []
      }
    },
    computed: {
        adjustmentPercentage(){
            let diff = this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate
            return ((diff / Math.abs(diff)) * ((2**Math.abs(diff)) -1) * 0.05 || 0)
        },
        chartData(){
            let middle = 10
            let bottom = (100 - middle)*Math.round(0.5+this.adjustmentPercentage)
            let top = 100 - middle - bottom
            console.log(`Top: ${top}, Middle: ${middle}, Bottom: ${bottom}`)
            return {
                labels: ["500K"],
                datasets: [
                    { label: "Turnover Force", data: [top], backgroundColor: "rgba(255, 180, 98, .6)"},
                    { label: "Self-Assessed Value", data: [middle], backgroundColor: "rgba(215, 100, 93, .6)"},
                    { label: "Tax Force", data: [bottom], backgroundColor: "rgba(255, 180, 98, .6)" },
                ]
            }
        }, 
    },
    watch: {
        SlidingScale: {
            handler(val) {
                let results = this.checkCases()
                this.activeCases = this.activeCases.map(x => { return {...x, ...{active: results.filter(y => y?.name == x.name)[0]?.active || false} } })
                this.activeCase = this.activeCases.filter(cases => cases.active)
                this.activeCase = this.activeCases.length > 0 ? this.activeCase.reduce((max, cases) => max.importance > cases.importance ? max : cases) : []
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
        this.activeCases = this.activeCases.map(x => { return {...x, ...{active: results.filter(y => y?.name == x.name)[0]?.active || false} } })
        this.activeCase = this.activeCases.filter(cases => cases.active)
        this.activeCase = this.activeCases.length > 0 ? this.activeCase.reduce((max, cases) => max.importance > cases.importance ? max : cases) : []

    }
  }
  </script>