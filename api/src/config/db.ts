import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,       // ← ne jamais mettre true en prod
  logging: process.env.NODE_ENV === "development",
  entities: ["dist/entities/*.js"],
  migrations: ["src/migrations/**/*.js"],
});

export async function connectDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Connecté à PostgreSQL via TypeORM");
  } catch (err: unknown) {
    console.error("❌ Échec connexion TypeORM :", err);
    setTimeout(connectDatabase, 5000);
  }
}