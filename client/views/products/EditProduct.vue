<template>
    <div>
        <div class="block">
            <div class="columns">
                <div class="column is-6">
                    <label class="label">Name</label>
                    <p class="control">
                        <input v-model="productDetails.name" name='name' class="input" type="text" placeholder="Text input">
                    </p>
                </div>
                <div class="column is-6">
                    <label class="label">Short Description</label>
                    <p class="control has-icon has-icon-right">
                        <input v-model="productDetails.shortDescription" name='shortDescription' class="input" type="text" placeholder="Text input" value="bulma">
                    </p>
                </div>
            </div>
            <div class="columns">
                <div class="column is-12">
                    <label class="label">Long Description</label>
                    <p class="control">
                        <textarea v-model='productDetails.longDescription' class="textarea" type="text" placeholder="Description" value="hello@"></textarea>
                    </p>
                </div>
            </div>
            <div class="columns">
                <div class="column is-6">
                    <label class="label">Original Price</label>
                    <p class="control">
                        <input v-model='productDetails.originalPrice' name='originalPrice' class="input" minlength="1" type="number" placeholder="Number input">
                    </p>
                </div>
                <div class="column is-6">
                    <label class="label">Discounted Price</label>
                    <p class="control">
                        <input v-model='productDetails.discountedPrice' name='discountedPrice' class="input" minlength="1" type="number" placeholder="Number input">
                    </p>
                </div>
            </div>
            <div class="columns">
                <div class="column is-3">
                    <div class="field">
                        <label class="label">Is Featured</label>
                        <p class="control">
                            <span class="select">
                                <select v-model="productDetails.isFeatured">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </span>
                        </p>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="field">
                        <label class="label">Is New Product</label>
                        <p class="control">
                            <span class="select">
                                <select v-model="productDetails.isNewProduct">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </span>
                        </p>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="field">
                        <label class="label">Is On Sale</label>
                        <p class="control">
                            <span class="select">
                                <select v-model="productDetails.isOnSale">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </span>
                        </p>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="field">
                        <label class="label">Quantity</label>
                        <p class="control">
                            <input type="number" class="input" v-model="productDetails.quantity" minlength="0"> 
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="" style="margin: auto;">
                    <button class="button is-outlined is-medium is-success">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import product from '../../store/index.js';
import { makeRequest } from '../../helpers/internet.js';
let productDetails = [];
export default {
    data() {
        return {
            productDetails
        }
    },
    created() {
        makeRequest('/admin/product/' + this.$route.params.productId)
            .then((response) => {
                this.productDetails = response.data;
                console.log(this.productDetails);
            }, error => {
                console.log(error);
            });
    }
}
</script>
