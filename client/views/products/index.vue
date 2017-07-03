<template>
  <div>
    <div class="tile is-ancestor">

      <div class="tile is-parent is-4">

        <article class="tile is-child box">
          <h1 class="title">Product Details</h1>

          <div class="block">
            <label class="label">Name</label>
            <p class="control">
              <input v-model = "product.name"  name = 'name' class="input" type="text" placeholder="Text input">
            </p>
            <label class="label">Short Description</label>
            <p class="control has-icon has-icon-right">
              <input v-model = "product.shortDescription" name = 'shortDescription' class="input" type="text" placeholder="Text input" value="bulma">
            </p>
            <label class="label">Long Description</label>
            <p class="control">
              <textarea v-model = 'product.longDescription' class="textarea"  type="text" placeholder="Description" value="hello@"></textarea>
             </p>
           
             <label class="label">Original Price</label>
            <p class="control">
              <input v-model = 'product.originalPrice' name = 'originalPrice' class="input" type="number" placeholder="Number input">
            </p>
            <label class="label">Discounted Price</label>
            <p class="control">

              <input v-model = 'product.discountedPrice' name = 'discountedPrice' class="input" type="number" placeholder="Number input">
            </p>

            <div style = "background-color :#67efc8">
            <label class="label">Status</label>
              <p class="control">
              <ul> 
              <span>True</span>
              <input v-model = 'product.status' name = 'status' value = "true" type="radio" checked = "checked">
              <span>false</span>
              <input v-model = 'product.status'  name = 'status' value = "false" type="radio" >
              </ul>
               </p>
             
              
            <label class="label">Is Deleted</label>
              <p class="control">
              <ul>
              <span>True</span>
              <input  v-model = 'product.isDeleted' name = 'isDeleted' value = "true" type="radio" checked = "checked">
              <span>false</span>
              <input v-model = 'product.isDeleted'   name = 'isDeleted' value = "false" type="radio" >
               </ul>
               </p>

              </div>
              </br> 
            

          </div>
        </article>

      </div>
      

       <div class="tile is-parent is-4">

        <article class="tile is-child box">
         

          <div class="block">
            <label class="label">Qunatity</label>
            <p class="control">
              <input v-model = 'product.quantity' name = 'quantity' class="input" type="number" placeholder="Number input">
            </p>
            <label class="label">Tax</label>
            <p class="control has-icon has-icon-right">
              <input v-model = 'product.typeoftax' name = 'typeoftax' class="input" type="text" placeholder="Text input" value="Type of tax">
              <input  v-model = 'product.taxamount' name = 'taxamount' class="input" type="number" placeholder="Tax Amount">
            </p>
             
            <div style = "background-color :#67efc8">

            <label class="label">Is featured</label>

             <p class="control">
              <ul>
              <span>True</span>
              <input  v-model = 'product.isFeatured' name = 'isFeatured' value = "true" type="radio" checked = "checked">
              <span>false</span>
              <input  v-model = 'product.isFeatured' name = 'isFeatured' value = "false" type="radio" >
              </ul>
               </p>



              <label class="label">Is New Product</label>
               <p class="control">
              <ul>
              <span>True</span>
              <input  v-model = 'product.isNewProduct' name = 'isNewProduct' value = "true" type="radio" checked = "checked">
              <span>false</span>
              <input v-model = 'product.isNewProduct' name = 'isNewProduct' value = "false" type="radio" >
              </ul>
              </p>

           
             <label class="label">Is on Sale</label>
             <p class="control">
              <ul>
              <span>True</span>
              <input v-model= 'product.isOnSale' name = 'isOnSale' value = "true" type="radio" checked = "checked">
              <span>false</span>
              <input  v-model = 'product.isOnsale' name = 'isOnSale' value = "false" type="radio" >
              </ul>
              </p>
             

             </div>
            
            <label class="label">Average Rating</label>
            <p class="control">
              <input v-model = 'product.averageRating' name = 'averageRating' class="input" type="number" placeholder="Number input">
            </p>
             
             <label class="label">Total Reviews</label>
            <p class="control">
              <input  v-model = 'product.totalReviews' name = 'totalReviews' class="input" type="number" placeholder="Number input">
            </p>
             



          </div>
        </article>

          
         



      </div>

        <div class = "title is-parent is-4">
          <label>Main Image</label>
         <ImageUploader  @image_uploaded = 'add_uploaded_image_store($event)'></ImageUploader>
         <hr>
         <label>Product Images</label> 
          <ImageUploader :showDragDrop="true" :multiple="true" @image_uploaded = 'add_image_array($event)'></ImageUploader>
          <hr>
        </div>


           

   </div>
          <div class = '"content has-text-centered"'>
           
           <p class="control">
              <button v-on:click = "submit" class="button is-primary">Submit</button>
              <button class="button is-link">Cancel</button>
            </p>
                
            </div>

  </div>

</template>

<script>

import Cleave from 'vue-cleave'
import axios from 'axios'
import ImageUploader from '../components/ImageUploader'

import productstore from '../../store/index.js'

import 'cleave.js/dist/addons/cleave-phone.cn'
import { makeRequest } from '../../helpers/internet.js'


export default {
  components: {
    Cleave,
    ImageUploader
  },

  data () {
    return {
      demo: {
        value: '',
        rawValue: ''
      },
      content: 'Hello',
      product : {
       
          name : '' ,
          shortDescription  : '' ,
          longDescription : '' ,
          originalPrice : ''  ,
          discountedPrice : '' ,
          status : '' ,
          isDeleted : '' ,
          quantity : '' ,
          typeoftax : '' ,
          taxamount : '' ,
          isFeatured : '' , 
          isNewProduct : '' ,
          isOnsale : '' ,
          mainImage : '',
          images : []      
      }
    }
  },

  methods: {
    
    onRawValueChanged (newVal) {
      this.demo.rawValue = newVal
    },

    submit : function(){

      this.product.mainImage = productstore.getters.getImageUrl ;
      this.product.images = productstore.getters.getImageArray ;

      console.log(this.product)
      makeRequest('/admin/product' , this.product)
    } ,

    add_uploaded_image_store(image_url){
     
      productstore.dispatch('loadImageData' , image_url) 
    },

    add_image_array(image_url){

      productstore.dispatch('loadImageArray' , image_url)
    }

  },

  watch: {
    'demo.value' (newVal, oldVal) {
      console.log('value: new ->', newVal, 'old ->', oldVal)
    },
    'demo.rawValue' (newVal, oldVal) {
      console.log('rawValue: new ->', newVal, 'old ->', oldVal)
    },
    content (newVal, oldVal) {
      console.log(newVal)
    }
  }
}





</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.button {
  margin: 5px 0 0;
}

.control .button {
  margin: inherit;
}

.control.has-addons {
  @include mobile() {
    input {
      width: 100%;
    }

    input.is-expanded {
      flex-shrink: 1;
    }
  }
}

.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

</style>
