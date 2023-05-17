import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VMdEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(store)
    .use(store).use(router).use(VMdEditor).use(VMdPreview).mount('#app')
