<template>
<div>
   <p v-if="msg.length == 0">vous n'avez aucun dislike</p>
  <div v-for="mess in msg" :key="mess.id" class="Usermessage">
        <!-- info mess -->
        <p class="messageContent"> <b class="userName">{{ mess.user.name }} : </b> {{ mess.MSG.content }}</p>
        <div class="like">
          <!-- div like -->
          <svg  @click="like(1, mess.MSG)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
          <p class="nbrlike">{{  mess.MSG.nbrLike }}</p>
          <svg @click="like(-1, mess.MSG)"  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-down" class="btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"></path></svg>
          <p class="nbrlike">{{ mess.MSG.nbrDisLike }}</p>
          <!-- afficher les coms -->
          <svg @click="affcoms(mess.MSG)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comment-dots" class="btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:['destination'],
  data(){
    return{
      userName:this.$store.state.user.name,
      userID:this.$store.state.user.id,
      msg:[],
      messagecom:null
    }
  },
  computed:{

  },
  methods:{
        deco(){
      this.$store.commit('reset')
      document.location.reload()
    },
    affcoms(message) {
      let user = this.$store.state.user
      this.messagecom = {message,user}

      this.$emit("affcoms",message,user)
        
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


      let maj = false
      
      //si like 
      if (like == 1) {

        maj = true
        //if pas deja like
        if (userLike.indexOf(USERID) == -1) {
          nbrLike++
          userLike.push(USERID)   
                
          // si deja dislike
          if (userDisLike.indexOf(USERID) != -1) {
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
        if (userDisLike.indexOf(USERID) == -1) {
          nbrDisLike++
          userDisLike.push(USERID)  
          //if deja like
          if (userLike.indexOf(USERID) != -1) {
            let dell = userLike.indexOf(USERID)
            nbrLike--
            userLike.splice(dell,1)
          }
        }else {
          let dell = userDisLike.indexOf(USERID)
          nbrDisLike--
          userDisLike.splice(dell,1)
          maj = true
        }
      }

      let body={
        nbrLike,
        nbrDisLike,
        userLike:JSON.stringify(userLike),
        userDisLike:JSON.stringify(userDisLike)
      }
      mess={
        ...mess,
        nbrLike,
        nbrDisLike,
        userLike:JSON.stringify(userLike),
        userDisLike:JSON.stringify(userDisLike)
      }
     
    const options = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'authorization':`Bearer ${this.$store.state.token}`
        }
    }
    this.msg.find(m=>m.MSG.id == mess.id).MSG.nbrLike = nbrLike
    this.msg.find(m=>m.MSG.id == mess.id).MSG.nbrDisLike = nbrDisLike
    this.msg.find(m=>m.MSG.id == mess.id).MSG.userLike = JSON.stringify(userLike)
    this.msg.find(m=>m.MSG.id == mess.id).MSG.userDisLike = JSON.stringify(userDisLike)
    
    fetch(`http://localhost:3000/message/${mess.id}/like`,options)
    .then(()=>{
      if (maj == true) {
        setTimeout(() => {
          this.fetchLikeUser()
        }, 20);
      }
    })
    },fetchUser(MSG){
      fetch(`http://localhost:3000/users/${MSG.userid}`).then(res=>res.json())
            .then(users=>{
              let user = users
              let mess={MSG,user}
              
              this.msg.unshift(mess) 
            })
            .catch(res=>console.log("echec res : ",res))
    },
    fetchLikeUser(){
    let options = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        'authorization':`Bearer ${this.$store.state.token}`
        },
      }
          fetch(`http://localhost:3000/message/user/${this.$store.state.userID}/Dislike`,options)
          .then(res=>res.json())
          .then(data=>{
             this.msg=[]
            if(data.length != 0){
                data.forEach(messageLiker => {
                    this.fetchUser(messageLiker)
                });
              
            }
          })
        
      
    }
  },
  mounted(){

    this.fetchLikeUser()
  }
}
</script>

<style>

</style>