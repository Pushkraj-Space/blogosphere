module.exports = {
    host : process.env._DB_HOST || "localhost",
    user: process.env._DB_USER || "root",
    password: process.env._DB_PASSWORD || "",
    database: process.env._DB_DATABASE || "blogosphere",
    connectionLimit : process.env._DB_CONNECTION_LIMIT || 8,
    port : process.env._DB_PORT || 3306
}