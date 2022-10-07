const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      fields: ['id'],
      include: [{ model: Product}]
    });

    res.status(200).json(tagData);

  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if (!tagData) {
      res.status(404).json({message: "No tag with this ID found"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);

    console.log(err);
  };
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);

    } catch (err) {
    console.log(err);

    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id,}
    });

    res.status(200).json(updatedTag);

  } catch(err) {
    console.log(err);
    
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {id: req.params.id}
    });

    if (!tagData) {
      res.status(400).json({message: "No Tag with this ID not found"});

      return;
    } 
    res.status(200).json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;