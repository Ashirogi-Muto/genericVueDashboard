<template>
    <div>
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">Table</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Short Description</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Short Description</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="product in allProd" :key="product.name">
                                <td>{{product.name}}</td>
                                <td>{{product.shortDescription}}</td>
                                <td>{{product.sku}}</td>
                                <td>{{product.quantity}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="columns">
                        <div class="column is-7 is-offset-5">
                            <nav class="pagination">
                                <button class="pagination-previous button is-primary" :disabled="!allPages.hasPrev">Previous</button>
                                <button class="pagination-next button is-primary" :disabled="!allPages.hasNext">Next page</button>
                                <ul class="pagination-list">
                                    <div v-for="x in lastIndex" :key="x">
                                        <li v-if="x >= startIndex">
                                            <button @click="sendPageRequest(x, allPages.current)" class="pagination-link button is-primary">{{ x }}</button>
                                            <span class="pagination-ellipsis">&hellip;</span>
                                        </li>
                                    </div>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>
<script>
import product from '../../store/index.js'
import { makeRequest } from '../../helpers/internet.js'
import { MAX_PAGE_NUMBER } from '../../helpers/constant.js';
let tempData = [];
export default {
    beforeMount() {
        makeRequest('/admin/productsearch?page=1')
            .then((response) => {
                tempData = response.data;
                product.dispatch('loadProducts', tempData);

            }, error => {
                console.log(error);
            });
    },
    mounted() {

    },
    data() {
        return {
            startIndex: 1,
            lastIndex: MAX_PAGE_NUMBER,
        }
    },
    methods: {
        sendPageRequest: function (index, currentPage) {
            this.calculatePage(index);
            if (index === currentPage) {
                return;
            }
            makeRequest('/admin/productsearch?page=' + index)
                .then((response) => {
                    tempData = response.data;
                    product.dispatch('loadProducts', tempData);

                }, error => {
                    console.log(error);
                });
        },
         calculatePage: function (index) {
            if (index % MAX_PAGE_NUMBER === 0) {
                this.startIndex = index + 1;
                this.lastIndex = this.startIndex + MAX_PAGE_NUMBER - 1;
            }
        }
    },
    computed: {
        allProd() {
            return product.getters.allProducts
        },
        allPages() {
            return product.getters.pageInfoData
        },
        allItems() {
            return product.getters.itemInfoData
        },
    }
}
</script>

