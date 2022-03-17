import axios from 'axios'

import {
  getIconsFromStrapi,
  getCategoriesFromStrapi,
  getHomeData
} from '@/api/strapi';

export const state = () => ({
  icons: [],
  iconCategories: [],
  iconSize: 'iconImage24px',
  homeData: '',
  searchValue: '',
})

export const mutations = {

  setDataToState(store, payload){
    store[payload.arr] = payload.data;
  },

}

export const actions = {

  setIcons(store, icons){
    store.commit('setDataToState', {arr: 'icons', data: icons});
  },

  async fetchIcons(store){
    let icons = await getIconsFromStrapi();

    try {
      store.commit('setDataToState', {arr: 'icons', data: icons})
    } catch (error) {
      console.log("Error fetching learning resources: ", error);
    }
  },

  async fetchHomeData(store){
    let data = await getHomeData();

    try {
      store.commit('setDataToState', {arr: 'homeData', data: data});
    } catch (error) {
      console.log("Error fetching learning resources: ", error);
    }
  },

  async fetchIconCategories(store){
    let iconCategories = await getCategoriesFromStrapi();

    try {
      store.commit('setDataToState', {arr: 'iconCategories', data: iconCategories})
    } catch (error) {
      console.log("Error fetching icon categories: ", error);
    }
  },

  setDataToState(store, payload){
    store.commit('setDataToState', {arr: payload.state, data: payload.data})
  },

  scrollTo(store, target) {
    if (typeof target == 'number') {
      window.scrollTo(0, target-50)
    } else if (typeof target == 'object') {
      let y = target.getBoundingClientRect().y
      window.scrollTo(0, y-50)
    }
  },

  setSearchValue(store, value) {
    console.log('setSearchValue', value);
  },

  downloadImage(store, payload){
    let url = payload.url
    let name = payload.name + store.state.iconSize +'.svg';;

    fetch(url)
      .then(resp => resp.blob())
      .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          // the filename you want
          a.download = name;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('An error sorry'));
  }


}

export const getters = {

  getIcons(state) {
    return state.icons;
  },

  getIconCategories(state) {
    return state.iconCategories;
  },

  iconSize(state) {
    return state.iconSize;
  },

  getHomeData(state) {
    return state.homeData
  }

}
