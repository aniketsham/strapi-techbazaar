import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'Input',
    plugin: 'custom-input-field',
    type: 'string',
  });
};

export default register;
