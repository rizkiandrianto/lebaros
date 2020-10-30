import algoliasearch from "algoliasearch";

const Products = async (req, res) => {
  switch (req.method) {
    case 'GET':
      const { query } = req;
      const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_APP_KEY);
      let indices = 'products';
      if (query?.sort) {
        const sort = query?.sort;
        const order = query?.order && query.order.toLowerCase() || 'asc';
        indices += `_${sort}_${order}`;
      }

      const index = client.initIndex(indices);

      const search = await index.search(query?.q || '').
        catch(() => {
          return res.status(404).send('Not Found');
        })

      return res.send(search);
    default:
      break;
  }

  res.send('Method Not Allowed');
}

export default Products;