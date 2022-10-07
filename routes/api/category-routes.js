const router = require('express').Router();
const { restart } = require('nodemon');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


  // find all categories
  // be sure to include its associated Products

router.get('/', async (req, res) => {
  try {
    const categoryData =  await Category.findAll({
      fields: ['id'],
      include: [{ model: Product }]
    });

    res.status(200).json(categoryData);

  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if (!categoryData) {
      res.status(404).json({message: 'category with id not found'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);

  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {id: req.params.id,}
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value 
  try {
    const categoryData = await Category.destroy({
      where: {id: req.params.id}
    });
    if (!categoryData) {
      res.status(404).json({message: 'Category not found'})
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;