const contributions = [
  {
    contributionId: 'side-bar',
    items: [
      {
        label: 'Catalog',
        route: '/catalog',
      },
    ],
  },
  {
    contributionId: 'routing',
    baseRoute: '/catalog',
    module: './Routes',
  },
  {
    contributionId: 'store',
    storeKey: 'catalog',
    module: './Reducers',
  },
];
export default contributions;
