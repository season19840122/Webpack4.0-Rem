<template>
  <div class="index" >
    <Header v-cloak/>
    <Home v-cloak/>
    <Modal :currentModal="currentModal" v-cloak/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@components/Header';
import Home from './Home';
import Modal from '@components/Modal-lolskin';

export default {
  name: 'index',
  components: {
    Header,
    Home,
    Modal
  },
  computed: {
    ...mapGetters(['currentModal'])
  },
  methods: {
    init(){
      this.resize();
      window.onresize = () => {
        this.resize();
      };
    },
    resize(){
      var fontSize = (document.documentElement.clientWidth || document.body.clientWidth) / 10;
      if(fontSize < 102.4) {
        fontSize = 102.4;
      }
      // alert(fontSize);
      document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
    }
  },
  mounted () {
    this.init();
  }
};
</script>

<style lang="scss">
</style>
