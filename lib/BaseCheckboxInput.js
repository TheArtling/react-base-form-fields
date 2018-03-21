"use strict";

exports.__esModule = true;
exports.BaseCheckboxInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var _reactGetFormData = require("react-get-form-data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseCheckboxInput = exports.BaseCheckboxInput = (0, _reactGetFormData.Formfield)(_class = (0, _radium2.default)(_class = function (_React$Component) {
  _inherits(BaseCheckboxInput, _React$Component);

  function BaseCheckboxInput(props) {
    _classCallCheck(this, BaseCheckboxInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var value = _this.getValue(props, props.valueInitial);
    _this.state = { value: value };
    return _this;
  }
  // Base component for all Checkbox elements.
  // In order to style this, write a wrapper component that has this as a child
  // and passes in all necessary props.
  //


  BaseCheckboxInput.prototype.componentDidMount = function componentDidMount() {
    var formContext = this.context.formContext;

    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.value, false);
    }
  };

  BaseCheckboxInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.valueInitial !== nextProps.valueInitial) {
      var value = this.getValue(nextProps, nextProps.valueInitial);
      this.setState({ value: value });
      var formContext = this.context.formContext;

      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false);
      }
    }
  };

  BaseCheckboxInput.prototype.getValue = function getValue(props, value) {
    // whenever we `setState({value: something})` we make sure to pass the new
    // value through this function, first, so that the internal value is always
    // either `true` or `false`.
    //
    if (value) {
      return true;
    }
    return false;
  };

  BaseCheckboxInput.prototype.getDisplayValue = function getDisplayValue() {
    // the checkbox doesn't really have a display value. We return `checked`
    // or `""`, instead, which controls the checked status of the checkbox.
    //
    var value = this.state.value;

    if (value === true) {
      return "checked";
    }
    return "";
  };

  BaseCheckboxInput.prototype.handleChange = function handleChange(e) {
    var value = this.state.value;
    var name = this.props.name;
    var formContext = this.context.formContext;

    value = !value;
    value = this.getValue(this.props, value);
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", name, value, true);
    }
    this.setState({ value: value });
  };

  BaseCheckboxInput.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        style = _props.style,
        other = _objectWithoutProperties(_props, ["children", "style"]);

    var valueDisplay = this.getDisplayValue();
    return _react2.default.createElement("input", _extends({
      onChange: function onChange(val) {
        return _this2.handleChange(val);
      },
      style: style,
      type: "checkbox",
      checked: valueDisplay
    }, other));
  };

  return BaseCheckboxInput;
}(_react2.default.Component)) || _class) || _class;

BaseCheckboxInput.propTypes = {
  name: _propTypes2.default.string.isRequired,
  valueInitial: _propTypes2.default.any
};