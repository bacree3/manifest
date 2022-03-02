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
        let columnString = '(';
        let valueString = '(';
        columns.forEach((item, i) => {
            columnString += item + ',';
            valueString += "'" + values[i] + "',";
        });
        // remove extra comma
        columnString = columnString.slice(0, -1);
        valueString = valueString.slice(0, -1);
        // add closing parenthesis
        columnString += ')';
        valueString += ')';

        let queryString = 'INSERT INTO '  + '`' + table + '`' + columnString
            + ' VALUES ' + valueString + ';';
        console.log(queryString);
        return await this.executeQuery(queryString);
    }

    async editValues(table, identifier, columns, value) {
        // to do: generate query strings
        // queryString = ??
        return await this.executeQuery(queryString);
    }

    async readValues(table, identifier, value) {
        // to do: generate query strings
        // queryString = ??
        return await this.executeQuery(queryString);
    }
}

class Journal {

    constructor() {
        let db = new Database();
    }

    async add() {
        // uses insert Values
    }

    async edit() {

    }

    async delete() {

    }
}

export default Database;
