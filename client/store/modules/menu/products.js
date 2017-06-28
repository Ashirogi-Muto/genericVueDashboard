import lazyLoading from './lazyLoading'

export default {
  name: 'Products',
  meta: {
    icon: 'fa-table',
    expanded: true
  },

  children: [
    {
      name: 'ProductsAdd',
      path: '/products/index',
      meta: {
        label: 'Add Products',
        link: 'products/index.vue'
      },
      component: lazyLoading('products/index')
    },
    {
      name: 'View Products',
      path: '/products/viewProducts',
      meta: {
        label: 'View Products',
        link: 'products/viewProducts.vue'
      },
      component: lazyLoading('products/viewProducts')
    }
  ]
}
