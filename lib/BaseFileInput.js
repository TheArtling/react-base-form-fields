"use strict";

exports.__esModule = true;
exports.BaseFileInput = undefined;

var _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var _reactGetFormData = require("react-get-form-data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  input: {
    bottom: 0,
    cursor: "pointer",
    height: "100%",
    left: 0,
    opacity: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%"
  }
};

var BaseFileInput = exports.BaseFileInput = (0, _reactGetFormData.Formfield)(_class = (0, _radium2.default)(_class = function (_React$Component) {
  _inherits(BaseFileInput, _React$Component);

  function BaseFileInput() {
    _classCallCheck(this, BaseFileInput);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  BaseFileInput.prototype.handleChange = function handleChange(val) {
    var _props = this.props,
        dispatch = _props.dispatch,
        maxSize = _props.maxSize,
        name = _props.name,
        onChange = _props.onChange,
        onFileTooBig = _props.onFileTooBig;
    var formContext = this.context.formContext;

    var self = this;
    var reader = new FileReader();
    var file = val.target.files[0];
    reader.onload = function (upload) {
      var value = upload.target.result;
      if (formContext && formContext.handleChange) {
        formContext.handleChange("", name, value, true);
      }
      if (onChange) {
        onChange(value);
      }
    };
    if (file.size <= maxSize) {
      reader.readAsDataURL(file);
    } else {
      onFileTooBig();
    }
  };

  BaseFileInput.prototype.render = function render() {
    var _this2 = this;

    var name = this.props.name;

    return _react2.default.createElement("input", {
      name: name,
      onChange: function onChange(val) {
        return _this2.handleChange(val);
      },
      type: "file",
      style: [styles.input]
    });
  };

  return BaseFileInput;
}(_react2.default.Component)) || _class) || _class;

BaseFileInput.propTypes = {
  maxSize: _react2.default.PropTypes.number.isRequired,
  name: _react2.default.PropTypes.string.isRequired,
  onFileTooBig: _react2.default.PropTypes.func.isRequired,
  onChange: _react2.default.PropTypes.func
};