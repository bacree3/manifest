import database_api from './aws-exports';

class Database {
    constructor() {
        this.url = database_api;
    }

    async executeQuery(queryString) {
        const request_options = {
            'method': 'GET',
            'headers': {
                'query': queryString
            }
        };
        return fetch(this.url, request_options);
    }

    async insertValues(table, columns, values) {
        // to do: generate query strings
        // queryString = ??
        return await executeQuery(queryString);
    }

    async editValues(table, identifier, columns, value) {
        // to do: generate query strings
        // queryString = ??
        return await executeQuery(queryString);
    }

    async readValues(table, identifier, value) {
        // to do: generate query strings
        // queryString = ??
        return await executeQuery(queryString);
    }
}

class Journal {

    constructor() {
        let db = new Database();
    }

    async addJournalEntry() {
        // uses insert Values
    }

    async editJournalEntry() {

    }

    sync delete() {

    }
}

export default Database;
