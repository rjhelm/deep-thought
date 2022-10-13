import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check user login status
    loggedIn() {
        // checks if there is a valid saved token
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and token NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check for token expiration
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from local storage 
    getToken() {
        // the user token retrieved from localStorage
        return localStorage.getItem('id_token');
    }

    // retrieve token from localStorage
    login(idToken) {
        // saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout w/ reload
    logout() {
        // clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset state of app
        window.location.assign('/');
    }
}

export default new AuthService();