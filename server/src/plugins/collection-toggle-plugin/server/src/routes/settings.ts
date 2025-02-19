export default [
  {
    method: 'GET',
    path: '/settings',
    handler: 'settings.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/settings',
    handler: 'settings.update',
    config: {
      auth: false,
    },
  },
];
