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
    props:["modifications"],
    data(){
        return{
            email:"thithi-98@hotmail.fr",
            password:"mdp",
            log:null
        }
    },
    methods:{
        testUser(){
            let bodyLogin = {
        email: this.email,
        password: this.password,
      };
        
        const options = {
            method: "POST",
            body: JSON.stringify(bodyLogin),
            headers: {
            "Content-Type": "application/json",
            },
        }
        fetch(`http://localhost:3000/users/auth`, options)
       .then((res) => res.json())
       .then(user=>{
            if (!user.error == false) {
            this.err = "identifient ou mot de passe incorrect";
              this.log = 'fail'
            return;
          }else{
            console.log(this.modifications);
            if (user.userId == this.$store.state.user.id) {
              if (this.modifications == "delete") {
                
              
           
              let body={
                userID:this.$store.state.user.id
            }
            const options = { 
                    method: 'DELETE',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            fetch(`http://localhost:3000/message/com/dell`,options)
            .then(res=>{
                    if (res.ok) {
                      console.log("ok");
                        // console.log(body);
                        fetch('http://localhost:3000/message/messsage/dell',options)
                        .then(res=>{
                            if (res.ok) {
                              console.log("ok");
                                fetch(`http://localhost:3000/users/delete/${this.userID}`,options)
                                .then(res=>{
                                    if (res.ok) {
                                      console.log("ok");
                                        window.location = "/"
                                    }
                                })
                            }
                        })
                    }
            })
            }
            else{
                  const Req = {
                    method: "PUT",
                    body: JSON.stringify(this.modifications),
                    headers: {
                    "Content-Type": "application/json",
                    },
                    
                }
                fetch(`http://localhost:3000/users/update/${user.userId}`,Req)
                .then(res=>res.json())
                .then(newdata=>{
                    this.$store.commit("modifUser",newdata)
                    console.log(this.$store.state);
                    this.$router.push('/') 
                })
                .catch(err=>console.log(err))
            }
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
</style>