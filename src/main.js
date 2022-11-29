import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { io } from "socket.io-client";

import "./assets/main.css";

const socket = io.connect("https://socket-codechit.herokuapp.com"); // Establish the connection

const app = createApp(App);

app.use({
  install(app) {
    app.config.globalProperties.$socket = socket;
  },
});

app.use(router);

app.mount("#app");
