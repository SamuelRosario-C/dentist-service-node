const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3050
app.use(express.json())

const positionIdAndIndex = (request, response, next)=>{

    const { id } = request.params
    const index = arrayClients.findIndex(client => client.id === id)

    if (index < 0) {
        response.json({mensagem: "o id não existe"})
        
    }

    request.clientId = id
    request.clientIndex = index

    next()

}

const arrayClients = []

app.get('/clients', (request, response) => {
    response.json(arrayClients)
})

app.post('/clients', (request, response) => {
    const { dentistName, clientName, age, precoService, typePagament, status } = request.body
    const saveClients = { dentistName, id: uuid.v4(), clientName, age, precoService, typePagament, status }

    const indexName = arrayClients.findIndex(client => client.clientName === clientName)

    if(indexName >= 0){
        console.log('o nome já existe, não pode ser adicionado :(');

    }else{
        console.log('o nome não existe, então foi adicionado com sucesso');
        arrayClients.push(saveClients)
    }
    return response.json(saveClients) 

})

app.put('/clients/:id', positionIdAndIndex, (request, response) => {


    const id = request.clientId
    const index = request.clientIndex

    const { dentistName, clientName, age, precoService, typePagament, status } = request.body
    const clientAtualizado = { dentistName, id, clientName, age, precoService, typePagament, status }

    arrayClients[index] = clientAtualizado

    response.json(clientAtualizado)
})

app.delete('/clients/:id', positionIdAndIndex, (request, response) => {

    const index = request.clientIndex
    arrayClients.splice(index, 1)
    response.json(arrayClients)
})

app.patch('/clients/:id', positionIdAndIndex, (request, response) => {

    const index = request.clientIndex
    arrayClients[index].status = "Paid"
    response.json(arrayClients)
})






app.listen(port, () => {
    console.log(`Example app listening on port ${port} happy hacking`)
})