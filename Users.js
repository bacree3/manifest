// amplify api doc: https://aws-amplify.github.io/amplify-js/api/classes/authclass.html

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

class Users {
    constructor() {
        this.config = Amplify.configure(awsconfig);
    }

    async getUserInfo() {
        return Auth.currentUserInfo();
    }

}
