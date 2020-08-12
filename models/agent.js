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

module.exports.getClients = async (agentID) => {
    const sql = await sqlPromise;

    let query = 'SELECT id, username, email FROM users WHERE role="client" AND metarole='+agentID;
    console.log(query);
    // now query the table and output the results
    const [rows] = await sql.query(query);

    return rows.map((row) => {
        return {
            id: row.id,
            username: row.username,
            email: row.email
        };
    });
};

module.exports.transferAgent = async (oldAgentID, newAgentID,) => {
    const sql = await sqlPromise;

    let query = 'UPDATE `CRIP`.`users` SET `metarole` =' + newAgentID + ' WHERE (`metarole` =' + oldAgentID + ')';
    //'SELECT id, username, email FROM users WHERE role="client" AND metarole='+agentID;
    console.log(query);
    // now query the table and output the results
    await sql.query(query);

};