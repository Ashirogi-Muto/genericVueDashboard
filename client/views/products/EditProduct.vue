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
					<div class="box">
						<quill :options="{ theme: 'snow' }">
							<h2>One Ring to Rule Them All</h2>
							<p>
								<a href="#!">http://en.wikipedia.org/wiki/One_Ring</a>
							</p>
							<p>
								<br/>
							</p>
							<p>Three Rings for the
								<em>Elven-kings</em> under the sky,</p>
							<p>Seven for the
								<u>Dwarf-lords</u>
								<span> in halls of stone</span>,</p>
							<p>Nine for
								<u>Mortal Men</u>, doomed to die,</p>
							<p>One for the
								<u>Dark Lord</u> on his dark throne.</p>
							<p>
								<br/>
							</p>
							<p>In the Land of Mordor where the Shadows lie.</p>
							<p>One Ring to
								<strong>rule</strong> them all, One Ring to
								<strong>find</strong> them,</p>
							<p>One Ring to
								<strong>bring</strong> them all and in the darkness
								<strong>bind</strong> them.</p>
							<p>In the Land of Mordor where the Shadows lie.</p>
						</quill>
					</div>
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
							<input type="number" class="input" v-model="productDetails.quantity" minlength="1">
						</p>
					</div>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<div v-for="image in allImages">
						<p class="control">
							<label class="label">Product Images</label>
							<img :src="'http://localhost:4000' + image" alt="Product Images" class="product-image">
						</p>
						<div class="columns">
							<div class="column">
								<input id="fileInput" @change="uploadImage($event, image)" type="file" style="display:none" />
								<button onclick="document.getElementById('fileInput').click()" class="button is-danger">Replace Image</button>
							</div>
						   <div class="column" id="remove">
							   <button @click="removeImage(image)"  class="button is-danger">Remove Image</button>
						   </div>
						</div>
					</div>
	
				</div>
			</div>
			<div class="columns">
				<div class="" style="margin: auto;">
					<button @click="submitEditForm" class="button is-outlined is-medium is-success">Submit</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import product from '../../store/index.js';
import { makeRequest } from '../../helpers/internet.js';
import Quill from 'vue-bulma-quill';
import axios from 'axios';

export default {
	mounted() {
		makeRequest('/admin/product/' + this.$route.params.productId)
			.then((response) => {
				this.productDetails = Object.assign({}, response.data);
				this.imageSource = response.data.images.slice();
			}, error => {
				console.log(error);
			});
	},
	data() {
		return {
			productDetails: Object.assign({})
		}
	},
	computed: {
		allImages() {
			return this.productDetails.images
		}
	},
	methods: {
		removeImage(image){
			this.productDetails.images = this.productDetails.images.filter(x => x !== image);
		},
		submitEditForm() {
			console.log(this.productDetails);
			makeRequest('/admin/product/' + this.$route.params.productId, this.productDetails)
				.then((respose) =>{
					console.log(respose);
				}, error =>{
					console.log(error);
				});
		},
		uploadImage(event, image) {
			const files = event.target.files;
			const config = {
				headers: { 'content-type': 'multipart/form-data' }
			};
			let data = new FormData()
			data.append('file', files.item(0))
			axios.post(`http://localhost:4000/image-upload`, data, config)
				.then(response => {
					const index = this.productDetails.images.indexOf(image);
					this.productDetails.images = this.productDetails.images.filter(x => x !== image);
					this.productDetails.images.splice(index, 0, response.data.url);
				})
				.catch(e => {
					console.log(e);
				});
		}
	}
}
//upload image using MAP function making an array of objects
// uploadImage(event, image) {
//             const files = event.target.files;
//             const config = {
//                 headers: { 'content-type': 'multipart/form-data' }
//             };
//             let data = new FormData()
//             data.append('file', files.item(0))
//             axios.post(`http://localhost:4000/image-upload`, data, config)
//                 .then(response => {
//                     const index = this.imageSource.indexOf(image);
//                     this.imageSource = this.imageSource
//                         .filter(x => x !== image)
//                         .map((x,i) => {
//                             return {
//                                 index:i,
//                                 url:x
//                             }
//                         });
//                     this.imageSource
//                         .splice(index, 0, {url:response.data.url, index:index})
//                         .slice();
//                 })
//                 .catch(e => {
//                     console.log(e);
//                 });
//         }
</script>
<style scoped>
.product-image {
	max-width: 300px !important;
}
#remove{
	margin-right:74%;
}
</style>

