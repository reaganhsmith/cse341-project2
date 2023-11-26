const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const encrypt = require('../middleware/encrypt')


const getAllUsers = async (req, res) => {
    //#swagger.tags=['users']
    mongodb.getDatabase().db('user').collection('user').find().toArray().then((err, user) => {
        if(err){
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    });
};


const getSingleUser = async (req, res) => {
    //#swagger.tags=['user']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user Id. Cannot find user.');
      }
      const userId = new ObjectId(req.params.id);
   
    mongodb.getDatabase().db('user').collection('user').find({_id: userId}).toArray().then((err, user) => {
        if(err){
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user[0]);
    })
};


const addUser = async (req, res) => {


    const user = {
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    const response = await mongodb.getDatabase().db('user').collection('user').insertOne(user);
    if (response.acknowledged){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occuured while creating the new user.');
    }
};


const updateUser = async (req, res) => {
    //#swagger.tags=['user']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user Id. Cannot find user.');
      }
    const userId = new ObjectId(req.params.id);
    const user = {
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    const response = await mongodb.getDatabase().db('user').collection('user').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occuured while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['user']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user Id. Cannot find user.');
      }
      const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('user').collection('user').deleteOne({_id: userId});
    if (response.deletedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occuured while deleting the user.');
    }
};



module.exports = {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser
}