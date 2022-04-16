import database_api from './aws-exports';
import axios from 'axios';
import User from './User';

class Database {
    constructor() {
        this.url = "https://ivbz5omkn7.execute-api.us-east-1.amazonaws.com/ManifestRDSGeneric";
    }

    async executeQuery(queryString) {
        console.log(queryString)
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
            updateString += item + " = '" + values[i] + "',";
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
        return await this.executeQuery(queryString);
    }

    async readValues(table, identifier, identifier_value) {
        let queryString = 'SELECT * FROM ' + '`' + table + '`' + ' WHERE '
            + identifier + ' = "' + identifier_value + '" ORDER BY timestamp DESC;';
        return await this.executeQuery(queryString);
    }

    async getSingleValue(table, identifier, identifier_value) {
        let queryString = 'SELECT * FROM ' + '`' + table + '`' + ' WHERE '
            + identifier + ' = "' + identifier_value + '";';
        return await this.executeQuery(queryString);
    }

    async readValuesByDate(table, identifier, identifier_value, date) {
        let queryString = 'SELECT * FROM ' + '`' + table + '`' + ' WHERE '
            + identifier + ' = "' + identifier_value + '" AND date(timestamp) = "' + date +'" ORDER BY timestamp DESC;';
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
        return await this.executeQuery(queryString);
    }
}

class JournalEntry {

    constructor() {
        this.table = 'journal';
        this.db = new Database();
    }

    async getAll(userID) {
        return this.db.readValues(this.table, 'uid', userID);
    }

    async getByDate(userID, date) {
        return this.db.readValuesByDate(this.table, 'uid', userID, date);
    }

    async add(userID, category, title, message) {
        return this.db.insertValues(this.table, ['uid', 'category', 'title', 'message'], [userID, category, title, message])
    }

    async edit(userID, title, message, timestamp) { //checks the condition where column uid = userID
        return await this.db.editCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp], ['title', 'message'], [title, message])
    }

    async delete(userID, timestamp) {
        return await this.db.deleteCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp])
    }
}

class PromptedJournalEntry {

    constructor() {
        this.table = 'prompted_entries';
        this.db = new Database();
    }

    async getAll(userID) {
        return this.db.readValues(this.table, 'uid', userID);
    }

    async getByDate(userID, date) {
        return this.db.readValuesByDate(this.table, 'uid', userID, date);
    }

    async add(userID, title, q1, q2, q3, q4, q5) {
        return this.db.insertValues(this.table, ['uid', 'title', 'q1', 'q2', 'q3', 'q4', 'q5'], [userID, title, q1, q2, q3, q4, q5])
    }

    async edit(userID, title, q1, q2, q3, q4, q5, timestamp) { //checks the condition where column uid = userID
        return await this.db.editCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp], ['title', 'q1', 'q2', 'q3', 'q4', 'q5'], [title, q1, q2, q3, q4, q5])
    }

    async delete(userID, timestamp) {
        return await this.db.deleteCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp])
    }
}

class DailyTracker {

    constructor() {
        this.db = new Database();
        this.table = 'checkin';
    }

    async getAll(userID) {
        return this.db.readValues(this.table, 'uid', userID);
    }

    async getByDate(userID, date) {
        return this.db.readValuesByDate(this.table, 'uid', userID, date);
    }

    async add(userID, stressLevel, anxietyLevel, energyLevel, mood, improvement) {
        return await this.db.insertValues(this.table, ['uid', 'stress_lvl', 'anxiety_lvl', 'energy_lvl', 'mood', 'improvement'], [userID, stressLevel, anxietyLevel, energyLevel, mood, improvement])
    }

    async edit(userID, timestamp, stressLevel, anxietyLevel, energyLevel, mood, improvement) { //checks the condition where column uid = userID
        return await this.db.editCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp], ['stress_lvl', 'anxiety_lvl', 'energy_lvl', 'mood','improvement'], [stressLevel, anxietyLevel, energyLevel, mood, improvement], )
    }

    async delete(userID, timestamp) {
        return await this.db.deleteCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp])
    }
}

class Community {

    constructor() {
        this.db = new Database();
        this.table = 'community';
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


class GoalTracker {

    constructor() {
        this.db = new Database();
        this.table = 'goals';
    }

    async getAll(userID) {
        return this.db.readValues(this.table, 'uid', userID);
    }

    async add(userID, category, name, time, freq, notification, progress, customHour) {
        return await this.db.insertValues(this.table, ['uid', 'category', 'name', 'time', 'freq', 'notification', 'progress', 'customHour'], [userID, category, name, time, freq, notification, progress, customHour])
    }

    async edit(userID, timestamp, category, name, time, freq, notification, progress, customHour) { //checks the condition where column uid = userID
        return await this.db.editCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp], ['category', 'name', 'time', 'freq', 'notification', 'progress', 'customHour'], [category, name, time, freq, notification, progress, customHour])
    }

    async update(userID, timestamp, progress) { //checks the condition where column uid = userID
        return await this.db.editCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp], ['progress'], [progress])
    }

    async delete(userID, timestamp) {
        return await this.db.deleteCompositeValues(this.table, ['uid', 'timestamp'], [userID, timestamp])
    }
}

class UserSettings {
    constructor() {
        this.db = new Database();
        this.table = 'user_settings';
    }

    async addNewUser(userID) {
        return this.db.insertValues(this.table, ['uid'], [userID]);
    }

    async getUserSettings(userID) {
        return this.db.getSingleValue(this.table, 'uid', userID)
    }

    async updateUserSettings(userID, min_stress, min_energy, min_anxiety, max_stress, max_energy, max_anxiety) {
        return this.db.editValues(this.table, 'uid', userID, ['min_stress', 'min_energy', 'min_anxiety', 'max_stress', 'max_energy', 'max_anxiety'], [min_stress, min_energy, min_anxiety, max_stress, max_energy, max_anxiety]);
    }

    async addFriendRequest(userID, updatedRequests) {
        return this.db.editValues(this.table, 'uid', userID, ['pending_invitations'], [updatedRequests]);
    }

    async acceptFriendRequest(userID, friendID) {

    }

    async updateFriendPermissions(userID, friendID) {

    }

}

export {
    Database,
    JournalEntry,
    PromptedJournalEntry,
    DailyTracker,
    Community,
    GoalTracker,
    UserSettings
};
