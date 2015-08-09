/**
 * @requires zcust.lib.JSONModel
 */
jQuery.sap.require('zcust.lib.JSONModel');
jQuery.sap.declare('sampleapp.mods.main.model.gSettings');

/**
 * @class sampleapp.mods.main.model.gSettings
 * @extends zcust.lib.JSONModel
 */
zcust.lib.JSONModel.extend('sampleapp.mods.main.model.gSettings', {
  /**
   * @memberOf sampleapp.mods.main.model.gSettings
   * @property {string} [mainPageValue] [text value for main page]
   * @property {string} [detailPageValue] [text value for detail page]
   */
  oModel: {
    mainPageValue: 'Value for the main page',
    detailPageValue: 'Value for the detail page',
  },
});
