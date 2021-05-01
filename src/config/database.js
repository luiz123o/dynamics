import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileASync';

let db;

export async function createConnection() {
    const adapter = new FileSync('db.json');
    db = await low(adapter);
    db.defaults({ questionary: [], answer: [], users: [] }).write();
}
export const getConnection = () => db;