/**
 * @requires zcust.lib.Controller
 */
jQuery.sap.require('zcust.lib.Controller');

/**
 * @class sampleapp.mods.main.controller.Detail
 * @extends zcust.lib.Controller
 */
zcust.lib.Controller.extend('sampleapp.mods.main.controller.Detail', {
  /**
   * @memberOf sampleapp.mods.main.controller.Detail
   */
  onInit: function () {
    this.getRouter().attachRoutePatternMatched(
        this.onRoutePatternMatched,
        this
    );

    if (jQuery.sap.getUriParameters().get('mode') === 'dev') {
      this.getLogger().setLevel(jQuery.sap.log.Level.DEBUG);
    } else {
      this.getLogger().setLevel(jQuery.sap.log.Level.WARNING);
    }
  },

  /**
   * @memberOf sampleapp.mods.main.controller.Detail
   */
  onRoutePatternMatched: function (oEvent) {
    var sName = oEvent.getParameter('name');
    if (sName !== 'detail') {
      return;
    }
  },

  /**
   * @memberOf sampleapp.mods.main.controller.Detail
   */
  navToMain: function (oEvent) {
    this.getRouter().navTo('main');
  },

});
