export default {
  async get() {
    console.log('Fetching settings...');
    const settings = await strapi
      .store({
        type: 'plugin',
        name: 'collection-toggle-plugin',
      })
      .get({ key: 'settings' });

    return settings || {};
  },

  async set(newSettings) {
    console.log('welcome to set service');
    return strapi.plugin('collection-toggle-plugin').config('settings', newSettings);
  },

  async update(newSettings) {
    // Add this function if missing
    console.log('welcome to update service');
    await strapi
      .store({
        type: 'plugin',
        name: 'collection-toggle-plugin',
      })
      .set({ key: 'settings', value: newSettings });

    return newSettings;
  },
};
