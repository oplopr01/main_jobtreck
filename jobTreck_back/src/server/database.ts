// Import necessary modules from TypeORM and mysql
import { Connection, ConnectionOptions, createConnection } from "typeorm";

// Import your entities (models)
import AppliedJob from "../models/appliedjob";
import ActiveSession from "../models/activeSession";
import User from "../models/user";
import Role from "../models/role";
import Job from "../models/job";
// Define MySQL connection options
const options: ConnectionOptions = {
  entities: [User, ActiveSession, Role, Job,AppliedJob],
  logging: true,
  type: "mysql", // Specify the database type
  host: "localhost", // MySQL server host
  port: 3306, // MySQL server port (default is 3306)
  username: "root", // MySQL username
  password: "password", // MySQL password
  database: "test_database1", // Name of the database you want to connect to
};

// Export connection and connect function
export let connection: Connection | undefined;

export const connect = async (): Promise<Connection | undefined> => {
  try {
    const conn = await createConnection(options);
    connection = conn;
    console.log(
      `Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`
    );
    return conn;
  } catch (err) {
    console.error("Error connecting to MySQL database:", err);
    return undefined;
  }
};

// This function seems unrelated to the connection, you may remove it if not needed
export const PrepareDB = () => {
  console.log("Preparing database");
};

