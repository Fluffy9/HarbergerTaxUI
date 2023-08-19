<template>
    <div class="text-dark shadow p-4" style="border-radius: 5px; backdrop-filter: blur(10px); background-color: #ffffff26; border: solid 1px;">
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
                    <div style="min-height: 150px; max-height: 150px;">
                        <h3>{{ activeCase.name }}</h3>
                        <p class="text-left" v-if="Boolean(activeCase['id'])"><VueShowdown class="text-left" :markdown="require(`@/assets/custom/docs/Section4/Cases/Case${activeCase['id']}.md`).default" flavor="github" :options="{ emoji: true }" /></p>
                        <br>

                    </div>
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
                <b-pagination
                    v-model="pagination.currentPage"
                    :total-rows="pagination.rows"
                    :per-page="pagination.perPage"
                    :limit="10"
                    align="fill"
                ></b-pagination>
        <br>
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
                  :label="`Tax Rate ${Math.round(SlidingScale.TaxRate*100)}%:`"
                  label-for="TaxRate"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input id="TaxRate" v-model="SlidingScale.TaxRate" type="range" min="0" max="1" step=".01"></b-form-input>
                </b-form-group>

                <b-form-group
                  :label="`Turnover Rate ${Math.round(SlidingScale.TurnoverRate*100)}%:`"
                  label-for="TurnoverRate"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input id="TurnoverRate" v-model="SlidingScale.TurnoverRate" type="range"  min="0" max="1" step=".01"></b-form-input>
                </b-form-group>
                <div style="display: none;">
                    Adjustment Percentage: <br> {{ adjustmentPercentage }} = (({{this.SlidingScale.TurnoverRate}} - {{this.SlidingScale.TaxRate}})/abs({{ this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate }})) * ((2^abs({{ this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate }})) -1) * 0.5 
                    <br>Top Bun: <br> {{ chartData.datasets[0].data }} = 100 - 10 - {{chartData.datasets[2].data}}
                    <br>Middle Bun: <br> 10
                    <br>Bottom Bun: <br> 
                    <br>{{ chartData.datasets[2].data }}= (100 - 10)*(0.5+{{ adjustmentPercentage }})

                </div>
                </b-form-group>

            </b-card>
            <br>
            <b-row>
                <b-col class="text-white">
                    <br>
                    <h3 class="text-left">TLDR</h3>
                    <p class="text-left">
                        What's the key take away?
                        Governments should set the tax rate below the turnover rate to optimize total welfare, balancing individual investment incentives and allocatable efficiency.
                    </p>
                </b-col>
            </b-row>
            <br>
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
            rows: 8,
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
            {id: 5, name: "Tax Rate is 0", importance: 10, active: false, preset: {taxRate: 0, turnoverRate: 0.10}},
            {id: 6, name: "Tax Rate is 100", importance: 9, active: false, preset: {taxRate: 1.00, turnoverRate: 0.10}},
            {id: 7, name: "Turnover Rate is 0", importance: 8, active: false, preset: {taxRate: 0.10, turnoverRate: 0}},
            {id: 8, name: "Turnover Rate is 100", importance: 7, active: false, preset: {taxRate: 0.10, turnoverRate: 1.00}},
            {id: 4, name: "Turnover Rate is low", importance: 6, active: false, preset: {taxRate: 0.10, turnoverRate: .01}},
            {id: 1, name: "Tax Rate = Turnover Rate", importance: 5, active: false, preset: {taxRate: 0.10, turnoverRate: 0.10}},
            {id: 2, name: "Tax Rate < Turnover Rate", importance: 4, active: false, preset: {taxRate: 0.10, turnoverRate: 0.50}},
            {id: 3, name: "Turnover Rate < Tax Rate", importance: 3, active: false, preset: {taxRate: 0.50, turnoverRate: 0.10}},
        ],
        activeCase: []
      }
    },
    computed: {
        adjustmentPercentage(){
            let diff = this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate
            return ((diff / Math.abs(diff)) * ((2**Math.abs(diff)) -1) * 0.5 || 0)
        },
        chartData(){
            let middle = 10
            let bottom = (100 - middle)*(0.5+this.adjustmentPercentage)
            let top = 100 - middle - bottom
            console.log(`Top: ${top}, Middle: ${middle}, Bottom: ${bottom}`)
            return {
                labels: ["Percentage"],
                datasets: [
                    { label: "Turnover Force", data: [Math.round(top)], backgroundColor: "rgba(255, 180, 98, .6)"},
                    { label: "Self-Assessed Value", data: [Math.round(middle)], backgroundColor: "rgba(215, 100, 93, .6)"},
                    { label: "Tax Force", data: [Math.round(bottom)], backgroundColor: "rgba(255, 180, 98, .6)" },
                ]
            }
        }, 
    },
    watch: {
        pagination: {
            handler(val){
                this.setPreset(val.currentPage)
            }, 
            deep: true
        },
        SlidingScale: {
            handler(val) {
                this.setActiveCase()
                this.setPagination(val)
            },
            deep: true
        }
    },
    methods: {
        setPagination(scale){
            let preset = this.activeCases.filter(x => scale.TaxRate == x.preset.taxRate && scale.TurnoverRate == x.preset.turnoverRate)
            if(preset.length > 0){
                this.pagination.currentPage = preset[0].id
            }
        },
        setPreset(id){
            let current = this.activeCases.find(x => x.id == id)
            this.SlidingScale.TaxRate = current.preset.taxRate
            this.SlidingScale.TurnoverRate = current.preset.turnoverRate
            this.setActiveCase()
        },
        setActiveCase(){
            let results = this.checkCases()
            this.activeCases = this.activeCases.map(x => { return {...x, ...{active: results.filter(y => y?.name == x.name)[0]?.active || false} } })
            this.activeCase = this.activeCases.filter(cases => cases.active)
            this.activeCase = this.activeCases.length > 0 ? this.activeCase.reduce((max, cases) => max.importance > cases.importance ? max : cases) : []

        },
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
            if(this.SlidingScale.TurnoverRate < .02){
                results.push({name: "Turnover Rate is low", active:true})
            }
            if(this.SlidingScale.TaxRate == 0 ){
                results.push({name: "Tax Rate is 0", active:true})
            }
            if(this.SlidingScale.TaxRate == 1.00){
                results.push({name: "Tax Rate is 100", active:true})
            }
            if(this.SlidingScale.TurnoverRate == 0){
                results.push({name: "Turnover Rate is 0", active:true})
            }
            if(this.SlidingScale.TurnoverRate == 1.00){
                results.push({name: "Turnover Rate is 100", active:true})
            }   
            return results
        }
    },
    mounted(){

        // this.addPlugin([ChartjsPluginStacked100]),
        // this.renderChart(this.HamburgerChart.chartData, this.HamburgerChart.chartData.options)

        this.setActiveCase()
    }
  }
  </script>
<style scoped>
</style>