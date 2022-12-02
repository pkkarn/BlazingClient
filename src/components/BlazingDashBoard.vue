<template>
  <div id="blaze">
    <div class="player" v-for="player in game.board" :key="player.username">
      <span>{{ player.username }}</span>
      <div v-if="player.username === username">
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
      </div>
      <div v-else>
        <li class="cards" v-for="card in player.cards" :key="card">
          Don't need to know
        </li>
      </div>
      <div
        class="status"
        :class="{ active: activePlayer.username === player.username }"
      >
        <button v-if="isAmActive(player.username)" @click="pass">Pass</button>
      </div>
    </div>
    <div>
      <div class="card" :style="colorSelection(activeCard)">
        <h2>{{ activeCard.value }}</h2>
      </div>

      <button v-if="isAmActive(username)" @click="getCard">Fetch Card</button>

      <div v-if="is8Mode">
        <button
          @click="selectCard(index)"
          v-for="(item, index) in color"
          :key="index"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is8Mode: false,
      chooseColor: 0,
      game: {
        detail: {
          activePlayer: {
            username: null,
          },
          activeCard: {
            color: 0,
            code: 0,
            value: null,
          },
        },
        board: {},
      },
      color: ["red", "green", "blue", "yellow"],
      num: 0,
    };
  },

  mounted() {
    // console.log(this.game.activeCard);
    console.log(this.userDetail);
    this.$socket.emit("start_game", {
      username: this.$store.state.userDetail.username,
      room: this.$store.state.userDetail.room,
    });
    this.username = this.$store.state.userDetail.username;
    this.$socket.on("add_player", (data) => {
      this.game = data.game;
    });

    this.$socket.on("remove_player", (data) => {
      this.game = data.game;
    });

    this.$socket.on("update_board", (data) => {
      this.game = data;
    });
    // this.copyBoard();
  },

  computed: {
    userDetail() {
      return this.$store.state.userDetail;
    },

    activeCard() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.game.detail.activeCard;
    },

    activePlayer() {
      return this.game.detail.activePlayer;
    },
  },

  watch: {
    is8Mode(val) {
      if (!val) {
        this.$socket.emit("set_card", {
          data: {
            card: this.cardDetail[0],
            pos: this.cardDetail[1],
            color: this.chooseColor,
          },
          room: this.userDetail.room,
        });
      }
    },
  },

  methods: {
    isAmActive(username) {
      return (
        this.activePlayer.username === username &&
        this.activePlayer.username === this.username
      ); // naruto === naruto // pkkarn ===
    },
    selectCard(index) {
      this.chooseColor = index;
      this.is8Mode = false;
    },
    setCard(card, pos) {
      if (card.code === 8) {
        this.specialSelection(card, pos);
        return;
      }
      this.$socket.emit("set_card", {
        data: {
          card: card,
          pos: pos,
        },
        room: this.userDetail.room,
      });
    },

    specialSelection(card, pos) {
      this.cardDetail = [card, pos];
      this.is8Mode = true;
    },

    getCard() {
      this.$socket.emit("get_card", this.userDetail.room);
    },

    pass() {
      this.$socket.emit("pass_card", this.userDetail.room);
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
