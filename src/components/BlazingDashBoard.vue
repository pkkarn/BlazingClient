<template>
  <div id="blaze">
    <div class="player" v-for="player in boardCopy" :key="player.username">
      <span>{{ player.username }}</span>

      <li
        class="cards"
        :style="colorSelection(card)"
        v-for="(card, index) in player.cards"
        :key="card"
      >
        {{ card.code }} - {{ card.value }} - {{ color[card.color] }} -
        {{ card.color }}
        <button
          @click="setCard(card, index)"
          v-if="matchCard(card, player.username)"
        >
          Match
        </button>
      </li>
      <div
        class="status"
        :class="{ active: activePlayer.username === player.username }"
      >
        <button @click="pass">Pass</button>
      </div>
    </div>
    <div>
      <div class="card" :style="colorSelection(activeCard)">
        <h2>{{ activeCard.value }}</h2>
      </div>

      <button @click="getCard">Fetch Card</button>
    </div>
  </div>
</template>

<script>
import Blaze from "blazing8s";
export default {
  data() {
    return {
      game: {
        activePlayer: {
          username: null,
        },
        activeCard: {
          color: 0,
          code: 0,
          value: null,
        },
      },
      boardCopy: {},
      color: ["red", "green", "blue", "yellow"],
      num: 0,
    };
  },

  mounted() {
    this.game = new Blaze.BlazingBoard([
      "Naruto",
      "Sasuke",
      "Sakura",
      "Hinata",
    ]);

    console.log(this.game.activeCard);

    this.copyBoard();
  },

  computed: {
    activeCard() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.game.activeCard;
    },

    activePlayer() {
      return this.game.activePlayer;
    },
  },

  methods: {
    setCard(card, pos) {
      console.log(card, pos);
      this.game.setCard(card, pos);
      this.copyBoard();
    },

    getCard() {
      this.game.fetchCard();
      this.copyBoard();
    },

    pass() {
      this.game.pass();
      this.copyBoard();
    },
    matchCard(card, username) {
      let currentUser = this.activePlayer.username === username;
      let validMatch =
        currentUser &&
        (card.code === 14 ||
          card.color === this.activeCard.color ||
          card.code === this.activeCard.code);
      return validMatch;
    },
    colorSelection(card) {
      let styleObj = {
        background: this.color[card.color],
        opacity: 0.6,
        color: "#fff",
      };
      if (card.color === 3) styleObj.color = "#333";
      console.log(styleObj);
      return styleObj;
    },
    addNum() {
      console.log(this.num);
      this.num++;
    },
    copyBoard() {
      let curr = this.game.firstPlayer;
      while (curr) {
        console.log(curr);
        let temp = {};
        temp.username = curr.username;
        temp.cards = curr.cards;
        temp.status = curr.status;

        this.boardCopy[temp.username] = temp;
        curr = curr.next;
      }
    },
  },
};
</script>

<style scoped>
#blaze {
  font-family: "Open Sans", sans-serif;
  display: flex;
}
.player {
  border: 2px solid #333;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cards {
  list-style-type: none;
  height: 50px;
}

.card {
  width: 300px;
  height: 400px;
  border: 1px solid;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
}

.active {
  background-color: greenyellow;
}

.status {
  width: 100%;
  height: 10px;
}
</style>
