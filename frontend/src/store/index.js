import { createStore } from "vuex";

export default createStore({
  
  state: {
    etat: false,
    etatAdmin:false,
    adminLog:false,
    user: {
      id: null,
      name: null,
      email:null,
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
      state.etatAdmin = false;
      state.adminLog = false;
    },
    getUer: (state, user) => {
      
      state.user.id =user.id;
      state.user.email = user.email
      state.user.name = user.name
      state.user.niveau = user.niveau

      state.userID = user.id;
      state.token = user.token
      
      state.login = true;
      
    },
    reset:(state)=>{
      state
    },
    modifUser(state,newData){
      state,newData
      console.log(newData);
      state.user.name = newData.name;
      state.user.email = newData.email;
    }
  },
  actions: {
    fetchIdUser(store, User) {
      store;
      fetch(`http://localhost:3000/users/${User.id}`)
        .then((res) => res.json())
        .then((user) => {
        
          this.commit("getUer", user);
        })
        .catch(err=>console.log(err))
    },
  },
});
