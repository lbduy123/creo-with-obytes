module.exports = {
  // standard relay config options
  src: './src',
  language: 'typescript',
  schema: './data/schema.graphql',
  artifactDirectory: './src/__generated__',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  // pg_graphql specific options
  schemaConfig: {
    nodeInterfaceIdField: 'nodeId',
    nodeInterfaceIdVariableName: 'nodeId',
  },
  customScalarTypes: {
    UUID: 'string',
    Datetime: 'string',
    JSON: 'string',
    BigInt: 'string',
    BigFloat: 'string',
    Opaque: 'any',
  },
};
