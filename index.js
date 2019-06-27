const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/teste01', 
    { useNewUrlParser:true },
    async (err, client) => {
    if(err){
        console.error(err)
        return
    }
    console.log('MongoDB Connected!')
    const db = client.db()

    //await inserirUsuario(db)
    //await inserirPaises(db)
    //await listarUsuarios(db)
    //await filtrarPaises(db)
    await filtrarUsuarios(db)

    client.close()
    console.log('MongoDB is dead!')

})

const inserirUsuario = async (db) => {
    const collection = db.collection('usuarios')

    const { result } = await collection.insertOne({
        nome: 'Andsss',
        email: 'andss@gmail.com'
    })

    console.log('User added!', result)
}

const inserirPaises = async (db) => {
    const collection = db.collection('paises')

    const paises = [
        { nome: 'Brasil', sigla: 'BR'},
        { nome: 'França', sigla: 'FR'}
    ]

    const { result } = await collection.insertMany(paises)

    console.log('Countries added!', result)
}

const listarUsuarios = async (db) => {
    const collection = db.collection('usuarios')

    //const usuarios = await collection.find({}).toArray()

    //pegar apenas nome com o id
    const usuarios = await collection.find({}, { projection: { nome: 1 } }).toArray()

    //pega apenas nome sem o id
    //const usuarios = await collection.find({}, { projection: { _id: 0, email: 0 } }).toArray()

    console.log(usuarios)

}

const filtrarPaises = async(db) => {
    const collection = db.collection('paises')

    //se sigla e nome baterem com o banco
    //const query = { sigla: 'BR', nome: 'Brasil'}

    //or
    const query = { $or: [{sigla: 'BR'}, {sigla: 'FR'}]}

    const paises = await collection.find(query).toArray()

    console.log('paises', paises)
}

const filtrarUsuarios = async (db) => {
    const collection = db.collection('usuarios')

    const query = {
        email: { $regex: '.*gmail.com.*', $options: 'i'}
    }

    const usuarios = await collection.find(query).toArray()

    console.log('usuarios', usuarios)
}