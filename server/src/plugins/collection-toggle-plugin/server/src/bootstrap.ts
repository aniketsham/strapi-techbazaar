import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase
  // strapi.admin.routes['collection-toggle-plugin'] = require('./routes/settings');
};

export default bootstrap;
