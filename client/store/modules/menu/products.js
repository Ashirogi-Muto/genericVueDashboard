import lazyLoading from './lazyLoading'

export default {
  name: 'Products',
  meta: {
    icon: 'fa-table',
    expanded: true,
    auth: true
  },

  children: [
    {
      name: 'Add Products',
      path: '/products/index',
      meta: {
        label: 'Add Products',
        link: 'products/index.vue',
        auth: true
      },
      component: lazyLoading('products/index')
    },
    {
      name: 'View Products',
      path: '/products/viewProducts',
      meta: {
        label: 'View Products',
        link: 'products/viewProducts.vue',
        auth: true
      },
      component: lazyLoading('products/viewProducts')
    }
  ]
}
