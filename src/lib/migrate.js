const { execSync } = require('child_process');
const { join } = require('path');

/**
 * Run Prisma migrations automatically
 * @param {import('client')} client - The Discord client instance with logger
 * @returns {Promise<void>}
 */
async function runMigrations(client) {
	try {
		client.log.info('Checking for pending database migrations...');

		// Determine which schema file to use based on DB_PROVIDER
		const provider = process.env.DB_PROVIDER || 'sqlite';
		const schemaPath = join(process.cwd(), 'db', provider, 'schema.prisma');

		// Run migrations using prisma migrate deploy (non-interactive)
		// This is safe for production as it only applies pending migrations
		execSync(
			`npx prisma migrate deploy --schema="${schemaPath}"`,
			{
				cwd: process.cwd(),
				stdio: 'inherit',
				env: { ...process.env }
			}
		);

		client.log.info('Database migrations completed successfully');
	} catch (error) {
		// migrate deploy returns exit code 0 if migrations are up-to-date
		// It only throws errors for actual migration failures
		if (error.status === 0 || error.message.includes('No pending migrations')) {
			client.log.info('Database is up-to-date');
		} else {
			client.log.error(`Database migration failed: ${error.message}`);
			client.log.error('Please run: npx prisma migrate dev --schema="db/[provider]/schema.prisma" manually');
			throw error;
		}
	}
}

module.exports = runMigrations;
