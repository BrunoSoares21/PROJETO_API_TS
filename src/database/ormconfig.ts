import { DataSource } from "typeorm";

const dataBase = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    entities: [
        './src/models/*.ts'
    ],
    logging: true, // log das queries executadas
    synchronize: true // cria as tabelas automaticamente
})

dataBase.initialize()
.then(() => console.log(`Banco de dados inicializado`))
.catch((err) => console.error(`Erro  ao inicializar o banco de dados`, err))

export default dataBase