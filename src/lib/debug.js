/**
 * @requires zcust.lib.common
 * @requires zcust.lib.thirdparty.Base64
 */
jQuery.sap.require('zcust.lib.common');
jQuery.sap.require('zcust.lib.thirdparty.Base64');
jQuery.sap.declare('zcust.lib.debug');

/**
 * @namespace zcust.lib.debug
 */
zcust.lib.debug = {
  /**
   * @todo move to zcust.lib.common.storeLoadedData
   *
   * @param oModel
   * @param url
   */
  storeLoadedData: function (oModel, url) {
    // store all data for using in mock
    // @todo run this code only in dev environment
    setTimeout(function () {
      if (typeof zcust.lib.debug.loadedData === 'undefined') {
        try {
          zcust.lib.debug.loadedData = {};
          zcust.lib.debug.loadedData.hashTable = {};
        } catch (e) {
          return;
        }
      };
      zcust.lib.debug.loadedData[zcust.lib.common.getHash(url)] = oModel.oData;
      zcust.lib.debug.loadedData.hashTable[zcust.lib.common.getHash(url)] =
          url.match(/[^\/]*$/)[0];
    }.bind(this));
  },

  /**
   * @param {object}
   * @param {string}
   */
  addLinkToDownloadJSONObject: function (object, sId) {
    if (typeof sId === 'undefined') {
      sId = '#content';
    }

    var data = 'text/json;charset=utf-8,' +
        encodeURIComponent(
            JSON.stringify(object, undefined, 4)
        );

    $('<a href="data:' + data + '" download="data.json">download JSON</a>')
      .appendTo(sId);
  },

  /**
   * download loaded data as JSON file
   */
  downloadEncodedLoadedData: function () {
    var iMax = 50;
    var oSliced = {};

    for (var i in zcust.lib.debug.loadedData) {
      var aItem = zcust.lib.debug.loadedData[i];
      if (aItem.slice !== 'undefined' && aItem.length > iMax) {
        oSliced[i] = aItem.slice(aItem.length - iMax);
      } else {
        oSliced[i] = aItem;
      }
    }

    var data = 'text/json;charset=utf-8,' +
        encodeURIComponent(
            zcust.lib.thirdparty.Base64.encode(
                JSON.stringify(oSliced)
            )
        );

    $('<a href="data:' + data + '" download="data.json">download JSON</a>')
      .appendTo('#content');
  },

  /**
   * obj2 will be merged into obj1
   * @param {object} obj1 merged into
   * @param {object} obj2 merged from
   */
  mergeMockData: function (obj1, obj2) {
    for (var i in obj2) {
      obj1[i] = obj2[i];
    }
  },

  /**
   * @param {string}
   */
  downloadDecodedLoadedData: function (sEncodedData) {
    var data = 'text/json;charset=utf-8,' +
        encodeURIComponent(
            JSON.stringify(
                JSON.parse(zcust.lib.thirdparty.Base64.decode(sEncodedData)),
                undefined,
                4
            )
        );
    $('<a href="data:' + data + '" download="data.json">download JSON</a>')
      .appendTo('#content');
  },
  /**
   * @param {string}
   * @return {object}
   */
  decodeLoadedData: function (sEncodedData) {
    return JSON.parse(zcust.lib.thirdparty.Base64.decode(sEncodedData));
  },

  /**
   * open loaded data in new window
   * @param {string}
   */
  showMockData: function (sUrl) {
    var url = 'data:text/json;charset=utf8,' +
        encodeURIComponent(
            JSON.stringify(zcust.lib.debug.loadedData, undefined, 4)
        );
    window.open(url, '_blank');
    window.focus();
  },

};
