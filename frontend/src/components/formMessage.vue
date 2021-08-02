<template>
  <div id="forMSG">
      <p v-if="this.$store.state.login&& destination=='message'" class="name">{{this.$store.state.user.name}}</p>
      <form @submit.prevent="addmessage($event)" class="form" v-if="this.$store.state.login">
          <input type="text" class="textarea" name="content" v-model="content" placeholder="Quelle est votre message ? " v-if="destination=='message'">
          <input type="text" class="textarea" name="content" v-model="content" placeholder="Quelle est votre commentaire ? " v-else>
          <input class="submit" type="submit" name="" id="" >
      </form>
  </div>
</template>
<script>
export default {
    props: ["destination","ceMessage"],
    data(){
        return{
            content:""
        }
    },
    methods:{

       addmessage(){
            if(this.content !=""){
               let pourMSG="message"

               //si com
               if (this.destination != pourMSG) {
                   
                let message = {
                    userid:this.$store.state.userID,
                    messageid:this.ceMessage.id,
                    content:this.content.trim()
                }
                const options = {
                    method: 'POST',
                    body: JSON.stringify(message),
                    headers: {
                        'Content-Type': 'application/json',
                         'authorization':`Bearer ${this.$store.state.token}`
                    }
                }
                
                fetch(`http://localhost:3000/message/${this.ceMessage.id}/postCOM`,options)
                .then(()=>{
                    this.$emit('maj')
                    this.content =""
                })
               }//si message
               else{
                   
                let message = {
                    userid:this.$store.state.userID,
                    content:this.content.trim()
                }
                // console.log(this.$store.state.token);
                const options = {
                    method: 'POST',
                    body: JSON.stringify(message),
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization':`Bearer ${this.$store.state.token}`
                    }
                }
                fetch('http://localhost:3000/message/post',options)
                .then(res=>res.json())
                .then((res)=>{
                    this.$emit('maj',res.insertId)
                    this.content =""
                })            
               }
            }
       }
    }
}
</script>

<style lang="scss">

    #forMSG{
        background-color: #ffffff;
        border-radius: 10px;        
        width: 100%;
        min-height: min-content;
        display: flex;
        align-items: center;
        flex-flow: column;
        // position: fixed;
        // top: 200px;
        .name{
            font-weight: bold;
            font-size: 25px;
            margin:30px 0 0   0;
            color: #000000b4;
        }
        .form{
            display: flex;
            align-items: center;
            flex-flow: column;
            padding: 20px;
            width: 90%;
            .textarea{
                font-family: Arial, Helvetica, sans-serif;
                border-radius: 30px;
                border: 2px solid #000;
                padding: 10px;
                width: 70%;
                &:focus{
                    outline: none;
                    border: #868686 solid 2px;
                    border-radius: 30px;
                }
            }
            .submit{
                background-color: #FD2D01;
                color: #f0f0f0;
                border: none;
                border-radius: 20px;
                width: 100px;
                padding: 7px;
                margin-top: 10px;
            }
        }
    }
@media (max-width: 563px){
    #comBlock{
#forMSG {
  form.form {

    input.textarea{
    width: 90%;
    }
  } 

}}
}
</style>