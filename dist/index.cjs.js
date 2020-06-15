'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var index = (function (fields, formName) {
  var wrapRef = React.useRef();
  var dummyFrame = 'useNetlifyForm_iframe_' + formName;
  var iframeHTML = "<iframe name=\"".concat(dummyFrame, "\" id=\"").concat(dummyFrame, "\"></iframe>");
  var hiddenForm = /*#__PURE__*/React__default.createElement("div", {
    ref: wrapRef,
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React__default.createElement("form", {
    name: formName,
    netlify: "true",
    target: dummyFrame
  }, fields.map(function (field) {
    return /*#__PURE__*/React__default.createElement("input", {
      key: field,
      name: field,
      type: "hidden"
    });
  }), /*#__PURE__*/React__default.createElement("input", {
    type: "hidden",
    name: "form-name",
    value: formName
  })), /*#__PURE__*/React__default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: iframeHTML
    }
  }));

  var submit = function submit(data) {
    return new Promise(function (resolve, reject) {
      var wrap = wrapRef.current;
      var form = wrap.querySelector('form');
      var iframe = wrap.querySelector('iframe');

      var iframeLoadHandler = function iframeLoadHandler() {
        var success = iframe.contentDocument.body.innerHTML.includes('Your form submission has been received');
        iframe.removeEventListener('load', iframeLoadHandler);
        iframe.contentDocument.body.innerHTML = '';
        success ? resolve(true) : reject(false);
      };

      fields.forEach(function (field) {
        form.querySelector("[name=".concat(field, "]")).value = data[field].toString();
      });
      iframe.addEventListener('load', iframeLoadHandler);
      form.submit();
    });
  };

  return {
    hiddenForm: hiddenForm,
    submit: submit
  };
});

module.exports = index;
