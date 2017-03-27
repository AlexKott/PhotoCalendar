export default {
    '/': {
        key: 'INDEX',
        '/about': {
            key: 'ABOUT',
            title: 'About this PhotoCalendarBlogPage'
        },
        '/event': {
            '/:eventId': {
                key: 'EVENT'
            }
        },
        '/day': {
            '/:dateString': {
                key: 'DAY'
            }
        },
        '/admin': {
            key: 'ADMIN'
        }
    }
}
