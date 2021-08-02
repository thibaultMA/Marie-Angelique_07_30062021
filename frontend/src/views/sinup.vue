<template>
  <div id="sinup">
    <div class="loginBlock">
      <h1 v-if="this.mode == 'login'">Connexion</h1>
      <h1 v-else>Inscription</h1>
      <p v-if="this.mode == 'login'">
        Vous n'avez pas encore de compte ?
        <span @click="switchToCreateAcount()" class="switch"
          >Venez en créer un !</span
        >
      </p>
      <p v-else>
        Vous avez déjà un compte ?
        <span @click="switchToLogin()" class="switch"
          >Venez vous connecter !</span
        >
      </p>
      <p
        class="err"
        v-if="
          this.mode == 'create' && this.err == 'cette email est déjà utilisé'
        "
      >
        {{ this.err }}
      </p>
      <p
        class="err"
        v-if="
          this.mode == 'login' &&
          this.err == 'identifient ou mot de passe incorrect'
        "
      >
        {{ this.err }}
      </p>
      <form @submit.prevent="islog()" class="form">
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
        <div class="loginName" v-if="this.mode == 'create'">
          <input
            v-model="identifiant"
            type="text"
            name="identifiant"
            placeholder="identifiant"
            class="input identifiant"
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

        <div class="formButton">
          <button
            type="submit"
            class="button"
            v-if="this.mode == 'login'"
            :class="{ buttonDesactiv: isdisabled }"
            :disabled="isdisabled"
            @click="login"
          >
            Connexion
          </button>

          <button
            type="submit"
            class="button"
            v-else
            :class="{ buttonDesactiv: isdisabled }"
            :disabled="isdisabled"
            @click="createAcount"
          >
            Inscription
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: "login",
      email: "", 
      password: "",
      identifiant: "",
      etatBtn: false,
      err: false,
    };
  },
  computed: {
    isdisabled: function () {
      const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z-_]+\.[a-z]{2,4}$/g;
      // const passwordregex     = /[a-z A-ZÈÉÎÏÖéèîïÜüûÛ-]+/g;
      const identifiantregex = /[a-z A-ZÈÉÎÏÖéèîïÜüûÛ-]+/g;

      const emailmatches = emailregex.exec(this.email);
      // const passwordmatches     = passwordregex.exec(this.password);
      const identifiantmatches = identifiantregex.exec(this.identifiant);

      if (this.mode == "create") {
        if (!!emailmatches && this.password != "" && !!identifiantmatches) {
          return this.etatBtn;
        } else {
          return !this.etatBtn;
        }
      } else {
        if (!!emailmatches && this.password != "") {
          return this.etatBtn;
        } else {
          return !this.etatBtn;
        }
      }
    },
  },
  methods: {
    islog() {
      console.log();
    },
    login() {
      let body = {
        email: this.email.trim(),
        password: this.password.trim(),
      };
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`http://localhost:3000/users/auth`, options)
        .then((res) => res.json())
        .then((user) => {
          if (!user.error == false) {
            this.err = "identifient ou mot de passe incorrect";
            return;
          }
          this.$store.commit("getUer", user);
          this.email = "";
          this.identifiant = "";
          this.password = "";
          this.$router.push("/");
        });
    },

    createAcount() {
      let user = {
        name: this.identifiant.trim(),
        email: this.email.trim(),
        password: this.password.trim(),
      };
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          
        },
      };
      console.log(user);
      fetch(`http://localhost:3000/users/addpost`, options)
      .then((res) => res.json())
      .then(res=>{
        if (!res.ok) {
          this.err = "cette email est déjà utilisé";
        }
        else{
          this.login()
        }
      })

    },
    switchToCreateAcount() {
      this.mode = "create";
    },
    switchToLogin() {
      this.mode = "login";
    },
  },
};
</script>

<style lang="scss">
#sinup {
  height: 88.7vh;

  .loginBlock {
    margin: auto;
    padding: 20px;
    width: 50%;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    .logo {
      height: 100px;
      fill: #FD2D01;
      
    }
    .switch {
      color: #FD2D01;
      cursor: pointer;
    }
    .form {
      height: 170px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      input {
        height: 20px;
        font-size: 0.9rem;
        background-color: #e6e6e6;
        border: 1px solid #adadad;
        border-radius: 3px;
      }
    }
    .button {
      color: #f0f0f0;
      background-color: #FD2D01;
      padding: 5px;
      width: 130px;
      border: none;
      margin-bottom: 10px;
    }
    .buttonDesactiv {
      color: #000000c2;
      background-color: #42b98385;
    }
  }
}
@media (max-width: 727px) {
  #sinup{
    .loginBlock{
      width: 70%;
    p{
      width: 99%;
    }
  }
}
}
@media (max-width: 425px) {
    #sinup{
    .loginBlock{
      width:90vw;
    // padding: ;
  }
}
}
</style>