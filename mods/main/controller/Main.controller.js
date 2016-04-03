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

    [this.byId('label1'), this.byId('label2'), this.byId('label3'), this.byId('label4'), this.byId('label5')].forEach( function(el) {
       (new zlib.Tooltip({
              placement: 'Top',
              title: 'bla' + el.getId(),
        })).attachTo(el);
    });
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

  onShowTooltip: function (oControlEvent) {
    (new zlib.Tooltip).openBy($('#__label0')[0]);
  },

  /**
   * @memberOf sampleapp.mods.main.controller.Main#
   */
  navToDetail: function (oEvent) {
    this.getRouter().navTo('detail');
  },

});
