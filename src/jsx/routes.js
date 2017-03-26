export default {
    '/': {
        key: 'INDEX',
        '/about': {
            key: 'ABOUT',
            title: 'About this PhotoCalendarBlogPage'
        },
        '/event': {
            '/:eventId': {}
        },
        '/day': {
            '/:dateString': {}
        },
        '/admin': {}
    }
}
