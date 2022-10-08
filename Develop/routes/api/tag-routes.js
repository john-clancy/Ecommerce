const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: ({
        // be sure to include its associated Product data
      model: Product,
      attributes: ['id','price','stock','category_id','product_name']
    })
  })
  .then(dbtags=> res.json(dbtags))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: ({
      // be sure to include its associated Product data
    model: Product,
    attributes: ['id','price','stock','category_id','product_name']
  })
  .then(dbTagData =>{
    if (!dbTagData){
      res.status(404).json({Alert: 'No tag identified with this id.'});
      return;
    }
    res.json(dbTagData);
  })  
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTag=> res.json(dbTag))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .them(dbTagData =>{
    if(!dbTagData){
      res.status(404).json({Alert:'No tag identified with this id.'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
