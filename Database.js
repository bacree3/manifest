import database_api from './aws-exports';
import axios from 'axios';

class Database {
    constructor() {
        this.url = "https://ivbz5omkn7.execute-api.us-east-1.amazonaws.com/ManifestRDSGeneric";
    }

    async executeQuery(queryString) {
        return axios.get(this.url, {
            'headers': {
                'query': queryString
            }
        });
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

    async editCompositeValues(table, identifier_array, identifier_value_array, columns, values) {
        let updateString = '';
        columns.forEach((item, i) => {
            updateString += item + ' = "' + values[i] + '",';
        });
        // remove extra comma
        updateString = updateString.slice(0, -1);

        let queryString = 'UPDATE '  + '`' + table + '` SET ' + updateString
            + ' WHERE ' + identifier_array[0] + ' = "' + identifier_value_array[0] + '" AND '
            + '`' + identifier_array[1] + '` = "' + identifier_value_array[1] + '";';
        console.log(queryString);
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

    async deleteCompositeValues(table, identifier_array, identifier_value_array) {
        let queryString = 'DELETE FROM ' + '`' + table + '`' + ' WHERE '
            + identifier_array[0] + ' = "' + identifier_value_array[0] + '" AND '
            + '`' + identifier_array[1] + '` = "' + identifier_value_array[1] + '";';
        console.log(queryString);
        return await this.executeQuery(queryString);
    }
}

class Journal {

    constructor() {
        let db = new Database();
        let table = 'journal';
    }

    async add(userID, category, message, timestamp) {
        return await db.insertValues(this.table, ['uid', 'category', 'message', 'timestamp'], [userID, category, message, timestamp])
    }

    async edit(userID, category, message, timestamp) { //checks the condition where column uid = userID
        return await db.editCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp], ['category', 'message'], [category, message])
    }

    async delete(userID, timestamp) {
        return await db.deleteCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp])
    }
}

class DailyTracker {

    constructor() {
        let db = new Database();
        let table = 'daily_tracker';
    }

    async add(userID, timestamp, stressLevel, anxietyLevel, energyLevel, mood, improvement) {
        return await db.insertValues(this.table, ['uid', 'timestamp', 'stress_lvl', 'anxiety_lvl', 'energy_lvl', 'mood', 'improvement'], [userID, timestamp, stressLevel, anxietyLevel, energyLevel, mood, improvement])
    }

    async edit(userID, timestamp, stressLevel, anxietyLevel, energyLevel, mood, improvement) { //checks the condition where column uid = userID
        return await db.editCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp], ['stress_lvl', 'anxiety_lvl', 'energy_lvl', 'mood','improvement'], [stressLevel, anxietyLevel, energyLevel, mood, improvement], )
    }

    async delete(userID, timestamp) {
        return await db.deleteCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp])
    }
}

class Community {

    constructor() {
        let db = new Database();
        let table = 'community';
    }

    async add(groupID, hostUID, memberUIDarray) {
        return await db.insertValues(this.table, ['id', 'host_uid', 'member_uid_array'], [groupID, hostUID, memberUIDarray])
    }

    async edit(groupID, hostUID, memberUIDarray) { //checks the condition where column id = groupID
        return await db.editValues(this.table, 'id', groupID, ['host_uid', 'member_uid_array'], [hostUID, memberUIDarray])
    }

    async delete(groupID) { //deletes entire group
        return await db.delete(this.table, 'id', groupID)
    }
}


class Goals {

    constructor() {
        let db = new Database();
        let table = 'goals';
    }

    async add(userID, timestamp, category, name, time, freq, notification, progress) {
        return await db.insertValues(this.table, ['uid', 'timestamp', 'category', 'name', 'time', 'freq', 'notification', 'progress'], [userID, timestamp, category, name, time, freq, notification, progress])
    }

    async edit(userID, timestamp, category, name, time, freq, notification, progress) { //checks the condition where column uid = userID
        return await db.editCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp], ['timestamp', 'category', 'name', 'time', 'freq', 'notification', 'progress'], [timestamp, category, name, time, freq, notification, progress])
    }

    async delete(userID, timestamp) {
        return await db.deleteCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp])
    }
}
export default Database;
