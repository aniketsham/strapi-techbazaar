import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'RelationalField',
    plugin: 'collection-toggle-plugin',
    type: 'string',
  });
};

export default register;
