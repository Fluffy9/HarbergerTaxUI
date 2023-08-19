<template>
  <div>
    <div id="header" class="container pb-5 pattern">
      <b-jumbotron
        class="mt-4 mx-auto"
        style="
          width: 90%;
          background-color: #050f19;
          border-radius: 20px;
          border: solid 5px #f3f3f3;
          transform: rotate(-2deg);
        "
      >
        <template v-slot:header>
          <p class="TitleText">WTF is Partial Common Ownership?</p>
          <p class="TitleTextSub">(and why should I care?)</p>
        </template>
      </b-jumbotron>
    </div>
    <div id="Section1" class="section bg-white">
      <div class="container py-4">
        <b-row>
          <b-col cols="auto">
            <b-badge variant="dark" pill class="p-3">Lesson #1</b-badge>
          </b-col>
          <b-col class="float-left text-left">
            <VueShowdown
              class="text-left"
              :markdown="
                require(`@/assets/custom/docs/Section1/Title.md`).default
              "
              flavor="github"
              :options="{
                emoji: true,
              }"
            />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col class="lesson1-content">
            <b-card
              class="shadow mx-1 custom-card-1"
              style="float: right"
              img-src="@/assets/custom/images/City8.png"
            >
              <template v-slot="footer">
                <small class="text-muted text-left">
                  Partial common ownership is a model for ownership, like
                  private ownership, except assets are always for sale.
                </small>
              </template>
            </b-card>
            <article class="text-left">
              <h3>What is it?</h3>
              <p>
                Partial Common Ownership (PCO) is a model for ownership. It's a
                lot like private ownership but with one major twist:
                <a
                  class="Tooltip"
                  v-b-tooltip.hover.top="
                    'Something valuable that is owned by someone. e.g. forests, copyrights, land, stocks, or real estate'
                  "
                  >Assets</a
                >
                are always for sale!
              </p>
              <p>
                At its core, PCO advocates that assets should benefit both
                individuals and society as a whole, rather than benefiting only
                a single person.
              </p>
              <br />
              <h3>Why do we need it?</h3>
              <p>
                Private ownership has a few problems and partial common
                ownership is the solution.
              </p>
              <p>Click "Next Lesson" to understand what those problems are.</p>
            </article>
          </b-col>
        </b-row>

        <b-button class="float-right my-4" href="#Section2" variant="primary"
          >Next Lesson</b-button
        >
        <br />
      </div>
    </div>
    <div id="Section2" class="section bg-light">
      <div class="container py-4">
        <b-row>
          <b-col cols="auto">
            <b-badge variant="dark" pill class="p-3">Lesson #2</b-badge>
          </b-col>
          <b-col class="float-left text-left">
            <VueShowdown
              class="text-left"
              :markdown="
                require(`@/assets/custom/docs/Section2/Title.md`).default
              "
              flavor="github"
              :options="{
                emoji: true,
              }"
            />
          </b-col>
        </b-row>
        <br />
        <b-row class="section2-flex">
          <article class="text-left section2-art1">
            <h3>How does Private Ownership work?</h3>
            <p>
              Governments sell plots of land to raise money and encourage
              economic growth, which in turn improves the living standards of
              society as a whole.
            </p>
            <p>If you buy a plot of land, you get three main benefits:</p>
            <ul class="letter-list">
              <li>
                <p>The right to use the land</p>
              </li>
              <li>
                <p>The right to exclude others from using it</p>
              </li>
              <li>
                <p>The right to sell it whenever you want</p>
              </li>
            </ul>
            <br />
            <h3>Okay, so what's the problem?</h3>
            <p>
              Part
              <span class="inline-blue">c</span>
              is important here. If you decide to buy land but leave it unused,
              it prevents others from building useful things like businesses,
              parks, or museums that could benefit society.
            </p>
            <p>
              In the example above, your plot of land is unproductive. The land
              could produce more benefit for society if it was owned by someone
              else.
            </p>
            <p>Play this game to understand the limits of Private Ownership.</p>
            <br />
          </article>

          <b-card class="float-right shadow mx-1 section2-game">
            <b-card-header class="p-0 m-0">
              <b-embed
                type="iframe"
                aspect="4by3"
                src="https://itch.io/embed-upload/8530305?color=333333"
                allowfullscreen
              ></b-embed>
            </b-card-header>
            <b-card-text>
              <br />
              <small class="text-muted">
                <p class="text-muted-p2">Click the icon to make full screen.</p>
              </small>
            </b-card-text>
          </b-card>
        </b-row>
        <br />
        <br />
        <b-row class="section2-dropdowns">
          <b-col
            v-for="(sentiment, index) in [false, false, true]"
            :key="index"
          >
            <b-card
              :border-variant="sentiment ? 'success' : 'danger'"
              class="mb-3"
            >
              <b-card-header class="bg-transparent border-0">
                <b-avatar :variant="sentiment ? 'success' : 'danger'"
                  ><BIconHandThumbsUpFill
                    v-if="sentiment"
                  ></BIconHandThumbsUpFill
                  ><BIconHandThumbsDownFill v-else></BIconHandThumbsDownFill
                ></b-avatar>
              </b-card-header>
              <br />
              <VueShowdown
                class="text-left"
                :markdown="
                  require(`@/assets/custom/docs/Section2/Item${
                    index + 1
                  }/Main.md`).default
                "
                flavor="github"
                :options="{
                  emoji: true,
                }"
              />
              <b-collapse
                :id="`collapse-section2-${index}`"
                v-model="collapse.section2[index]"
                class="mt-2"
              >
                <b-alert
                  header="Example"
                  :variant="sentiment ? 'success' : 'danger'"
                  show
                >
                  <VueShowdown
                    class="text-left"
                    :markdown="
                      require(`@/assets/custom/docs/Section2/Item${
                        index + 1
                      }/Collapse.md`).default
                    "
                    flavor="github"
                    :options="{
                      emoji: true,
                    }"
                  />
                </b-alert>
                <br />
              </b-collapse>
              <b-button
                block
                variant="link"
                :class="collapse.section2[index] ? null : 'collapsed'"
                :aria-expanded="collapse.section2[index] ? 'true' : 'false'"
                :aria-controls="`collapse-section2-${index}`"
                @click="toggleCollapse(2, index)"
              >
                <BIconCaretUpFill
                  :class="sentiment ? 'text-success' : 'text-danger'"
                  v-if="collapse.section2[index]"
                ></BIconCaretUpFill>
                <BIconCaretDownFill
                  :class="sentiment ? 'text-success' : 'text-danger'"
                  v-else
                ></BIconCaretDownFill>
              </b-button>
            </b-card>
          </b-col>
        </b-row>
        <br />
        <b-button class="float-right my-4" href="#Section3" variant="primary"
          >Next Lesson</b-button
        >
        <br />
      </div>
    </div>
    <div id="Section3" class="section bg-dark text-white">
      <div class="container py-4">
        <b-row>
          <b-col cols="auto">
            <b-badge variant="light" pill class="p-3">Lesson #3</b-badge>
          </b-col>
          <b-col class="float-left text-left">
            <VueShowdown
              class="text-left"
              :markdown="
                require(`@/assets/custom/docs/Section3/Title.md`).default
              "
              flavor="github"
              :options="{
                emoji: true,
              }"
            />
          </b-col>
        </b-row>
        <br />
        <b-row class="section3-flex">
          <article class="section3-article text-left">
            <p>
              Governments sell plots of land to raise money and encourage
              economic growth, which in turn improves the living standards of
              society as a whole.
            </p>
            <p>If you buy a plot of land, you get two main benefits:</p>
            <ul class="letter-list">
              <li>
                <p>The right to use the land</p>
              </li>
              <li>
                <p>The right to exclude others from using it</p>
              </li>
            </ul>
            <br />

            <p>
              The big difference is that all plots of land must always have a
              for-sale price.
            </p>
            <p>
              Play the game to see how this improves the allocation of land and
              the well-being of everyone.
            </p>
            <br />
          </article>
          <b-card class="float-right shadow mx-1 section3-game">
            <b-card-header class="p-0 m-0">
              <b-embed
                type="iframe"
                aspect="4by3"
                src="https://itch.io/embed-upload/8530355?color=333333"
                allowfullscreen
              ></b-embed>
            </b-card-header>
            <b-card-text>
              <br />
              <small class="text-muted">
                <p class="text-muted-p2">Click the icon to make full screen.</p>
              </small>
            </b-card-text>
          </b-card>
          <br />
        </b-row>
        <br />
        <b-row class="section3-dropdowns">
          <b-col v-for="(sentiment, index) in [true, true, false]" :key="index">
            <b-card
              bg-variant="dark"
              :border-variant="sentiment ? 'success' : 'danger'"
              class="mb-3"
            >
              <b-card-header class="bg-transparent border-0">
                <b-avatar :variant="sentiment ? 'success' : 'danger'"
                  ><BIconHandThumbsUpFill
                    v-if="sentiment"
                  ></BIconHandThumbsUpFill
                  ><BIconHandThumbsDownFill v-else></BIconHandThumbsDownFill
                ></b-avatar>
              </b-card-header>
              <br />
              <VueShowdown
                class="text-left"
                :markdown="
                  require(`@/assets/custom/docs/Section3/Item${
                    index + 1
                  }/Main.md`).default
                "
                flavor="github"
                :options="{
                  emoji: true,
                }"
              />
              <b-collapse
                :id="`collapse-section2-${index}`"
                v-model="collapse.section2[index]"
                class="mt-2"
              >
                <b-alert
                  header="Example"
                  :variant="sentiment ? 'success' : 'danger'"
                  show
                >
                  <VueShowdown
                    class="text-left"
                    :markdown="
                      require(`@/assets/custom/docs/Section3/Item${
                        index + 1
                      }/Collapse.md`).default
                    "
                    flavor="github"
                    :options="{
                      emoji: true,
                    }"
                  />
                </b-alert>
                <br />
              </b-collapse>
              <b-button
                block
                variant="link"
                :class="collapse.section2[index] ? null : 'collapsed'"
                :aria-expanded="collapse.section2[index] ? 'true' : 'false'"
                :aria-controls="`collapse-section2-${index}`"
                @click="toggleCollapse(2, index)"
              >
                <BIconCaretUpFill
                  :class="sentiment ? 'text-success' : 'text-danger'"
                  v-if="collapse.section2[index]"
                ></BIconCaretUpFill>
                <BIconCaretDownFill
                  :class="sentiment ? 'text-success' : 'text-danger'"
                  v-else
                ></BIconCaretDownFill>
              </b-button>
            </b-card>
          </b-col>
        </b-row>
        <b-button class="float-right my-4" href="#Section4" variant="primary"
          >Next Lesson</b-button
        >
        <br />
      </div>
    </div>
    <div id="Section4" class="section position-relative p-0 text-white">
      <div class="pattern-hamburger">
        <div class="container py-4">
          <b-row>
            <b-col cols="auto">
              <b-badge variant="light" pill class="p-3">Lesson #4</b-badge>
            </b-col>
            <b-col class="float-left text-left">
              <VueShowdown
                class="text-left"
                :markdown="
                  require(`@/assets/custom/docs/Section4/Title.md`).default
                "
                flavor="github"
                :options="{
                  emoji: true,
                }"
              />
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col class="section4-top">
              <b-card
                class="shadow mx-1 custom-card-4"
                style="float: right"
                img-src="@/assets/custom/images/ChefBurger.png"
              >
                <template v-slot="footer">
                  <small class="text-muted text-left">
                    Josh's Burger Shop
                  </small>
                </template>
              </b-card>
              <article class="text-left">
                <p>
                  In the game, property owners paid a continual tax based on the
                  self-assessed value of their property. This is known as a
                  harberger tax.
                </p>
                <p>
                  In a harberger tax system, owners of property set a
                  <a
                    class="Tooltip Tooltip-light"
                    v-b-tooltip.hover.top="
                      'The name says it all here. You set the price of your asset.'
                    "
                    >self-assessed value (SAV)</a
                  >
                  . This value is influenced by two key mechanism which act in
                  opposite directions:
                </p>
                <br />
                <h3>1. A Tax on the owner's SAV</h3>

                <p>
                  Owners are incentivised to <b>decrease their SAV</b> to reduce
                  their tax bill.
                </p>

                <h3>2. Owners must sell at their SAV</h3>

                <p>
                  SAV changes as demand changes. An increase in the
                  <a
                    class="Tooltip Tooltip-light"
                    v-b-tooltip.hover.top="
                      `This is the percentage of assets that change ownership in a year. You can think of 'turnover rate' as 'demand'.`
                    "
                    >turnover rate</a
                  >
                  of an asset incentivises owners to
                  <b>increase their SAV</b>.
                </p>
                <br />
                <p>
                  To get a clearer understanding of these mechanisms, consider
                  the following example.
                </p>

                <!-- 
                If you must sell at your self-assessed value and the
                <a
                  class="Tooltip"
                  v-b-tooltip.hover.top="
                    'the demand for assets like yours is high!'
                  "
                  >turnover rate</a
                >
                of assets is high, then you could set a higher price. It's
                important you see these two act in opposite directions... -->
              </article>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col class="scenario-generator-wrapper">
              <div class="background"></div>
              <ScenarioGenerator></ScenarioGenerator>
            </b-col>
          </b-row>

          <br />

          <b-row class="section4-dropdowns">
            <b-col
              v-for="(sentiment, index) in [true, true, false]"
              :key="index"
            >
              <b-card
                bg-variant="dark"
                :border-variant="sentiment ? 'success' : 'danger'"
                class="mb-3"
              >
                <b-card-header class="bg-transparent border-0">
                  <b-avatar :variant="sentiment ? 'success' : 'danger'"
                    ><BIconHandThumbsUpFill
                      v-if="sentiment"
                    ></BIconHandThumbsUpFill
                    ><BIconHandThumbsDownFill v-else></BIconHandThumbsDownFill
                  ></b-avatar>
                </b-card-header>
                <br />
                <VueShowdown
                  class="text-left"
                  :markdown="
                    require(`@/assets/custom/docs/Section4/Item${
                      index + 1
                    }/Main.md`).default
                  "
                  flavor="github"
                  :options="{
                    emoji: true,
                  }"
                />
                <b-collapse
                  :id="`collapse-section2-${index}`"
                  v-model="collapse.section2[index]"
                  class="mt-2"
                >
                  <b-alert
                    header="Example"
                    :variant="sentiment ? 'success' : 'danger'"
                    show
                  >
                    <VueShowdown
                      class="text-left"
                      :markdown="
                        require(`@/assets/custom/docs/Section4/Item${
                          index + 1
                        }/Collapse.md`).default
                      "
                      flavor="github"
                      :options="{
                        emoji: true,
                      }"
                    />
                  </b-alert>
                  <br />
                </b-collapse>
                <b-button
                  block
                  variant="link"
                  :class="collapse.section2[index] ? null : 'collapsed'"
                  :aria-expanded="collapse.section2[index] ? 'true' : 'false'"
                  :aria-controls="`collapse-section2-${index}`"
                  @click="toggleCollapse(2, index)"
                >
                  <BIconCaretUpFill
                    :class="sentiment ? 'text-success' : 'text-danger'"
                    v-if="collapse.section2[index]"
                  ></BIconCaretUpFill>
                  <BIconCaretDownFill
                    :class="sentiment ? 'text-success' : 'text-danger'"
                    v-else
                  ></BIconCaretDownFill>
                </b-button>
              </b-card>
            </b-col>
          </b-row>
          <br />
        </div>
      </div>
    </div>
    <div id="Section5" class="section bg-light">
      <div class="container py-4">
        <b-row>
          <b-col class="float-left text-left">
            <VueShowdown
              class="text-left"
              :markdown="
                require(`@/assets/custom/docs/Section5/Title.md`).default
              "
              flavor="github"
              :options="{
                emoji: true,
              }"
            />
          </b-col>
        </b-row>
        <br />
        <b-row class="section5-dropdowns">
          <b-col v-for="(x, index) in [, , ,]" :key="'usecases-' + index">
            <b-card
              v-if="index < 3"
              bg-variant="light"
              border-variant="info"
              class="mb-3"
            >
              <VueShowdown
                class="text-left"
                :markdown="
                  require(`@/assets/custom/docs/Section5/Item${
                    index + 1
                  }/Main.md`).default
                "
                flavor="github"
                :options="{
                  emoji: true,
                }"
              />
              <b-collapse
                :id="`collapse-section5-${index}`"
                v-model="collapse.section5[index]"
                class="mt-2"
              >
                <VueShowdown
                  class="text-left"
                  :markdown="
                    require(`@/assets/custom/docs/Section5/Item${
                      index + 1
                    }/Collapse.md`).default
                  "
                  flavor="github"
                  :options="{
                    emoji: true,
                  }"
                />
                <br />
              </b-collapse>
              <b-button
                block
                variant="link"
                :class="collapse.section5[index] ? null : 'collapsed'"
                :aria-expanded="collapse.section5[index] ? 'true' : 'false'"
                :aria-controls="`collapse-section5-${index}`"
                @click="toggleCollapse(5, index)"
              >
                <BIconCaretUpFill
                  class="info"
                  v-if="collapse.section5[index]"
                ></BIconCaretUpFill>
                <BIconCaretDownFill class="info" v-else></BIconCaretDownFill>
              </b-button>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
    <div id="Section6" class="section bg-white">
      <div class="container py-4">
        <b-row>
          <b-col class="float-left text-left">
            <VueShowdown
              class="text-left"
              :markdown="
                require(`@/assets/custom/docs/Section6/Title.md`).default
              "
              flavor="github"
              :options="{
                emoji: true,
              }"
            />
          </b-col>
        </b-row>
        <div class="accordion" role="tablist">
          <div v-for="(q, index) in FAQs" :key="`faqs-` + index">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle="`accordion-${index + 1}`"
                  variant="primary"
                >
                  <VueShowdown
                    class="text-center"
                    :markdown="
                      require(`@/assets/custom/docs/Section6/Question${
                        index + 1
                      }/Question.md`).default
                    "
                    flavor="github"
                    :options="{
                      emoji: true,
                    }"
                  />
                </b-button>
              </b-card-header>
              <b-collapse
                :id="`accordion-${index + 1}`"
                :accordion="`accordion-${index + 1}`"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text
                    ><VueShowdown
                      class="text-left"
                      :markdown="
                        require(`@/assets/custom/docs/Section6/Question${
                          index + 1
                        }/Answer.md`).default
                      "
                      flavor="github"
                      :options="{
                        emoji: true,
                      }"
                  /></b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BIconHandThumbsDownFill,
  BIconHandThumbsUpFill,
  BIconCaretDownFill,
  BIconCaretUpFill,
} from "bootstrap-vue";
import ScenarioGenerator from "@/components/ScenarioGenerator.vue";

export default {
  name: "HomeView",
  components: {
    BIconHandThumbsDownFill,
    BIconHandThumbsUpFill,
    BIconCaretDownFill,
    BIconCaretUpFill,
    ScenarioGenerator,
  },
  data() {
    return {
      // The number of FAQ questions
      FAQs: 5,
      collapse: {
        // Whether or not the collapse starts open
        section2: [false, false, false],
        section5: [false, false, false],
      },
    };
  },
  methods: {
    toggleCollapse(section, index) {
      this.$set(
        this.collapse["section" + section],
        index.toString(),
        !this.collapse["section" + section][index]
      );
    },
  },
};
</script>
