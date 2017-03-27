export const keys = {
    INDEX: 'INDEX',
    ABOUT: 'ABOUT',
    EVENT: 'EVENT',
    DAY: 'DAY',
    ADMIN: 'ADMIN',
    DEFAULT: 'DEFAULT'
}

export default {
    '/': {
        key: 'INDEX',
        '/about': {
            key: 'ABOUT'
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
