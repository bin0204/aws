const router = require('express').Router();
const List = require('../models/list');

// Find All
router.get('/', (req, res) => {
  List.findAll()
    .then((lists) => {
      if (!lists.length) return res.status(404).send({ err: 'List not found' });
      res.send(lists);
    })
    .catch(err => res.status(500).send(err));
});

// Create new list document
router.post('/ajax', (req, res) => {
  List.create(req.body)
    .then(list => res.send(list))
    .catch(err => res.status(500).send(err));
});


module.exports = router;
