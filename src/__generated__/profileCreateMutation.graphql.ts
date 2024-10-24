/**
 * @generated SignedSource<<4dac696de25ad92d221920ea62bbf98a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileInsertInput = {
  avatar?: string | null | undefined;
  createdAt?: string | null | undefined;
  displayName?: string | null | undefined;
  email?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  phone?: string | null | undefined;
  updatedAt?: string | null | undefined;
  userId?: string | null | undefined;
  username?: string | null | undefined;
};
export type profileCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  input: ProfileInsertInput;
};
export type profileCreateMutation$data = {
  readonly insertIntoProfileCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"profileFragment">;
    }>;
  } | null | undefined;
};
export type profileCreateMutation = {
  response: profileCreateMutation$data;
  variables: profileCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "items": [
      {
        "kind": "Variable",
        "name": "objects.0",
        "variableName": "input"
      }
    ],
    "kind": "ListValue",
    "name": "objects"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "affectedCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "profileCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ProfileInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoProfileCollection",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "profileFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "profileCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ProfileInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoProfileCollection",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nodeId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "userId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "records",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "ProfileEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2ddbd26e4076291a3af084838e4d0af3",
    "id": null,
    "metadata": {},
    "name": "profileCreateMutation",
    "operationKind": "mutation",
    "text": "mutation profileCreateMutation(\n  $input: ProfileInsertInput!\n) {\n  insertIntoProfileCollection(objects: [$input]) {\n    affectedCount\n    records {\n      ...profileFragment\n      nodeId\n    }\n  }\n}\n\nfragment profileFragment on Profile {\n  nodeId\n  userId\n  firstName\n  lastName\n  email\n}\n"
  }
};
})();

(node as any).hash = "855b5c22715a61755811f3ce8f700946";

export default node;
