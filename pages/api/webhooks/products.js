import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_APP_KEY);

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
      await index.saveObject({ objectID, id: objectID, ...product })
      return res.status(200).send({ success: true })
    default:
      break;
  }

  res.send({
    message: `Event type ${eventType} is not a valid trigger`
  })
}

export default algoliaHandler