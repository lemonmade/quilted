export default function reactTestingQuiltedConfig() {
  return {
    name: '@shopify/react-testing',
    entryPoints: [
      {target: 'node'},
      {path: './src/matchers', target: 'node'},
    ],
  };
}
