import lazyLoading from './lazyLoading'

export default {
  name: 'Products',
  meta: {
    icon: 'fa-table',
    expanded: true,
    auth: false
  },

  children: [
    {
      name: 'Add Products',
      path: '/products/index',
      meta: {
        label: 'Add Products',
        link: 'products/index.vue',
        auth: false
      },
      component: lazyLoading('products/index')
    },
    {
      name: 'View Products',
      path: '/products/viewProducts',
      meta: {
        label: 'View Products',
        link: 'products/viewProducts.vue',
        auth: false
      },
      component: lazyLoading('products/viewProducts')
    }
  ]
}
