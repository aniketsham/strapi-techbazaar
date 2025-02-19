import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },

      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    app.customFields.register({
      name: 'RelationalField',
      type: 'string',
      pluginId: `${PLUGIN_ID}`,
      //placeholder: 'This is a placeholder',
      // component: UrlImage,
      intlLabel: {
        id: getTranslation('component.name'),
        defaultMessage: 'Relational Field',
      },
      intlDescription: {
        id: getTranslation('component.description'),
        defaultMessage: 'Relational Field',
      },
      components: {
        Input: async () => import('./components/RelationalField'),
      },
      icon: PluginIcon,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
