import { createStore } from "vuex";

export default createStore({
  
  state: {
    etat: false,
    user: {
      id: null,
      name: null,
      email:null,
      password:null
    },
    userID: "",
    login: false,
  },
  mutations: {
    
    affcom: async (state) => {
      setTimeout(() => {
        state.etat = true;
      }, 100);
    },
    kickComs: (state) => {
      state.etat = false;
    },
    getUer: (state, userData) => {
      
      state.user = userData.user;
      state.userID = userData.user.id;
      console.log("userData",state.user);
      state.login = true;
    },
    reset:(state)=>{
      state
    }
  },
  actions: {
    fetchIdUser(store, User) {
      store;
      fetch(`http://localhost:3000/users/${User.userId}`)
        .then((res) => res.json())
        .then((user) => {
          let userData = {
            user: user[0],
          };
          this.commit("getUer", userData);
        });
    },
  },
});
