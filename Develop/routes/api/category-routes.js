const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include:({
        // be sure to include its associated Products
      model: Product,
      attributes:['id','price','stock','category_id','product_name']
    })
  })
  .them(dbCategories => res.json(dbCategories))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where:{
      id: req.params.id
    },
    include:({
      model:Product,
      attributes: ['id','price','stock','category_id','product_name']
    })
    .then(dbCategory =>{
      if(!dbCategory){
        res.status(404).json({Alert: 'No category identified with this id'});
        return
      }
      res.json(dbCategory)
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    })
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    Category_name: req.body.Category_name
  })
  .then(dbCategory=> res.json(dbCategory))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update({
    Category_name: req.body.Category_name
  },
  {
    where:{
      id: req.params.id
    }
  }
  )
  .then(dbCategoryData=>{
    if(!dbCategoryData){
      res.status(404).json({Alert:'No catergort isentified with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(dbCategoryData=>{
    if(!dbCategoryData){
      res.status(404).json({Alert: 'No catedory found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
  // delete a category by its `id` value
});

module.exports = router;
