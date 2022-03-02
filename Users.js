import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

class Users {
    constructor() {
        this.config = Amplify.configure(awsconfig);
    }

    async getCurrentUserId() {
        return Auth.currentUserInfo()
    }

}
