const products = {
  state: { 
      allProducts : [],
      pages : {},
      items : {}
   },
  mutations: {
      SET_PRODUCT_LIST: (state,  productData) => {
      state.allProducts = productData.data;
      state.pages = productData.pages;
      state.items = productData.items;
    }
   }
  ,
  actions: {
    loadProducts: function ({ commit }, data) {
        commit('SET_PRODUCT_LIST', data);
    }
  },
  getters: {
      allProducts: state => state.allProducts,
      pageInfoData: state => state.pages,
      itemInfoData: state => state.items
    }
}

export default products
