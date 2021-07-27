<template>
  <div >
    <div id="nav">
      
      <router-link to="/">Home</router-link> 
      <img src="../public/img/icon-above-font.svg" alt="logo" class="logo" @click="()=>{this.$router.push('/')}">
      <router-link to="/sinup" v-if="this.$store.state.user.name == null">sinup</router-link>
      <router-link to="/user" v-else>Profil</router-link>
    </div>
    <div class="BGcoms" v-if="$store.state.etat"  @click="kickComs"></div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods:{
    kickComs(){
        this.$store.commit("kickComs")

    },

  },
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: max-content;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #e2e2e2;
  color: #2c3e50;
  position: relative;
  height: 100%;
}

#nav {
 width: 100%;
  height: min-content;
  display: inline-flex;
  justify-content: center;
  align-items: center;
 margin-bottom: 34px;

  a {
    font-weight: bold;
    color: #2c3e50;
    // margin-top: 60px;
    margin: 60px 60px 0 60px;

   
  }
  .logo{
    height: 200px;
    cursor: pointer;
  }
}
  .BGcoms {
    position: fixed;
    z-index: 2;
    top: 0;
    background: #7070707a;
    width: 100vw;
    height: 100%;
  }
@media (max-width: 425px) {
  #nav{
    flex-flow: wrap ;
    :nth-child(1){
      order: 2;
    }:nth-child(2){
      order: 1;
    }:nth-child(3){
      order: 3;
    }
    img{
      width: 100%;
    }
    a{
      margin: 0;
      flex: 1;
      text-align: center;
      &.router-link-exact-active {
      color: #42b983;
      // border: black solid;
    }
    }
  }
}
</style>
