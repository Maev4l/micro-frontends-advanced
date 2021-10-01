const contributions = [
  {
    contributionId: 'side-bar',
    items: [
      {
        label: 'Orders',
        route: '/orders',
      },
    ],
  },
  {
    contributionId: 'routing',
    baseRoute: '/orders',
    module: './Routes',
  },
];
export default contributions;
