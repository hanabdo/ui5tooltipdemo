/**
 * @requires zcust.lib.Controller
 * @requires sampleapp.mods.main.model.gSettings
 */
jQuery.sap.require('zcust.lib.Controller');
jQuery.sap.require('sampleapp.mods.main.model.gSettings');

/**
 * @class sampleapp.mods.main.controller.App
 * @extends zcust.lib.Controller
 */
zcust.lib.Controller.extend('sampleapp.mods.main.controller.App', {
  /**
   * Init and set global models
   * @memberOf sampleapp.mods.main.controller.App#
   */
  onInit: function (oEvent) {
    var oSettingsModel = new sampleapp.mods.main.model.gSettings();

    this.getView().setModel(oSettingsModel, 'gSettings');
  },

});
