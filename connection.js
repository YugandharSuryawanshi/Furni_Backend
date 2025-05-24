// import mysql from 'mysql2';
// import { config } from './config/config.js';
// import { promisify } from 'util';

// let conn;

// function handleDisconnect() {
//     conn = mysql.createConnection({
//         host: config.db.host || 'localhost',
//         user: config.db.user || 'root',
//         password: config.db.password || '',
//         database: config.db.database || 'furni_shop'
//     });

//     conn.connect((err) => {
//         if (err) {
//             console.error('Error connecting to database:', err);
//             setTimeout(handleDisconnect, 2000); // Retry after 2s
//         } else {
//             console.log('Database connected successfully!');
//         }
//     });

//     conn.on('error', (err) => {
//         console.error('DB Error:', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.log('Reconnecting to DB...');
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// }

// handleDisconnect();

// // Function to always get the current connection for queries
// function exe(sql, params) {
//     return new Promise((resolve, reject) => {
//         if (!conn || conn.state === 'disconnected') {
//             console.log('Reconnecting before executing query...');
//             handleDisconnect();
//             return reject(new Error('Database connection was closed. Reconnecting...'));
//         }

//         conn.query(sql, params, (err, results) => {
//             if (err) return reject(err);
//             resolve(results);
//         });
//     });
// }

// export { exe };
















import mysql from 'mysql2/promise';
import { config } from './config/config.js';

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: config.db.host || 'localhost',
    user: config.db.user || 'root',
    password: config.db.password || '',
    database: config.db.database || 'furni_shop',
    port: config.db.port || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, // 10 seconds
});

// Reusable function to execute SQL queries using the pool
async function exe(sql, params = []) {
    let conn;
    try {
        conn = await pool.getConnection();       // Get connection from pool
        const [rows] = await conn.execute(sql, params); // Use .execute for prepared statements
        return rows;
    } catch (err) {
        console.error('Database Query Error:', err.message);
        throw err;
    } finally {
        if (conn) conn.release(); // Always release connection back to the pool
    }
}

export { exe };

