"use strict";

exports.__esModule = true;
exports.BaseTextInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var _reactGetFormData = require("react-get-form-data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseTextInput = exports.BaseTextInput = (0, _reactGetFormData.Formfield)(_class = (0, _radium2.default)(_class = function (_React$Component) {
  _inherits(BaseTextInput, _React$Component);

  function BaseTextInput(props) {
    _classCallCheck(this, BaseTextInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
    // The component manages it's own state internally. So when it is created
    // we save the initial value into the state.


    var value = _this.getValue(props, props.valueInitial);
    _this.state = { value: value };
    return _this;
  }
  // Base component for all Input elements of type `text`.
  // In order to style this, write a wrapper component that has this as a child
  // and passes in all necessary props.
  //
  // @prop onChange: You may use this to keep track of this components current
  //   value in your project's wrapper component. This is useful if you want
  //   to build a custom component and set this component's type to `hidden`.
  //

  BaseTextInput.prototype.componentDidMount = function componentDidMount() {
    // When this component gets mounted, it might already have an initial
    // value. However, when you call `form.getValues()` you would receive an
    // empty object because no keystrokes have been made into the form fields,
    // yet.
    //
    // To work around this, we emit a signal to the parent <Form> component
    // here. Note the last parameter which is `false`. This makes sure that the
    // <Form> does take note of the new value, but does not emit it's `onChange`
    // event.
    var formContext = this.context.formContext;

    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.value, false);
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  };

  BaseTextInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // Usually, the value of this component can only change when the user types
    // into the input element.
    //
    // However, in some edge cases you might want to change this component's
    // value via other means, for example when the user clicks the back button
    // in the browser and the URL changes from `?search=Foo` to `?search=Bar`.
    // In this case we would like to update the input's value from `Foo` to
    // `Bar`.
    //
    // We can do that by simply changing the `valueInitial` that we are passing
    // into this component as a prop. This component will inform the parent
    // <Form> about the change, but without emitting the form's `onChange` (
    // thanks to the `false` parameter in `handleChange)`).
    //
    if (this.props.valueInitial !== nextProps.valueInitial) {
      var value = this.getValue(nextProps, nextProps.valueInitial);
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

  BaseTextInput.prototype.getValue = function getValue(props, value) {
    // Helper function to "normalize" the value.
    // If this field is a number field, we want "" to be `null`, internally.
    var type = props.type;

    if (type === "number" && value === "") {
      value = null;
    }
    return value;
  };

  BaseTextInput.prototype.getDisplayValue = function getDisplayValue() {
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

  BaseTextInput.prototype.handleChange = function handleChange(e) {
    // If the user typed into the input field, we will save the new value
    // into this.state and inform the parent <Form> about the new value.
    var value = e.target.value;
    var _props = this.props,
        name = _props.name,
        onChange = _props.onChange;
    var formContext = this.context.formContext;

    value = this.getValue(this.props, value);
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", name, value, true);
    }
    this.setState({ value: value });
    if (onChange) {
      onChange(value);
    }
  };

  BaseTextInput.prototype.render = function render() {
    var _this2 = this;

    // NOTE: We display the displayValue to the user, but when you call
    // form.getValues() you will get whatever internal value we computed in
    // `this.getValue()`, so the `<input value="blabla" />` in your DOM
    // might not be what you will actually POST to your API.
    var _props2 = this.props,
        style = _props2.style,
        type = _props2.type,
        other = _objectWithoutProperties(_props2, ["style", "type"]);

    var valueDisplay = this.getDisplayValue();
    return _react2.default.createElement("input", _extends({
      className: "form-control",
      onChange: function onChange(val) {
        return _this2.handleChange(val);
      },
      style: style,
      type: type,
      value: valueDisplay
    }, other));
  };

  return BaseTextInput;
}(_react2.default.Component)) || _class) || _class;

BaseTextInput.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.string.isRequired,
  valueInitial: _react2.default.PropTypes.any
};