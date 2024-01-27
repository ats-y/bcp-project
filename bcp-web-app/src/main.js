import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { getLoginUserStore, loginUserStoreKey } from "./stores/LoginUserStore";
import { router } from "./router";

// Vuetify
const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);

// ルーターの導入。
app.use(router);

// ログインユーザストアをアプリケーションレベルのProvideとして登録する。
app.provide(loginUserStoreKey, getLoginUserStore());

app.mount("#app");
