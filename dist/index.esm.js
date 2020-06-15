import React, { useRef } from 'react';

var index = (function (fields, formName) {
  var wrapRef = useRef();
  var dummyFrame = 'useNetlifyForm_iframe_' + formName;
  var iframeHTML = "<iframe name=\"".concat(dummyFrame, "\" id=\"").concat(dummyFrame, "\"></iframe>");
  var hiddenForm = /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("form", {
    name: formName,
    netlify: "true",
    target: dummyFrame
  }, fields.map(function (field) {
    return /*#__PURE__*/React.createElement("input", {
      key: field,
      name: field,
      type: "hidden"
    });
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "form-name",
    value: formName
  })), /*#__PURE__*/React.createElement("div", {
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

export default index;
