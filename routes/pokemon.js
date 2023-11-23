const router = require('express').Router();
const pokemonCont = require('../controllers/pokemon');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', pokemonCont.getAllPokemon);

router.get('/:id', pokemonCont.getSinglePokemon);

router.post('/', isAuthenticated, validation.savePokemon, pokemonCont.addPokemon);

router.put('/:id', isAuthenticated, validation.savePokemon, pokemonCont.updatePokemon);

router.delete('/:id', isAuthenticated, pokemonCont.deletePokemon);

module.exports = router;