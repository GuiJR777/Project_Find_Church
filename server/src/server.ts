//Rota: endereço completo
//Recursos: Qual entidade

//GET: busca info no back
//POST: cria info no back
//PUT: atualiza info no back
//DELETE: remove

//Request Param: Parametros que vem na própria rota para identificar um recurso
//querry param: Parametros que vem na própria rota, opcionais para filtrar, paginação
//Request Body: Parametros para criação e atualização de informação


import express from 'express'
import cors from 'cors';
import path from 'path'
import routes from './routes'

const app= express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))


app.listen(3333);