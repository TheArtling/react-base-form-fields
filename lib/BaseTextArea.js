"use strict";

exports.__esModule = true;
exports.BaseTextArea = undefined;

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

var BaseTextArea = exports.BaseTextArea = (0, _reactGetFormData.Formfield)(_class = (0, _radium2.default)(_class = function (_React$Component) {
  _inherits(BaseTextArea, _React$Component);

  function BaseTextArea(props) {
    _classCallCheck(this, BaseTextArea);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
    // See BaseTextInput for explanation.


    var value = props.valueInitial;
    _this.state = { value: value };
    return _this;
  }
  // Base component for all TextArea elements.
  // In order to style this, write a wrapper component that has this as a child
  // and passes in all necessary props.
  //
  // @prop onChange: You may use this to keep track of this components current
  //   value in your project's wrapper component. This is useful if you want
  //   to build a custom component and set this component's type to `hidden`.
  //

  BaseTextArea.prototype.componentDidMount = function componentDidMount() {
    // See BaseTextInput for explanation.
    var formContext = this.context.formContext;

    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.value, false);
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  };

  BaseTextArea.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // See BaseTextInput for explanation.
    if (this.props.valueInitial !== nextProps.valueInitial) {
      var value = nextProps.valueInitial;
      this.setState({ value: value });
      var formContext = this.context.formContext;

      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false);
        if (nextProps.onChange) {
          nextProps.onChange(value);
        }
      }
    }
  };

  BaseTextArea.prototype.getDisplayValue = function getDisplayValue() {
    // Whatever this field is, we never want to render `undefined` or `null`,
    // so for display purposes we set it to `""`
    var type = this.props.type;
    var value = this.state.value;

    if (value === null) {
      return "";
    }
    if (value === undefined) {
      return "";
    }
    return value;
  };

  BaseTextArea.prototype.handleChange = function handleChange(e) {
    // See BaseTextInput for explanation.
    var value = e.target.value;
    var _props = this.props,
        name = _props.name,
        onChange = _props.onChange;
    var formContext = this.context.formContext;

    if (formContext && formContext.handleChange) {
      formContext.handleChange("", name, value, true);
    }
    this.setState({ value: value });
    if (onChange) {
      onChange(value);
    }
  };

  BaseTextArea.prototype.render = function render() {
    var _this2 = this;

    // See BaseTextInput for explanation.
    var _props2 = this.props,
        cols = _props2.cols,
        rows = _props2.rows,
        style = _props2.style,
        type = _props2.type,
        other = _objectWithoutProperties(_props2, ["cols", "rows", "style", "type"]);

    var valueDisplay = this.getDisplayValue();
    if (!cols) {
      cols = "30";
    }
    if (!rows) {
      rows = "10";
    }
    return _react2.default.createElement("textarea", _extends({
      className: "form-control",
      cols: cols,
      onChange: function onChange(val) {
        return _this2.handleChange(val);
      },
      rows: rows,
      style: style,
      value: valueDisplay
    }, other));
  };

  return BaseTextArea;
}(_react2.default.Component)) || _class) || _class;

BaseTextArea.propTypes = {
  name: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  valueInitial: _propTypes2.default.any
};