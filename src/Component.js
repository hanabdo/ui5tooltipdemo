/**
 * @requires sampleapp.TopRouter
 */
jQuery.sap.require('sampleapp.TopRouter');

/**
 * @class sampleapp.Component
 * @extends sap.ui.core.UIComponent
 */
sap.ui.core.UIComponent.extend('sampleapp.Component', {
  metadata: {
    name: 'SAPUI5 sample application',
    version: '0.0.1',
    includes: [],
    dependencies: {
      libs: ['sap.m'],
      components: [],
    },
    rootView: 'sampleapp.mods.main.view.App',
    routing: {
      config: {
        routerClass: 'sampleapp.TopRouter',
        viewType: 'XML',
        viewPath: 'sampleapp.mods.main.view',
        clearTarget: false,
        transition: 'slide',
        targetAggregation: 'pages',
        targetControl: 'navContainer',
      },
      routes: [{
        pattern: '',
        name: 'main',
        view: 'Main',
        viewLevel: 0,
      }, {
        pattern: 'detail',
        name: 'detail',
        view: 'Detail',
        viewLevel: 1,
      }],
    },
  },

  /**
   * @memberOf sampleapp.Component#
   */
  init: function () {
    if (jQuery.sap.getUriParameters().get('mode') === 'dev') {
      // jQuery.sap.require('zcust.lib.debug');
    }

    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

    this.getRouter().initialize();
  },

});
