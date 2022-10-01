const router = require('express').Router();
const { response } = require('express');
const { restart } = require('nodemon');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req, body)
    .then((tag) => {
      if (req.body.productIds) {
        const productTags = req.body.productIds.map((product_id) => {
          return {
            tag_id: tag.id,
            product_id,
          };
        });
        return ProductTag.bulkCreate(productTags)
      }
      res.status(201).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk((req.params.id, {
    include: [{ model: Product, through: ProductTag, as: 'products'}]
  }).then((tags) => {
    const productIds = tags.products.map(product => product.id);

    return ProductTag.destroy({
      where: {
        product_id: productIds,
        tag_id: req.params.id
      }
    })
  }).then(result => {
    const payload = req.body.productIds.map(productId => {
      return {
        product_id: productId,
        tag_id: req.params.id
      }
  })
  return ProductTag.bulkCreate(payload);

  }).then((result) => {
    res.json(result)
  }).catch((err) => {
    res.status(400).json(err);
  

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id:req.params.id
      }
    });
    if (!tagData) {
      res.status(400).json({ message: "No Tag with this ID!"});
      return
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router; 