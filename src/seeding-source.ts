import { config } from 'dotenv';
import { SeedingSource } from '@concepta/typeorm-seeding';
import InitialDatabaseSeed from 'seeds/initialSeed';
import { AppDataSource } from 'utils/dataSource';

config();

export default new SeedingSource({
    dataSource: AppDataSource,
    seeders: [InitialDatabaseSeed],
});