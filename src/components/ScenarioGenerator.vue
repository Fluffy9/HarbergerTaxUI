<template>
  <div
    class="text-dark shadow p-4"
    style="border-radius: 5px; border: solid 1px"
  >
    <h2 class="text-white text-left">Josh's Burger Shop</h2>

    <br />
    <p class="text-left text-white">
      Play with the sliders to explore how the relationship between
      <a
        v-b-tooltip.hover.top="
          `Owners pay X% of their SAV in taxes to the state each year.
Higher tax levels push Josh's SAV down.`
        "
        class="Tooltip Tooltip-light"
        >Tax Rate</a
      >
      and
      <a
        v-b-tooltip.hover.top="
          `Turnover Rate: the percentage of assets that exchange ownership in a year.
Higher turnover rates (demand) push Josh's SAV up.`
        "
        class="Tooltip Tooltip-light"
        >Turnover Rate</a
      >
      changes Josh's Self-Assessed Valuation for his Burger Shop.
    </p>
    <br />
    <b-alert variant="primary" :show="Boolean(activeCase['id'])">
      <b-row>
        <b-col class="scenario-generator">
          <h3>{{ activeCase.name }}</h3>
          <p class="text-left" v-if="Boolean(activeCase['id'])">
            <VueShowdown
              class="text-left"
              :markdown="
                require(`@/assets/custom/docs/Section4/Cases/Case${activeCase['id']}.md`)
                  .default
              "
              flavor="github"
              :options="{ emoji: true }"
            />
          </p>
          <a
            class="Tooltip Example"
            v-b-tooltip.hover.top="
              require(`@/assets/custom/docs/Section4/Cases/Example${activeCase['id']}.md`)
                .default
            "
            v-if="Boolean(activeCase['id'])"
          >
            <VueShowdown
              :markdown="
                require(`@/assets/custom/docs/Section4/Cases/Link${activeCase['id']}.md`)
                  .default
              "
              flavor="github"
              :options="{ emoji: true }"
            />
          </a>
        </b-col>
      </b-row>
    </b-alert>
    <b-pagination
      v-model="pagination.currentPage"
      :total-rows="pagination.rows"
      :per-page="pagination.perPage"
      :limit="10"
      align="fill"
    ></b-pagination>
    <b-card-group class="scenario-slider-wrapper">
      <b-card class="scenario-slider">
        <b-form-group
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            :label="`Tax Rate ${Math.round(SlidingScale.TaxRate * 100)}%:`"
            label-for="TaxRate"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="TaxRate"
              v-model="SlidingScale.TaxRate"
              type="range"
              min="0"
              max="1"
              step=".01"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :label="`Turnover Rate ${Math.round(
              SlidingScale.TurnoverRate * 100
            )}%:`"
            label-for="TurnoverRate"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="TurnoverRate"
              v-model="SlidingScale.TurnoverRate"
              type="range"
              min="0"
              max="1"
              step=".01"
            ></b-form-input>
          </b-form-group>
          <!-- <div style="display: none;"> -->
          <!-- <div>
            Adjustment Percentage: <br />
            {{ adjustmentPercentage }} = (({{
              this.SlidingScale.TurnoverRate
            }}
            - {{ this.SlidingScale.TaxRate }})/abs({{
              this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate
            }})) * ((2^abs({{
              this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate
            }})) -1) * 0.5 <br />Top Bun: <br />
            {{ chartData.datasets[0].data }} = 100 - 10 -
            {{ chartData.datasets[2].data }} <br />Middle Bun: <br />
            10 <br />Bottom Bun: <br />
            <br />{{ chartData.datasets[2].data }}= (100 - 10)*(0.5+{{
              adjustmentPercentage
            }})
          </div> -->
        </b-form-group>
      </b-card>
      <b-card class="scenario-slider">
        <div class="burger-wrapper">
          <div
            class="burger-top"
            :style="{
              height:
                edgeCases.top !== null
                  ? edgeCases.top + 'px'
                  : chartData.datasets[0].data + 'px',
            }"
          >
            <a
              v-b-tooltip.hover.top="
                'The higher the tax rate, the greater the downward force'
              "
              class="Tooltip Tooltip-Arrow-Down"
              >Tax rate</a
            >
          </div>

          <div
            class="burger-middle-2 Tooltip"
            :style="{ height: 10 + 'px' }"
          ></div>
          <div
            class="burger-middle"
            :style="{
              height: chartData.datasets[1].data - 10 + 'px',
            }"
            v-b-tooltip.hover.top="`His SAV is his 'for sale' price`"
          >
            <a class="Tooltip">
              Josh's SAV: $
              {{
                edgeCases.sav !== null
                  ? edgeCases.sav
                  : Math.round(1000 * (0.5 + adjustmentPercentage))
              }}K
            </a>
          </div>
          <div
            class="burger-bottom"
            :style="{
              height:
                edgeCases.bottom !== null
                  ? edgeCases.bottom + 'px'
                  : chartData.datasets[2].data + 'px',
            }"
          >
            <a
              v-b-tooltip.hover.top="
                'Higher turnover rates mean higher demand and a larger upward force'
              "
              class="Tooltip Tooltip-Arrow-Up"
              >Turnover rate</a
            >
          </div>
        </div>
      </b-card>
      <br />
      <br />
    </b-card-group>
    <b-row>
      <b-col class="text-white">
        <br />
        <h3 class="text-left">TLDR</h3>
        <p class="text-left">
          To <b>maximise total welfare</b>, governments should set the tax rate
          below the turnover rate. This balances individual investment
          incentives and allocative efficiency.
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BIconCaretLeftFill, BIconCaretRightFill } from "bootstrap-vue";
import { Bar, mixins } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartjsPluginStacked100
);

export default {
  name: "BarChart",
  components: {
    BIconCaretLeftFill,
    BIconCaretRightFill,
    Bar,
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
            stacked100: { enable: true },
          },
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
        TaxRate: 0.1,
        TurnoverRate: 0.1,
      },
      activeCases: [
        {
          id: 5,
          name: "Tax Rate = 0%",
          importance: 10,
          active: false,
          preset: { taxRate: 0, turnoverRate: 0.1 },
        },
        {
          id: 6,
          name: "Tax Rate = 100%",
          importance: 9,
          active: false,
          preset: { taxRate: 1.0, turnoverRate: 0.1 },
        },
        {
          id: 7,
          name: "Turnover Rate = 0%",
          importance: 8,
          active: false,
          preset: { taxRate: 0.1, turnoverRate: 0 },
        },
        {
          id: 8,
          name: "Turnover Rate = 100%",
          importance: 7,
          active: false,
          preset: { taxRate: 0.1, turnoverRate: 1.0 },
        },
        {
          id: 4,
          name: "Turnover Rate is very low",
          importance: 6,
          active: false,
          preset: { taxRate: 0.1, turnoverRate: 0.01 },
        },
        {
          id: 1,
          name: "Tax Rate = Turnover Rate",
          importance: 5,
          active: false,
          preset: { taxRate: 0.1, turnoverRate: 0.1 },
        },
        {
          id: 2,
          name: "Tax Rate < Turnover Rate",
          importance: 4,
          active: false,
          preset: { taxRate: 0.1, turnoverRate: 0.5 },
        },
        {
          id: 3,
          name: "Turnover Rate < Tax Rate",
          importance: 3,
          active: false,
          preset: { taxRate: 0.5, turnoverRate: 0.1 },
        },
      ],
      activeCase: [],
    };
  },
  computed: {
    edgeCases() {
      let containerHeight = 250;
      let middle = 40;

      let tax0 = this.SlidingScale.TaxRate === 0;
      let turn0 = this.SlidingScale.TurnoverRate === 0;
      let turn100 = this.SlidingScale.TurnoverRate === 1;

      if (tax0) {
        // Calculate variables specific to the tax0 edge case
        let top = 0; // Example calculation
        let bottom = containerHeight - middle; // Example calculation
        let sav = "1000";

        return { top, bottom, sav };
      }
      if (turn0) {
        // Calculate variables specific to the tax0 edge case
        let top = containerHeight - middle; // Example calculation
        let bottom = 0; // Example calculation
        let sav = "1";

        return { top, bottom, sav };
      }
      if (turn100) {
        // Calculate variables specific to the tax0 edge case
        let top = 0; // Example calculation
        let bottom = containerHeight - middle; // Example calculation
        let sav = "1000";

        return { top, bottom, sav };
      }
      return { top: null, bottom: null, sav: null };
    },

    adjustmentPercentage() {
      let diff = this.SlidingScale.TurnoverRate - this.SlidingScale.TaxRate;
      return (diff / Math.abs(diff)) * (2 ** Math.abs(diff) - 1) * 0.5 || 0;
    },

    chartData() {
      let containerHeight = 250;
      let middle = 40;
      let bottom =
        (containerHeight - middle) * (0.5 + this.adjustmentPercentage);
      let top = containerHeight - middle - bottom;
      console.log(`Top: ${top}, Middle: ${middle}, Bottom: ${bottom}`);

      return {
        labels: ["Percentage"],
        datasets: [
          {
            label: "Turnover Force",
            data: [Math.round(top)],
            backgroundColor: "rgba(255, 180, 98, .6)",
          },
          {
            label: "Self-Assessed Value",
            data: [Math.round(middle)],
            backgroundColor: "rgba(215, 100, 93, .6)",
          },
          {
            label: "Tax Force",
            data: [Math.round(bottom)],
            backgroundColor: "rgba(255, 180, 98, .6)",
          },
        ],
      };
    },
  },
  watch: {
    pagination: {
      handler(val) {
        this.setPreset(val.currentPage);
      },
      deep: true,
    },
    SlidingScale: {
      handler(val) {
        this.setActiveCase();
        this.setPagination(val);
      },
      deep: true,
    },
  },
  methods: {
    setPagination(scale) {
      let preset = this.activeCases.filter(
        (x) =>
          scale.TaxRate == x.preset.taxRate &&
          scale.TurnoverRate == x.preset.turnoverRate
      );
      if (preset.length > 0) {
        this.pagination.currentPage = preset[0].id;
      }
    },
    setPreset(id) {
      //   debugger;
      let current = this.activeCases.find((x) => x.id == id);
      this.SlidingScale.TaxRate = current.preset.taxRate;
      this.SlidingScale.TurnoverRate = current.preset.turnoverRate;
      this.setActiveCase();
    },
    setActiveCase() {
      let results = this.checkCases();
      this.activeCases = this.activeCases.map((x) => {
        return {
          ...x,
          ...{
            active:
              results.filter((y) => y?.name == x.name)[0]?.active || false,
          },
        };
      });
      this.activeCase = this.activeCases.filter((cases) => cases.active);
      this.activeCase =
        this.activeCases.length > 0
          ? this.activeCase.reduce((max, cases) =>
              max.importance > cases.importance ? max : cases
            )
          : [];
    },
    checkCases() {
      let results = [];
      if (this.SlidingScale.TaxRate == this.SlidingScale.TurnoverRate) {
        results.push({ name: "Tax Rate = Turnover Rate", active: true });
      }
      if (this.SlidingScale.TaxRate < this.SlidingScale.TurnoverRate) {
        results.push({ name: "Tax Rate < Turnover Rate", active: true });
      }
      if (this.SlidingScale.TurnoverRate < this.SlidingScale.TaxRate) {
        results.push({ name: "Turnover Rate < Tax Rate", active: true });
      }
      if (this.SlidingScale.TurnoverRate < 0.02) {
        results.push({ name: "Turnover Rate is very low", active: true });
      }
      if (this.SlidingScale.TaxRate == 0) {
        results.push({ name: "Tax Rate = 0%", active: true });
      }
      if (this.SlidingScale.TaxRate == 1.0) {
        results.push({ name: "Tax Rate = 100%", active: true });
      }
      if (this.SlidingScale.TurnoverRate == 0) {
        results.push({ name: "Turnover Rate = 0%", active: true });
      }
      if (this.SlidingScale.TurnoverRate == 1.0) {
        results.push({ name: "Turnover Rate = 100%", active: true });
      }
      return results;
    },
  },
  mounted() {
    // this.addPlugin([ChartjsPluginStacked100]),
    // this.renderChart(this.HamburgerChart.chartData, this.HamburgerChart.chartData.options)
    this.setActiveCase();
  },
};
</script>
