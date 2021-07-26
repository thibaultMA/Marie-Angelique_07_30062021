<template>
  <div id="comBlock">
    <!-- {{ message }} -->
    <div class="message ">
      <p class="messageContent"> <b class="userName">{{ message.user.name }} : </b> {{ message.message.content }}</p>

    </div>
    <div class="commentBox">
      <h3 id="vide" v-if="commentaires.length == 0">Aucun commentaire pour le moment serez vous le premier ?</h3>
      <div class="commentaire" v-for="comm in commentaires" :key="comm.id">
        <!-- {{ commentaires }} -->
        <div class="soloCom">
          <p class="messageContent"> <b class="userName">{{ comm.user.name }} :</b>  <br class="BR"> {{ comm.COM.content }}</p>
          <div class="like">
            <svg  @click="like(1, comm.COM,$event)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg> 
            <p class="nbrlike">{{ comm.COM.nbrLike }}</p>
            <svg @click="like(-1, comm.COM,$event)"  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-down" class="btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"></path></svg>
            <p class="nbrlike">{{ comm.COM.nbrDisLike }}</p> 

          </div>
        </div>
      </div>
    </div>
    <FormMsg
      :destination="'com'"
      :ceMessage="message.message"
      @maj="relanceFetch"
      class="fromtest"
    />
  </div>
</template>

<script>
import FormMsg from "../components/formMessage.vue";
export default {
  props: ["message"],
  components: {
    FormMsg,
  },
  data() {
    return {
      commentaires: [],
    };
  },
  methods: {
    like(like, com, e) {
      if (this.$store.state.login == false) {
        let conf = confirm(
          "vous n'ete pas connecté voulez vous etre rediriger vers la page de connexion ?"
        );
        if (conf) {
          //   alert('tres bien')
          this.$store.commit("kickComs")
          this.$router.push("/sinup");
        } else {
          e.preventDefault();
        }
      } else {
        let USERID = this.$store.state.userID;

        let nbrLike = com.nbrLike;
        let userLike = JSON.parse(com.userLike);
        let nbrDisLike = com.nbrDisLike;
        let userDisLike = JSON.parse(com.userDisLike);

        //si like
        if (like === 1) {
          //if deja like
          if (userLike.indexOf(USERID) === -1) {
            nbrLike++;
            userLike.push(USERID);

            // si deja dislike
            if (userDisLike.indexOf(USERID) != -1) {
              let dell = userDisLike.indexOf(USERID);
              nbrDisLike--;
              userDisLike.splice(dell, 1);
            }
          } else {
            let dell = userLike.indexOf(USERID);
            nbrLike--;
            userLike.splice(dell, 1);
          }
        }
        // si dislike
        else {
          // si deja dislike
          if (userDisLike.indexOf(USERID) === -1) {
            nbrDisLike++;
            userDisLike.push(USERID);
            //if deja like
            if (userLike.indexOf(USERID) != -1) {
              let dell = userLike.indexOf(USERID);
              nbrLike--;
              userLike.splice(dell, 1);
            }
          } else {
            let dell = userDisLike.indexOf(USERID);
            nbrDisLike--;
            userDisLike.splice(dell, 1);
          }
        }

        let body = {
          nbrLike,
          nbrDisLike,
          userLike,
          userDisLike,
        };
        com = {
          ...com,
          nbrLike,
          nbrDisLike,
          userLike: JSON.stringify(userLike),
          userDisLike: JSON.stringify(userDisLike),
        };
        this.commentaires.find((all) => all.COM.id === com.id).COM = com;
        const options = {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        };
        fetch(
          `http://localhost:3000/message/${this.message.message.id}/${com.id}/like`,
          options
        );
      }
    },
    relanceFetch() {
      this.fetchAll();
    },
    fetchUser(COM) {
      fetch(`http://localhost:3000/users/${COM.userid}`)
        .then((res) => res.json())
        .then((users) => {
          let user = users[0];
          COM = { COM, user };
          
          this.commentaires.push(COM);
        });
    },
    fetchAll() {
      fetch(`http://localhost:3000/message/${this.message.message.id}/com`)
        .then(res=>res.json())
        .then(COMS => {
          this.commentaires.length = 0
          COMS.forEach(COM => {
              this.fetchUser(COM)
          });
        });
    },
  },
  mounted() {
    this.fetchAll();
  },
};
</script>

<style lang="scss" >
#comBlock {

  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  color: #000;
  background-color: #dadada;

  top: 9vh;
  left:25%;
  right: 25%;
  bottom: 20vh;
  // overflow-y: auto;
  border-radius: 10px;
  .message {
    background-color: #fff;
    padding:20px  20px 20px 50px ;
    min-height: min-content;
    // position: absolute;
    // display: none;
    
  }

  .commentBox{
    // max-height: 35vh;
    height: 100%;
    overflow-y: auto;
    // display: flex;
    position: relative;
    #vide{
      position: absolute;
      bottom: 10px;
      left: 10%;
      right: 10%;
    }
    .commentaire{

    .soloCom{
      padding:10px 20px;
      width: max-content;
      max-width: 80%;
      margin: 7px auto 7px 30px;
      background-color: #14921e;
      border-radius: 50px;
      color: rgb(224, 224, 224);
      // b{
      //   margin-right: 10px;
      // }

      .messageContent{
        margin: 0;
        
      }
      .like{
        display: flex;
        align-items: center;
        justify-content:flex-start;
        width: 100%;
        margin-left: 5px;
        .btn{
          height: 13px;
          fill: #ffffff;
          cursor: pointer;

        }
        .btn:hover{
            fill: #0f7002   ;  
            transition: .15s;     
            height: 16px;
            
          }
        .nbrlike{
          font-size: 13px;
        }
        :nth-child(even){
          margin:  10px 10px 10px 3px;
        }
      }
    }
    
    }
    &::-webkit-scrollbar {
  width: 10px;
  background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background: #3b3b3b;
    border-radius: 10px;
  }
  }
}

@media (max-width: 727px) {
  #comBlock{
    width: 80vw;
    left: 10vw;

    
  }
}

@media (max-width: 485px){
  #comBlock{
    .commentBox{
.commentaire{
    width: 90%;
    .soloCom{
      margin: 7px auto 7px 5px;
    }
  }
    }

    
  }
}
@media (min-width: 485px){
  .BR{
          display: none;
    }
}
</style>