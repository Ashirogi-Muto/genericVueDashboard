import lazyLoading from './lazyLoading';

export default {
    name: 'Custom Component',
    meta: {
        icon: 'fa-table',
        expanded: true,
        auth: true
    },
    children: [
        {
            name: 'Add Custom Component',
            path: '/custom/index',
            meta: {
                label: 'Add Custom',
                link: 'custom/index.vue'
            },
            component: lazyLoading('custom/index')
        }
    ]
}