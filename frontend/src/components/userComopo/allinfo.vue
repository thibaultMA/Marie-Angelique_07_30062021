<template>
  <div id="allInfo">
      <Confirm v-if="modifValidation" :modifications="mod"/>
        

      <div v-else>
        
      <div class="infoUserModif" >
          
        <p>nom : {{userName}} 
                <span v-if="modif == 'name'">
                <input type="text" name="name" autofocus v-model="userName">
                </span>
            <svg @click="clickmodif('name')" v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="logoModif" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg></p>
        <p>email : {{userEmail}}
                <span v-if="modif == 'email'">
                <input type="text" name="email" autofocus v-model="userEmail">
                </span>
                <svg @click="clickmodif('email')" v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="logoModif" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg></p>
        <span>mot de passe : **********************
                <div v-if="modif == 'mdp'">
                <input type="text" name="password" autofocus>
                </div>
                <svg @click="clickmodif('mdp')" v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="logoModif" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                </span> 
        </div>
        <button class="addModif" v-if="modif!=null" @click="majUser">ajouté les modifications</button>
        <button class="supprCompte" @click="Delete"> supprimé mon compte</button>
    </div>
  </div>
</template>

<script>
 import Confirm from "../../components/userComopo/confirm.vue";
export default {
   
    components:{
        Confirm,
    },
    props:['destination'],
    data(){
        return{
            userName:this.$store.state.user.name,
            userID:this.$store.state.user.id,
            userEmail:this.$store.state.user.email,
            userMdp:this.$store.state.user.password,
            modif:null,
            newName:null,
            newEmail:null,
            modifValidation:null,
            mod:null


        }
    },
    methods:{
       async clickmodif(etat){
            this.modif = etat
            setTimeout(() => {
                           if(this.modif !=null) document.querySelector("input[type=text]").focus();

            }, 50);
        },
        Delete(){
            this.modifValidation = "del"
             this.mod = "delete"
            // console.log("delete");
            

        },
        affcom(){
             this.$emit("affcoms")


        },
        modifUser(){
            
        },
        majUser(){
            this.modifValidation = "ok"
            this.mod={
                email:this.userEmail,
                userName:this.userName,
            }
        }
    }

}
</script>

<style lang="scss">
#allInfo{
.infoUserModif{
    text-align:initial;
}
.logoModif{
    height: 16px;
}
    .addModif{
        background-color: #1a951afd;
        border: none;
        padding: 5px;
        margin: 20px;
    }
    .supprCompte{
        background-color: rgb(197, 40, 40);
        color:  #fff;
        border: none;
        padding: 5px;
        margin: 20px;
    }
}

#sinup{
height: max-content;
margin: 20px;

}

</style>