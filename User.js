// amplify api doc: https://aws-amplify.github.io/amplify-js/api/classes/authclass.html

import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import awsconfig from './aws-exports';

class User {
    constructor() {
        this.config = Amplify.configure(awsconfig);
    }

    async getUserInfo() {
        return Auth.currentUserInfo();
    }

}

export default User;
