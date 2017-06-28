<template>
    <div>
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">Table</h4>
                    <!--<div v-for="product in get">
                  <p>{{product.discountedPrice}}</p>
              </div>-->
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

        }
    },
    computed: {
        allProd() {
            return product.getters.allProducts
        }
    }
}
</script>

