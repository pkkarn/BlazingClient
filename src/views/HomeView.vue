<template>
  <div class="main">
    <div class="main__detail">
      <h2>Enter Detail and Select Room -> {{ this.$store.state.count }}</h2>
      <form @submit.prevent>
        <input
          placeholder="Enter your username"
          class="main__detail-input"
          type="text"
          v-model="username"
        />
        <div class="selected_room">
          {{ selectedRoomDetail.name }} Members:
          <span v-for="member in selectedRoomDetail.members" :key="member">{{
            member
          }}</span>
        </div>
        <button @click="enterRoom" class="enter_room" type="submit">
          Enter
        </button>
      </form>
    </div>
    <div class="main__rooms">
      <li
        class="main__rooms-room"
        @click="updateSelectedRoom(room.id)"
        v-for="room in otherRooms"
        :key="room.id"
      >
        <span>{{ room.name }}</span>
        <br />
        <span class="members"
          >Total Members - {{ totalMembers(room.members) }}</span
        >
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
      username: "",
      selectedRoom: "3034",
    };
  },

  mounted() {
    this.$socket.on("load_room", (data) => {
      this.rooms = data;
    });
  },

  computed: {
    otherRooms() {
      return this.rooms.filter((room) => room.id !== this.selectedRoom);
    },

    selectedRoomDetail() {
      return (
        this.rooms.filter((room) => room.id === this.selectedRoom)[0] || {
          name: "test",
        }
      );
    },
  },

  methods: {
    enterRoom() {
      this.$store.dispatch("setUserDetail", {
        username: this.username,
        room: this.selectedRoom,
      });
      this.$router.push({ name: "blaze" });
    },
    totalMembers(room) {
      return room.length;
    },
    updateSelectedRoom(id) {
      this.selectedRoom = id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/variables";
.main {
  display: flex;
  justify-content: space-between;

  &__rooms {
    &-room {
      list-style-type: none;
      transition: all 0.2s;
      @include neoEffect;

      .members {
        font-size: 70%;
      }

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }

  &__detail {
    background: $secondary-color;
    flex-grow: 1;
    padding: 40px;
    margin: 20px 0;
    margin-right: 30px;
    border-radius: 10px;

    &-input {
      width: 97%;
      border-radius: 10px;
      border: none;
      padding: 10px;
      font-family: $font-family;
      &:focus {
        border: none;
      }
    }
  }

  .enter_room {
    cursor: pointer;
    border: none;
    margin: 10px 0;
    color: $font-color;
    font-family: $font-family;
    background: $primary-color;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
  }

  .selected_room {
    // @include neoEffect;
    @include secondaryNeo;
    margin: 10px 0;
    height: 40%;
  }
}
</style>
