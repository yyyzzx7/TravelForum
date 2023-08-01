import Vue from "vue";
import Vuex from "vuex";
import mutations from '../store/mutations';
import actions from '../store/actions';
import state from '../store/state';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    actions,
});

export default store;
