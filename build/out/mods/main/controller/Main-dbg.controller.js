/**
 * @requires zcust.lib.Controller
 */
jQuery.sap.require('zcust.lib.Controller');

/**
 * @class sampleapp.mods.main.controller.Main
 * @extends zcust.lib.Controller
 */
zcust.lib.Controller.extend('sampleapp.mods.main.controller.Main', {
  /**
   * @memberOf sampleapp.mods.main.controller.Main#
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
   * @memberOf sampleapp.mods.main.controller.Main#
   */
  onRoutePatternMatched: function (oEvent) {
    var sName = oEvent.getParameter('name');
    if (sName !== 'main') {
      return;
    }
  },

  /**
   * @memberOf sampleapp.mods.main.controller.Main#
   */
  navToDetail: function (oEvent) {
    this.getRouter().navTo('detail');
  },

});
