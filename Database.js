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
        return await this.executeQuery(queryString);
    }

    async editValues(table, identifier, identifier_value, columns, values) {
        let updateString = '';
        columns.forEach((item, i) => {
            updateString += item + ' = "' + values[i] + '",';
        });
        // remove extra comma
        updateString = updateString.slice(0, -1);

        let queryString = 'UPDATE '  + '`' + table + '` SET ' + updateString
            + ' WHERE ' + identifier + ' = ' + '"' + identifier_value + '"' + ';';
        return await this.executeQuery(queryString);
    }

    async readValues(table, identifier, identifier_value) {
        let queryString = 'SELECT * FROM ' + '`' + table + '`' + ' WHERE '
            + identifier + ' = "' + identifier_value + '";';
        return await this.executeQuery(queryString);
    }

    async deleteValues(table, identifier, identifier_value) {
        let queryString = 'DELETE FROM ' + '`' + table + '`' + ' WHERE '
            + identifier + ' = "' + identifier_value + '";';
        return await this.executeQuery(queryString);
    }
}

class Journal {

    constructor() {
        let db = new Database();
        let table = 'journal';
    }

    // example add
    async add(userid, category, message) {
        return await db.insertValues(this.table, ['uid', 'category', 'message'], [userid, category, message])
    }

    async edit() {

    }

    async delete() {

    }
}

export default Database;
