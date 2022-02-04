import Config from 'react-native-config';
import lodashGet from 'lodash/get';

function loadScript(d, s, id, jsSrc, cb, onError) {
    const element = d.getElementsByTagName(s)[0];
    const fjs = element;
    let js = element;
    js = d.createElement(s);
    js.id = id;
    js.src = jsSrc;
    if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
    } else {
        d.head.appendChild(js);
    }
    js.onerror = onError;
    js.onload = cb;
}

function getGoogleApi() {
    return window.gapi;
}

/**
 * Effect hook that loads Google script into the DOM, initialize the Google API and returns a function to signIn the
 * user with their Google account
 *
 * @returns {Promise<{ token: string, email: string }>}
 */
function signInWithGoogle() {
    if (!lodashGet(getGoogleApi(), 'auth2')) {
        return Promise.reject(new Error('Google Auth not ready'));
    }
    const GoogleAuth = getGoogleApi().auth2.getAuthInstance();
    return GoogleAuth.signIn().then((res) => {
        const basicProfile = res.getBasicProfile();
        const authResponse = res.getAuthResponse();
        return {
            token: authResponse.id_token,
            email: basicProfile.getEmail(),
        };
    });
}

/**
 * Load Google script into the DOM and initialize the Google Auth API
 */
loadScript(
    document,
    'script',
    'google-login',
    'https://apis.google.com/js/api.js',
    () => getGoogleApi().load('auth2', () => getGoogleApi().auth2.init({ // Load Google Auth
        clientId: lodashGet(Config, 'GOOGLE_CLIENT_ID', ''),
    })),
);

export default signInWithGoogle;