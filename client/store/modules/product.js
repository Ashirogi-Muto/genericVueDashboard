
const products = {
  state: { 
      allProducts : [],
      pages : {},
      items : {} ,
      image : "" ,
      images : [] = [] 
   },
  mutations: {
      SET_PRODUCT_LIST: (state,  productData) => {
      state.allProducts = productData.data;
      state.pages = productData.pages;
      state.items = productData.items;
    },
    
    SET_IMAGE_DATA : (state , img_url_data) =>{

      state.image = img_url_data ;
      //console.log(state.image) ;

    },

    SET_IMAGE_ARRAY : (state , img_url_array) =>{
     
      state.images.push(img_url_array )  ;
      
      //state.images = img_url_array ;
      console.log(state.images.length)

    }


   }
  ,
  actions: {
    loadProducts: function ({ commit }, data) {
        commit('SET_PRODUCT_LIST', data);
    } ,
    
     loadImageData: function ({ commit }, data) {
        commit('SET_IMAGE_DATA', data);
    } ,

    loadImageArray : function({commit} , data) {

        commit('SET_IMAGE_ARRAY' , data) ;
    }
  },
  getters: {
      allProducts: state => state.allProducts,
      pageInfoData: state => state.pages,
      itemInfoData: state => state.items ,
      getImageUrl : state => state.image ,
      getImageArray : state => state.images 
    }
}

export default products
