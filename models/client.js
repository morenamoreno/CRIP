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

    // now query the table and output the results
    const [rows] = await sql.query(sql.format('SELECT id, client, name, type, valid FROM policy WHERE client = ?', [clientID]));

    return rows.map((row) => {
        return {
            id: row.id,
            client: row.client,
            name: row.name,
            type: row.type,
            Expiry: row.Expiry
        };
    });
};

module.exports.addClient = async (username, password, email, role, metarole) => {
    const sql = await sqlPromise;

    // now query the table and output the results
    const [rows] = await sql.query(sql.format('insert ignore into CRIP.users(username, password, email, role, metarole) values (?,?,?,?,?)', [username, password, email, role, metarole]));

};

module.exports.addPolicy = async (client, name, type, valid) => {
    const sql = await sqlPromise;

    // now query the table and output the results
    const [rows] = await sql.query(sql.format('insert ignore into CRIP.policy(client, name, type, valid) values (?,?,?,?)', [client, name, type, valid]));

};

module.exports.deletePolicy = async (policyID) => {
    const sql = await sqlPromise;

    // now query the table and output the results
    await sql.query(sql.format('DELETE FROM `CRIP`.`policy` WHERE (`id` = ?)', [policyID]));

};

module.exports.getDisclosures = async () => {
    const sql = await sqlPromise;
    // now query the table and output the results
    const [rows] = await sql.query('SELECT id, client, email, token, valid FROM disclosure');
    return rows.map((row) => {
        return {
            id: row.id,
            client: row.client,
            email: row.email,
            token: row.token,
            valid: row.valid
        };
    });
};

module.exports.addDisclosure = async (client, email, token, valid) => {
    const sql = await sqlPromise;

    // now query the table and output the results
    const [rows] = await sql.query(sql.format('insert ignore into CRIP.disclosure(client, email, token, valid) values (?,?,?,?)', [client, email, token, valid]));

};

module.exports.validateToken = async (token) => {
    const sql = await sqlPromise;

    // now query the table and output the results
    const [rows] = await sql.query('SELECT id, client, email, token, valid FROM CRIP.disclosure WHERE token like "' + token+'"');
    return rows.map((row) => {
        return {
            id: row.id,
            client: row.client,
            email: row.email,
            token: row.token,
            valid: row.valid
        };
    });


};