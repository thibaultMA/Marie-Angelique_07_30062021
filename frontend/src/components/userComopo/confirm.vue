<template>
  <div id="confirm">
      <h1>confirmez les modifications</h1>

      <form @submit.prevent="islog()" class="form">
        <p class="err" v-if="log=='fail'"> mot de passe ou identifient incorrect</p>
        <div class="formAdresse">
          <input
            v-model="email"
            type="text"
            name="email"
            id="email"
            placeholder="e-mail"
            class="input email"
          />
        </div>
        <div class="formPSW">
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            placeholder="mot de passe"
            autocomplete="on"
            class="input password"
          />
        </div>
      </form>
      <div class="formButton">
          <button
            type="submit"
            class="button"
            @click="testUser"
          >
            Connexion
          </button>
      </div>
  </div>
</template>

<script>
export default {
    props:["modifications","delmessage"],
    data(){
        return{
            email:'',
            password:"",
            log:null
        }
    },
    methods:{
      testUser(){
        console.log(this.modifications);
        let bodyLogin = {
          email: this.email.trim(),
          password: this.password.trim(),
        };
        let bodyDEL = {
                ...this.$store.state.user
        }
        const options = {
          method: "POST",
          body: JSON.stringify(bodyLogin),
          headers: {
          "Content-Type": "application/json",
          'authorization':`Bearer ${this.$store.state.token}`
          },
        }
        fetch(`http://localhost:3000/users/test`, options)
        .then(res=>res.json())
        .then(user=>{
          if (user.email == this.$store.state.user.email) {
            
            if (this.modifications == "delete"){
              let optionsDelet={
                method: "DELETE",
               body:JSON.stringify(bodyDEL),
                headers: {
                  "Content-Type": "application/json",
                  'authorization':`Bearer ${this.$store.state.token}`
                },
              }
              fetch(`http://localhost:3000/users/${this.$store.state.userID}/delete`,optionsDelet)
              .then(res=>{console.log(res);
                if (res.ok) {
                  window.location = "/"
                  return
                }
              })
              
            }
            if (this.modifications == "delMess") {
              console.log("vu");
              let delMessage = {
                method: "DELETE",
                body:JSON.stringify(bodyDEL),
                headers: {
                  "Content-Type": "application/json",
                  'authorization':`Bearer ${this.$store.state.token}`
                },
              }
              fetch(`http://localhost:3000/message/${this.delmessage}/delete`,delMessage)
              .then(res=>{
                console.log(res);
                if (res.ok) {
                  this.$emit('maj')
                  this.$store.state.etatAdmin = false
                 
                }
                else{ this.log = "fail"}
              })
            }
            if (this.modifications == "delComm") {
              let delCom = {
                method: "DELETE",
                body:JSON.stringify(bodyDEL),
                headers: {
                  "Content-Type": "application/json",
                  'authorization':`Bearer ${this.$store.state.token}`
                }, 
              }
              fetch(`http://localhost:3000/message/com/${this.delmessage}/delete`,delCom) 
              .then(res=>{
                if (res.ok) {
                  this.$emit('majCom')
                }else throw "identification incorrect"
              })
              .catch(err=>{
                console.log(err);
                this.log = "fail"
              })
            }
            if( typeof this.modifications === 'object' && this.modifications !== null){
              let optionsMod = {
                method: "put",
                body: JSON.stringify(this.modifications),
                headers: {
                "Content-Type": "application/json",
                'authorization':`Bearer ${this.$store.state.token}`
                },
              }
              fetch(`http://localhost:3000/users/${this.$store.state.userID}/update`, optionsMod)
              .then(res=> {
                console.log(res);
                  if (res.ok) {
                    res.json()
                    .then(newData=>{
                    this.$store.commit("modifUser",newData)
                    this.$router.push('/') 
                    console.log(this.$store.state);
                  })
                  }else {this.log = "fail"; throw 'identification incorrect'}
                
              })
              .catch(err=>{
                console.log(err);
              })
            }
          }
        })
      }
    }
}
</script>

<style>
.err{
  color: red;
}
.button{
  border: none;
  background-color: #FD2D01;
  margin: 20px;
  padding: 5px;
  width: 140px;
}
</style>