<template>
    <div>
        <div class="columns">
            <div class="column is-6">
                <div class="field has-addons">
                    <p class="control">
                        <input v-model="searchText" class="input" type="text" placeholder="Find a repository">
                    </p>
                </div>
            </div>
            <div class="column is-6">
                <p class="control">
                    <a v-on:click="searchProduct" class="button is-info">
                        Search
                    </a>
                </p>
            </div>
        </div>
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">Table</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Short Description</th>
                                <th>Original Price</th>
                                <th>Discounted Price</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Short Description</th>
                                <th>Original Price</th>
                                <th>Discounted Price</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="product in allProd" :key="product.name">
                                <td>{{product.name}}</td>
                                <td>{{product.shortDescription}}</td>
                                <td>{{product.originalPrice}}</td>
                                <td>{{product.discountedPrice}}</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </div>
        </div>
    </div>
</template>
<script>
import product from '../../store/index.js'
import { makeRequest } from '../../helpers/internet.js'
let tempData = [];
export default {
    beforeMount() {
        
        makeRequest('/admin/product')
            .then((response) => {
                console.log(response.data);
                tempData = response.data.slice();
                product.dispatch('LOAD_PRODUCT_LIST', tempData);

            }, error => {
                console.log(error);
            });
    },
    mounted() {

    },
    data() {
        return {
         searchText: ''   
        }
    },
    methods: {
        searchProduct: function(){
            console.log(this.searchText);
        }
    },
    computed: {
        allProd() {
            return product.getters.allProducts
        }
    }
}
</script>

