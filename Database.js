import React from 'react';
import database_api from './aws-exports';

class Database {
    constructor() {
        this.url = database_api;
    }

    executeQuery(queryString) {
        const request_options = {
            'method': 'GET',
            'headers': {
                'query': queryString
            }
        };
        let request = fetch(this.url, request_options)
        request.then((response) => response.json()).then((json) => {
            return json;
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default Database;
