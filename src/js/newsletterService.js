import ajax, { API_URL } from './ajax';
const NEWSLETTER_API = `${API_URL}/newsletter`;

function signUp(name, email) {
    return new Promise((resolve, reject) => {
        ajax(`${NEWSLETTER_API}/add`, 'POST', { name, email })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export { signUp };
