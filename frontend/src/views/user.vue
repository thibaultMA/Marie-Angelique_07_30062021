<template>
  <div id="user">
    <div class="infoUser">
      <p class="userName">{{ userName }}</p>
      <svg @click="deco" class="logout" version="1.1" viewBox="0 0 128 128"><path d="m60.688 9.7188c-3.0778 0-5.5625 2.4847-5.5625 5.5625v39.906c0 3.0778 2.4847 5.5625 5.5625 5.5625h5.9688c3.0778 0 5.5312-2.4847 5.5312-5.5625v-39.906c0-3.0778-2.4534-5.5625-5.5312-5.5625h-5.9688zm16.188 17.094v16.438c10.788 4.9078 18.281 15.781 18.281 28.406 0 17.221-13.935 31.156-31.156 31.156s-31.219-13.935-31.219-31.156c0-12.251 7.0922-22.835 17.375-27.938v-16.656c-19.022 5.8914-32.812 23.638-32.812 44.594 0 25.767 20.89 46.625 46.656 46.625 25.767 0 46.656-20.858 46.656-46.625 0-21.299-14.278-39.252-33.781-44.844"
      fill="currentColor" /></svg>
    </div>
    <div class="routerLink">
      <router-link :to="{name:'postUser'}"  >tous vos messages</router-link>
      <router-link :to="{name:'allLike'}" class="Amid">tous vos likes</router-link> 
      <router-link :to="{name:'allDisLike'}"  >tous vos dislikes</router-link>
      <router-link :to="{name:'allinfo'}">vos infos perso</router-link> 

    </div>
    <div class="userMessage">
      <Coms v-if="$store.state.etat" :message="messagecom"/>
      <router-view @affcoms="affcoms"></router-view>
    </div>
  </div>
</template>

<script>
import Coms from "../components/coms.vue";
export default {
  components:{
    Coms
  },
  data(){
    return{
      userName:this.$store.state.user.name,
      userID:this.$store.state.user.id,
      msg:[],
      messagecom:null
    }
  },
  methods:{
        deco(){
      this.$store.commit('reset')
      document.location="/sinup"
    },
    affcoms(message,user){
      this.messagecom = {message,user}
      this.$store.commit("affcom")
    },    
    kickComs(){
        this.$store.commit("kickComs")
        console.log(this.$store.state.etat);
    },
    like(like, mess){
    let USERID=this.$store.state.userID

      let nbrLike=mess.nbrLike
      let userLike=JSON.parse(mess.userLike)
      let nbrDisLike=mess.nbrDisLike
      let userDisLike=JSON.parse(mess.userDisLike)


      //si like 
      if (like ===1) {
        //if deja like
        if (userLike.indexOf(USERID) === -1) {
          nbrLike++
          userLike.push(USERID)   
                
          // si deja dislike
          if (userDisLike.indexOf(USERID)!=-1) {
            let dell = userDisLike.indexOf(USERID)
            nbrDisLike--
            userDisLike.splice(dell,1)
          }
        
        }else {
          let dell = userLike.indexOf(USERID)
          nbrLike--
          userLike.splice(dell,1)
        }
        
      } 
      // si dislike
      else {
        // si deja dislike
        if (userDisLike.indexOf(USERID) === -1) {
          nbrDisLike++
          userDisLike.push(USERID)  
          //if deja like
          if (userLike.indexOf(USERID)!=-1) {
            let dell = userLike.indexOf(USERID)
            nbrLike--
            userLike.splice(dell,1)
          }
        }else {
          let dell = userDisLike.indexOf(USERID)
          nbrDisLike--
          userDisLike.splice(dell,1)
        }
      }

      let body={
        nbrLike,
        nbrDisLike,
        userLike,
        userDisLike
      }
      mess={
        ...mess,
        nbrLike,
        nbrDisLike,
        userLike:JSON.stringify(userLike),
        userDisLike:JSON.stringify(userDisLike)
      }
     this.allMessage.find(all=>all.MSG.id===mess.id).MSG = mess

    const options = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'authorization':`Bearer ${this.$store.state.token}`
        }
    }
    fetch(`http://localhost:3000/message/${mess.id}/like`,options)
    },
    
  },
  mounted(){
  }
}
</script>

<style lang="scss">
#user{
  text-align: center;
  margin: auto;
  width: 60%;
  max-height: 75vh;
  height:75vh;
  
  .routerLink{
    height: 40px;
    display: flex;
    a{
     
      display: flex;
      align-items: center;
      justify-content: center;
     color: black;
     flex: 1;
     background: #FFF;
     height: 100%;
     vertical-align: middle;
     text-decoration: none;
     
    }
    .Amid{border-left: solid #bababa 1px;border-right:#bababa solid 1px;}
    .router-link-active{
       color: #EB5233;
      background-color: #fd2b0118;
      // border-top: black 1px solid;
    } 
     
  }
   

  .infoUser{
    
    position: relative;
    background-color: #fff;
    // width: 50%;
    .userName{
      font-size: 40px;
      margin: 0;
      padding: 20px 0;
    }
    .logout{
      position: absolute;
      top: 20px;
      right: 20px;
      height: 30px;
      cursor: pointer;
    }
  }
  .userMessage{
      max-height: 50vh; 
      overflow-y: auto;
      min-height: 155px;
      
      background-color: #fd2b0118;
      .Usermessage {
      margin: 20px;
      background-color: #fff;
      width: max-content;
      border-radius: 20px;
      padding:10px 30px;
      max-width: 80%;
      
      .messageContent{
        font-size: 17px;
        text-align: start;
        .userName{
          font-size: 22px;
          margin-right: 18px;
        }
      }
    }
  .like{
    display: flex;
    align-items: center;
    justify-content:flex-end;
    width: 100%;
    .btn{
      height: 17px;
      fill: #808080;
      cursor: pointer;

    }
    .btn:hover{
      fill: #FD2D01   ;  
      transition: .15s;     
      height: 20px;
    }
    .nbrlike{
      font-size: 13px;
    }
    :nth-child(even){
      margin:  10px 10px 10px 3px;
    }
  }

  }
  .userMessage::-webkit-scrollbar {
  width: 10px;
  background: #bccac4;
}
::-webkit-scrollbar-thumb {
  background: #FD2D01;
  border-radius: 10px;
}
    
}
@media (max-width:1125px) {
  #user{
    width: 80%;
  }
}
@media (max-width:548px) {
  #user{
    width: 90%;
  .userMessage{
    .Usermessage{
      margin-left:10px ;
      padding: 10px 20px;
    }
  }
    .routerLink{
      flex-flow: wrap;
      a{
        min-width: max-content;
      }
    }
  }
}

@media (max-width:390px) {
  #user{
    max-height:100%;
    .userMessage{
      max-height: 45vh;
    }
    .routerLink{
      flex-flow: column;
      height: 100px;
      .Amid{
        border: none
      }
      a{
       border-bottom:solid 1px #bababa;
      }
      
      .router-link-active{
        border-top: solid 1px #bababa;
        border-bottom: none;
      }
      
    }
  }
}
</style>