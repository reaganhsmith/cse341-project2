const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPokemon = async (req, res) => {
    //#swagger.tags=['pokemon']
    const result = await mongodb.getDatabase().db().collection('pokemon').find();
    result.toArray().then((err, pokemon) => {
        if(err){
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pokemon);
    });
};


const getSinglePokemon = async (req, res) => {
    //#swagger.tags=['pokemon']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
      }
      const userId = new ObjectId(req.params.id);
   
    const result = await mongodb.getDatabase().db().collection('pokemon').find({_id: userId});
    result.toArray().then((err, pokemon) => {
        if(err){
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pokemon[0]);
    })
};

const addPokemon = async (req, res) => {
    //#swagger.tags=['pokemon']
    const user = {
        name: req.body.name,
        type: req.body.type,
        number: req.body.number,
        color: req.body.color,
        evolution: req.body.evolution,
        img: req.body.img
    };
    const response = await mongodb.getDatabase().db().collection('pokemon').insertOne(user);
    if (response.acknowledged){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occuured while creating a user.');
    }
};

const updatePokemon = async (req, res) => {
    //#swagger.tags=['pokemon']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
      }
    const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        type: req.body.type,
        number: req.body.number,
        color: req.body.color,
        evolution: req.body.evolution,
        img: req.body.img
    };
    const response = await mongodb.getDatabase().db().collection('pokemon').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occuured while updating a user.');
    }
};

const deletePokemon = async (req, res) => {
    //#swagger.tags=['pokemon']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
      }
      const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('pokemon').deleteOne({_id: userId});
    if (response.deletedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occuured while deleting a user.');
    }
};

module.exports = {
    getAllPokemon,
    getSinglePokemon,
    addPokemon,
    updatePokemon,
    deletePokemon
}