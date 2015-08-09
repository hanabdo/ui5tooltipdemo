/**
 * @class zcust.lib.Controller
 * @extends sap.ui.core.mvc.Controller
 * @abstract
 */
jQuery.sap.declare('zcust.lib.Controller');
sap.ui.core.mvc.Controller.extend('zcust.lib.Controller', {
  /** @memberOf zcust.lib.Controller# */
  getEventBus: function () {
    var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
    return sap.ui.component(sComponentId).getEventBus();
  },

  /** @memberOf zcust.lib.Controller# */
  getRouter: function () {
    return sap.ui.core.UIComponent.getRouterFor(this);
  },

  /** @memberOf zcust.lib.Controller# */
  getLogger: function () {
    var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
    return jQuery.sap.log.getLogger(sap.ui.component(sComponentId));
  },

});
