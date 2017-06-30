<template>
    <div>
        <div class="columns">
            <div class="column is-6">
                <div class="columns">
                    <div class="column is-4">
                        <p class="control">
                            <input @input="getName" :value="sku" class="input" type="text" placeholder="Search By Name">
                        </p>
                    </div>
                    <div class="column is-4">
                        <p class="control">
                            <button @click="searchProduct({name: true})" class="button is-info">
                                Search
                            </button>
                        </p>
                    </div>
                    <div class="column is-4" v-show="clearSearchByName">
                        <p class="control">
                            <button @click="clearResults" class="button is-info">
                                Clear
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="columns">
                    <div class="column is-4">
                        <p class="control">
                            <input @input="getSku" :value="sku" class="input" type="text" placeholder="Search By SKU">
                        </p>
                    </div>
                    <div class="column is-4">
                        <p class="control">
                            <button @click="searchProduct({sku: true})" class="button is-info">
                                Search
                            </button>
                        </p>
                    </div>
                    <div class="column is-4" v-show="clearSearchBySku">
                        <p class="control">
                            <button @click="clearResults()" class="button is-info">
                                Clear
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">All Products</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Short Description</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Short Description</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Edit</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="product in allProd" :key="product.name">
                                <td>{{product.name}}</td>
                                <td>{{product.shortDescription}}</td>
                                <td>{{product.sku}}</td>
                                <td>{{product.quantity}}</td>
                                <td>
                                    <button @click="editProduct(product._id)" class="button is-primary">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="columns">
                        <div class="column is-7 is-offset-5">
                            <nav class="pagination">
                                <button @click="fetchPreviousPage(allPages.next, allPages.current)" class="pagination-previous button is-primary" :disabled="!allPages.hasPrev">Previous</button>
                                <button @click="fetchNextPage(allPages.next, allPages.current)" class="pagination-next button is-primary" :disabled="!allPages.hasNext">Next page</button>
                                <ul class="pagination-list" v-if="allPages.hasPrev && allPages.hasPrev">
                                    <div v-for="x in lastIndex" :key="x">
                                        <div v-if="lastIndex <= allItems.total">
                                            <li v-if="x >= startIndex">
                                                <button @click="sendPageRequest(x, allPages.current)" class="pagination-link button is-primary">{{ x }}</button>
                                                <span class="pagination-ellipsis">&hellip;</span>
                                            </li>
                                        </div>
                                    </div>
                                </ul>
                                <div v-else>
                                    <p>No More Results</p>
                                </div>
                            </nav>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>
<script>
import router from '../../router/index.js';
import product from '../../store/index.js';
import { makeRequest } from '../../helpers/internet.js';
import { MAX_PAGE_NUMBER } from '../../helpers/constant.js';
let tempData = [];
export default {
    beforeMount() {
        makeRequest('/admin/productsearch?page=1')
            //makeRequest('/admin/product')
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
            searchByName: '',
            searchBySku: '',
            clearSearchByName: false,
            clearSearchBySku: false
        }
    },
    methods: {
        calculatePage(index) {
            if (index % MAX_PAGE_NUMBER === 0) {
                this.startIndex = index + 1;
                this.lastIndex = this.startIndex + MAX_PAGE_NUMBER - 1;
            }
        },
        callSearchApi(searchText) {
            makeRequest(searchText)
                .then((response) => {
                    tempData = response.data;
                    product.dispatch('loadProducts', tempData);
                }, error => {
                    console.log(error);
                });
        },
        clearResults() {
            this.clearSearchByName = false;
            this.clearSearchBySku = false;
            makeRequest('/admin/productsearch?page=1')
                .then((response) => {
                    tempData = response.data;
                    product.dispatch('loadProducts', tempData);

                }, error => {
                    console.log(error);
                });
        },
        editProduct(productId){
            console.log(productId);
            router.push({name: 'Edit Product', params: {productId}});
        },
        fetchPreviousPage(pageCounter, current) {
            this.sendPageRequest(current, pageCounter);
        },
        fetchNextPage(pageCounter, current) {
            this.sendPageRequest(pageCounter, current);
        },
        getName(e) {
            this.searchByName = e.target.value;
        },
        getSku(e) {
            this.searchBySku = e.target.value;
        },
        searchProduct(searchMode) {
            if (searchMode.name) {
                this.clearSearchByName = true;
                const url = '/admin/productsearch?name=' + this.searchByName;
                this.callSearchApi(url);
            }
            if (searchMode.sku) {
                this.clearSearchBySku = true;
                const url = '/admin/productsearch?sku=' + this.searchBySku;
                this.callSearchApi(url);
            }
        },
        sendPageRequest(index, currentPage) {
            this.calculatePage(index);
            if (index === currentPage) {
                return;
            }
            console.log(index);
            makeRequest('/admin/productsearch?page=' + index)
                .then((response) => {
                    tempData = response.data;
                    product.dispatch('loadProducts', tempData);

                }, error => {
                    console.log(error);
                });
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
        name() {
            return this.searchByName;
        },
        sku() {
            return this.searchBySku;
        }
    }
}
</script>