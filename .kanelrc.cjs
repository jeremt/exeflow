const dotenv = require('dotenv');
const {makeKyselyHook} = require('kanel-kysely');

const tablesToIgnore = ['kysely_migration', 'kysely_migration_lock'];

dotenv.config();
module.exports = {
    schemas: ['public'],
    connection: process.env.SUPABASE_DB_URL,

    typeFilter: type => (type.kind === 'table' && tablesToIgnore.includes(type.name) ? false : true),
    enumStyle: 'type',
    outputPath: './src/lib/supabase/gen',
    preDeleteOutputFolder: true,
    preRenderHooks: [makeKyselyHook()],
    postRenderHooks: [
        (path, lines) => {
            if (path.endsWith('Database.ts')) {
                return lines.map(line => {
                    if (line.startsWith('export default')) {
                        return undefined;
                    }
                    if (line.startsWith('type Database =')) {
                        return `export ${line}`;
                    }
                    return line;
                });
            }
            return lines;
        },
    ],
};
