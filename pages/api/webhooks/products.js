import algoliasearch from "algoliasearch";

const client = algoliasearch("1C5T7UKR54", "cad66586c3cc535bccd2d44055a52aec");

const algoliaHandler = async (req, res) => {
  const index = client.initIndex('products')

  const { event, payload } = req.body;
  const [ _, eventType ] = event.split('.');
  const { id: objectID, ...product } = payload;

  switch (eventType) {
    case 'delete':
      await index.deleteObject(objectID)
      return res.status(202).end();
    case 'create':
    case 'update':
      await index.saveObject({ objectID, finalPrice: product.price.raw, ...product })
      return res.status(200).send({ success: true })
    default:
      break;
  }

  res.send({
    message: `Event type ${eventType} is not a valid trigger`
  })
}

export default algoliaHandler