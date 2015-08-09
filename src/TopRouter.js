/**
 * sampleapp top level router description
 *
 * @requires sap.m.routing.RouteMatchedHandler
 * @requires sap.ui.core.routing.History
 * @requires sap.ui.core.routing.Router
 */
jQuery.sap.require('sap.m.routing.RouteMatchedHandler');
jQuery.sap.require('sap.ui.core.routing.History');
jQuery.sap.require('sap.ui.core.routing.Router');
jQuery.sap.declare('sampleapp.TopRouter');

sap.ui.core.routing.Router.extend('sampleapp.TopRouter', {
  /**
   * @constructs sampleapp.TopRouter
   * @extends {sap.ui.core.routing.Router}
   */
  constructor: function () {
    sap.ui.core.routing.Router.apply(this, arguments);

    this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
  },

  /**
   * @memberOf sampleapp.TopRouter#
   */
  destroy: function () {
    sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);

    this._oRouteMatchedHandler.destroy();
  },

  /**
   * @memberOf sampleapp.TopRouter#
   */
  // navTo: function (sName, oParameters, bReplace) {
  //   sap.ui.core.routing.Router.prototype.navTo.apply(this, arguments);

  //   // this._findSplitApp().to(sName);
  // },

  /**
   * @memberOf sampleapp.TopRouter#
   */
  _findSplitApp: function () {
    var oRootView = this._oOwner.mAggregations.rootControl;
    var targetControl = this._oConfig.targetControl;

    if (oRootView instanceof sap.ui.core.mvc.View &&
        oRootView.byId(targetControl)) {
      return oRootView.byId(targetControl);
    }

    return oRootView.getParent() ?
        this._findSplitApp(oRootView.getParent(), targetControl) :
        null;
  },

});
