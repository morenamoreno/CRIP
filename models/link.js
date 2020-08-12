'use strict';

const fs = require('fs');
const util = require('util');
const mysql = require('mysql2/promise');

// promisify some filesystem functions
fs.unlinkAsync = fs.unlinkAsync || util.promisify(fs.unlink);
fs.renameAsync = fs.renameAsync || util.promisify(fs.rename);

const config = require('../config');

const sqlPromise = mysql.createConnection(config.mysql);

(async () => {
    const sql = await sqlPromise;
    // handle unexpected errors by just logging them
    sql.on('error', (err) => {
        console.error(err);
        sql.end();
    });
})();

module.exports.getPolicies = async (clientID) => {
    const sql = await sqlPromise;

    let query = 'SELECT client, name, type FROM policy WHERE client=3';

    // now query the table and output the results
    const [rows] = await sql.query(query);

    return rows.map((row) => {
        return {
            client: row.client,
            name: row.name,
            type: row.type
        };
    });
};