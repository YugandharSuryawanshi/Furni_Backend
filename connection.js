// // import mysql from 'mysql2';
// // import { config } from './config/config.js';
// // import { promisify } from 'util';

// // // Database connection setup
// // const conn = mysql.createConnection({
// //     host: config.db.host || 'localhost',
// //     user: config.db.user || 'root',
// //     password: config.db.password || '',
// //     database: config.db.database || 'furni_shop'
// // });

// // // Connect to the database
// // conn.connect((err) => {
// //     if (err) {
// //         console.error('Error connecting to database:', err);
// //         return;
// //     }
// //     console.log('Database connected successfully!');
// // });

// // // Promisify the query method for async/await use
// // const exe = promisify(conn.query).bind(conn);

// // // Export 'exe' for use in other files
// // export { exe };




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
//             handleDisconnect(); // Reconnect
//         } else {
//             throw err;
//         }
//     });
// }

// handleDisconnect();

// const exe = promisify(() => conn.query(...arguments)).bind(conn);

// export { exe };


import mysql from 'mysql2';
import { config } from './config/config.js';
import { promisify } from 'util';

let conn;

function handleDisconnect() {
    conn = mysql.createConnection({
        host: config.db.host || 'localhost',
        user: config.db.user || 'root',
        password: config.db.password || '',
        database: config.db.database || 'furni_shop'
    });

    conn.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000); // Retry after 2s
        } else {
            console.log('Database connected successfully!');
        }
    });

    conn.on('error', (err) => {
        console.error('DB Error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Reconnecting to DB...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// Function to always get the current connection for queries
function exe(sql, params) {
    return new Promise((resolve, reject) => {
        if (!conn || conn.state === 'disconnected') {
            console.log('Reconnecting before executing query...');
            handleDisconnect();
            return reject(new Error('Database connection was closed. Reconnecting...'));
        }

        conn.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export { exe };

