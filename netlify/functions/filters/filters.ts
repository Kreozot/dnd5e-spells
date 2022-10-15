import { Handler } from '@netlify/functions';
import FaunaDB, { query } from 'faunadb';

const COLLECTION_ID = 'filters';

export const handler: Handler = async (event) => {
  try {
    if (!process.env.FAUNADB_SERVER_SECRET) {
      throw new Error('FAUNADB_SERVER_SECRET should be defined!');
    }

    const client = new FaunaDB.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    });

    if (event.httpMethod === 'POST') {
      if (!event.body) {
        throw new Error('body should contain a value');
      }

      const data = JSON.parse(event.body);
      const id = '1';

      await client.query(
        query.If(
          query.Exists(query.Ref(query.Collection(COLLECTION_ID), id)),
          query.Replace(query.Ref(query.Collection(COLLECTION_ID), id), { data }),
          query.Create(query.Ref(query.Collection(COLLECTION_ID), id), { data })
        )
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Success',
        }),
      };
    }

    if (event.httpMethod === 'GET') {
      const id = '1';
      const response: any = await client.query(
        query.If(
          query.Exists(query.Ref(query.Collection(COLLECTION_ID), id)),
          query.Get(query.Ref(query.Collection(COLLECTION_ID), id)),
          false
        )
      );

      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify('Wrong request'),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
