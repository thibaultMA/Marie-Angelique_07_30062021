<template>
  <div id="message" @scroll="voir()">

    <Coms v-if="this.$store.state.etat" :message="messagecom" :refrechCom="refrech" @adminVadmid="test"/>
     <svg class="scrollTop" @click="scrolltop" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-up"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"></path></svg>
    <FormMsg :destination="'message'" @maj="relanceFetch"/>
    <Confirm class="confirm" v-if="$store.state.adminLog" :modifications="delDistination" :delmessage='dellMSG' @maj="relanceFetch" @majCom='refrechCom'/>
    <div class="boxMessage" v-if="allMessage.length != 0">
       
      <div  v-for="mess in allMessage" :key="mess.id" class="message">
        
        <p class="messageContent"> <b class="userName">{{ mess.user.name }} : </b> {{ mess.MSG.content }}</p>

        <div class="like">
          <!-- div like -->
          
          <svg  @click="like(1, mess.MSG,$event)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
          <p class="nbrlike">{{ mess.MSG.nbrLike }}</p>
          <svg @click="like(-1, mess.MSG,$event)"  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-down" class="btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"></path></svg>
          <p class="nbrlike">{{ mess.MSG.nbrDisLike }}</p>
          <!-- afficher les coms -->
          <svg @click="affcoms(mess.MSG ,mess.user)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comment-dots" class="btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
        
        <button v-if="this.$store.state.user.niveau == 1" class="admin" @click="admindel(mess)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Coms from "../components/coms.vue";
import FormMsg from "../components/formMessage.vue";
import Confirm from "../components/userComopo/confirm.vue";
export default {
    name:"home",
    components:{
            Coms,FormMsg,Confirm
    },
  data() {
    return { 
        allMessage: [] ,
        messagecom:null,
        adminLog:false,
        delDistination:null,
        dellMSG:null,
        refrech:null
    };
  },
  computed: {},

  methods: {
    test(el){
      console.log(el);
      this.dellMSG = el.dellCom
      this.delDistination = el.destination
    },
    admindel(mess){
      if (this.$store.state.user.niveau == 1) {
        this.dellMSG = mess.MSG.id
        this.delDistination = "delMess"
        this.$store.state.adminLog=true
        this.$store.state.etatAdmin = true
        
      } 
    },
    scrolltop(){
      window.scrollTo(0,0)   
  },
    refrechCom(){
      this.refrech = true
      setTimeout(() => {
        this.refrech = false
        
        }, 5);
    },
    relanceFetch(){
      this.allMessage=[]
      this.fetchAllMSGS()
      this.$store.state.etat =false
      this.adminLog=false
      this.$store.state.adminLog=false
    },
    like(like ,message,e) {
      if (this.$store.state.login == false) {
          let conf= confirm("vous n'ete pas connecté voulez vous etre rediriger vers la page de connexion ?")
        if (conf) {
            this.$router.push('/sinup')
        } else {
            e.preventDefault()
        }
      }else{
      let USERID=this.$store.state.userID

      let nbrLike=message.nbrLike
      let userLike=JSON.parse(message.userLike)
      let nbrDisLike=message.nbrDisLike
      let userDisLike=JSON.parse(message.userDisLike)


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
        userLike:JSON.stringify(userLike),
        userDisLike:JSON.stringify(userDisLike)
      }
      message={
        ...message,
        nbrLike,
        nbrDisLike,
        userLike:JSON.stringify(userLike),
        userDisLike:JSON.stringify(userDisLike)
      }
     this.allMessage.find(all=>all.MSG.id===message.id).MSG = message

    const options = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
             'authorization':`Bearer ${this.$store.state.token}`
        }
    }
    fetch(`http://localhost:3000/message/${message.id}/like`,options)
    }
    },

    affcoms(message,user) {
      this.messagecom = {message,user}
      this.$store.commit("affcom")
    },
    fetchUser(MSG){
      fetch(`http://localhost:3000/users/${MSG.userid}`).then(res=>res.json())
            .then(users=>{
              let user = users
              let mess={MSG,user}
              this.allMessage.push(mess)
              this.allMessage.sort((a,b)=>{return b.MSG.id - a.MSG.id})
            })
            .catch(res=>{
              console.log("echec res : ",res)
              this.$router.push('/sinup')
            })
    },
     fetchAllMSGS(){
       this.allMessage = []
       const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization':`Bearer ${this.$store.state.token}`
        }
      }
      fetch("http://localhost:3000/message",options)
            .then((res) => res.json())
            .then((MSGS) => { 
              MSGS.sort((a,b)=>{return b.id - a.id})
              MSGS.forEach(MSG => {
                this.fetchUser(MSG)
              });
            })
            .catch(err=>console.log("err",err))
    }

    
  },
  mounted() {
    this.fetchAllMSGS();
  },
};
</script>
 
<style lang='scss'>

#message {
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  // align-items: center;
  background-color: #fd2b0118;
  max-width: 1050px;
  margin: auto;
  margin-top: auto;
  .confirm{
      position: fixed;
      z-index: 9;
      left: 30%;
      right: 30%;
      text-align: center;
      background-color: #fff;
      border: solid 1px;
      width: auto;
      min-width: 205px;
  }
  #forMSG > form{
    padding-top:30px;

  }
  .scrollTop{
    position: fixed;
    bottom: 20px;
    right: 50px;
    height: 50px;
    color: #2c3e50c9;
    cursor: pointer;
  }
  
  .boxMessage{
    width: 74%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .message {
      margin: 20px;
      background-color: #fff;
      width: max-content;
      border-radius: 20px;
      padding:10px 30px;
      max-width: 100%;
      
      .messageContent{
        font-size: 17px;
          word-wrap: break-word;
        .userName{
          font-size: 22px;
          margin-right: 18px;
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
          margin:  10px 10px 10px 5px;
        }
      }
      
    }
  }
}
.admin{
        background-color: #ff000091;
        color: white;
        border: none;
        cursor: pointer;
        
}
@media (max-width: 485px) {
  #message{
    #forMSG > form{
      .textarea{
        width: 90%;
      }
    }
  }
}
</style>