import { createApp } from 'vue';
import App from './App.vue';
import SeatmapCanvasPlugin from '../../src/vue';
import '../../src/scss/style.scss';

const app = createApp(App);

app.use(SeatmapCanvasPlugin);

app.mount('#app');
