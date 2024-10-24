/**
 * @generated SignedSource<<900b18c2fc719a29ff22d800ae681038>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type profileFragment$data = {
  readonly email: string | null | undefined;
  readonly firstName: string | null | undefined;
  readonly lastName: string | null | undefined;
  readonly nodeId: string;
  readonly userId: string;
  readonly " $fragmentType": "profileFragment";
};
export type profileFragment$key = {
  readonly " $data"?: profileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"profileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "profileFragment",
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
  "type": "Profile",
  "abstractKey": null
};

(node as any).hash = "80f50a4bb92dd0168ccbff4f1b5a6552";

export default node;
