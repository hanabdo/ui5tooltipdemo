/**
 * @requires sap.ui.model.json.JSONModel
 */
jQuery.sap.require('sap.ui.model.json.JSONModel');
jQuery.sap.declare('zcust.lib.JSONModel');

sap.ui.model.json.JSONModel.extend('zcust.lib.JSONModel', {
  /** @memberOf zcust.lib.JSONModel# */
  oModel: {},

  /**
   * @constructs zcust.lib.JSONModel
   * @extends sap.ui.model.json.JSONModel
   * @abstract
   * @param {object}
   */
  constructor: function (oInitialData) {
    switch (typeof oInitialData) {
      case 'undefined':
        sap.ui.model.json.JSONModel.prototype.constructor
          .call(this, this.oModel);
        break;
      case 'object':
        oInitialData = this._fillInitialData(this.oModel, oInitialData);
        sap.ui.model.json.JSONModel.prototype.constructor
          .call(this, oInitialData);
        break;
      default:
        sap.ui.model.json.JSONModel.prototype.constructor
          .apply(this, oInitialData);
        break;
    }
  },

  /**
   * @memberOf zcust.lib.JSONModel#
   * @param {object}
   * @return {object}
   */
  _fillInitialData: function (oInitialData) {
    for (var field in this.oModel) {
      switch (typeof oInitialData[field]) {
        case 'object':
          if (typeof oInitialData[field].clone !== 'undefined') {
            this.oModel[field] = oInitialData[field].clone();
          } else {
            this.oModel[field] = oInitialData[field];
          }
          break;
        case 'undefined':
          break;
        default:
          this.oModel[field] = oInitialData[field];
          break;
      }

      delete oInitialData[field];
    }

    for (var field in oInitialData) {
      switch (typeof oInitialData[field]) {
        case 'object':
          if (typeof oInitialData[field].clone !== 'undefined') {
            this.oModel[field] = oInitialData[field].clone();
          } else {
            this.oModel[field] = oInitialData[field];
          }
          break;
        case 'undefined':
          break;
        default:
          this.oModel[field] = oInitialData[field];
          break;
      }
    }

    return this.oModel;
  },

});
