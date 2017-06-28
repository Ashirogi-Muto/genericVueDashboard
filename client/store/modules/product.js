
const products = {
  state: { 
      allProducts : [],
      pages : {},
      items : {}
   },
  mutations: {
      SET_PRODUCT_LIST: (state,  productData) => {
      state.allProducts = productData;
    //   state.pages = productData.pages;
    //   state.items = productData.items;
      
    }
   }
  ,
  actions: {
    LOAD_PRODUCT_LIST: function ({ commit }, data) {
        commit('SET_PRODUCT_LIST', data);
    }
  },
  getters: {
      x: state => console.log(state.allProducts),
      allProducts: state => state.allProducts
    //   fetchAllProducts (state) {
    //   return state.allProducts;
    }
}

export default products
