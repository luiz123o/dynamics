import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileASync'

let db;

export async function createConnection() {
    const adapter = new FileAsync('db.json');
    db = await low(adapter);
    db.defaults({ questionary: [], answer: [] }).write()
}
export const getConnection = () => db;
