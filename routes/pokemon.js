const router = require('express').Router();
const pokemonCont = require('../controllers/pokemon');
const validation = require('../middleware/validate')

router.get('/', pokemonCont.getAllPokemon);

router.get('/:id', pokemonCont.getSinglePokemon);

router.post('/', validation.savePokemon, pokemonCont.addPokemon);

router.put('/:id', validation.savePokemon, pokemonCont.updatePokemon);

router.delete('/:id', pokemonCont.deletePokemon);

module.exports = router;