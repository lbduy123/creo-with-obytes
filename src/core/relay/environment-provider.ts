import { Env } from '@env';
import {
  Environment,
  type FetchFunction,
  type IEnvironment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import { supabase } from '@/core/supabase';

const fetchQuery: FetchFunction = async (operation, variables) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(`${Env.EXPO_PUBLIC_SUPABASE_URL}/graphql/v1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: Env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session?.access_token ?? Env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return await response.json();
};

const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

export function createEnvironment(): IEnvironment {
  return new Environment({
    network,
    store,
    getDataID: (node) => node.nodeId,
    missingFieldHandlers: [
      {
        handle(field, _record, argValues) {
          if (field.name === 'node' && 'nodeId' in argValues) {
            // If field is node(nodeId: $nodeId), look up the record by the value of $nodeId
            return argValues.nodeId;
          }

          return undefined;
        },
        kind: 'linked',
      },
    ],
  });
}