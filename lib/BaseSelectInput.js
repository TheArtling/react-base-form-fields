"use strict";

exports.__esModule = true;
exports.BaseSelectInput = undefined;

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

var styles = {
  invisible: {
    height: "100%",
    opacity: "0",
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    WebkitAppearance: "none"
  }
};

var BaseSelectInput = exports.BaseSelectInput = (0, _reactGetFormData.Formfield)(_class = (0, _radium2.default)(_class = function (_React$Component) {
  _inherits(BaseSelectInput, _React$Component);

  function BaseSelectInput(props) {
    _classCallCheck(this, BaseSelectInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
    // See BaseTextInput for explanation.


    var value = props.valueInitial;
    _this.state = { value: value };
    return _this;
  }
  // Base component for all Select elements.
  //
  // Renders an invisible <select> element that takes 100% of it's parent
  // element's space. Wrap this component in your own and just style how your
  // DDL should look like. When the user clicks into it, this component's
  // actual <select> element will trigger and show the browser default's DDL
  // option list.
  //
  // @prop onChange(value): Function that handles the change event. You will
  //   need this to keep track of the current value in your project's wrapper
  //   component around this component.
  //

  BaseSelectInput.prototype.componentDidMount = function componentDidMount() {
    // See BaseTextInput for explanation.
    var formContext = this.context.formContext;

    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.value, false);
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  };

  BaseSelectInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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

  BaseSelectInput.prototype.getDisplayValue = function getDisplayValue() {
    return this.state.value;
  };

  BaseSelectInput.prototype.handleChange = function handleChange(e) {
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

  BaseSelectInput.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        choices = _props2.choices,
        onChange = _props2.onChange,
        other = _objectWithoutProperties(_props2, ["choices", "onChange"]);

    var valueDisplay = this.getDisplayValue();
    return _react2.default.createElement(
      "select",
      _extends({
        style: [styles.invisible],
        onChange: function onChange(val) {
          return _this2.handleChange(val);
        },
        value: valueDisplay
      }, other),
      choices.map(function (choice) {
        return _react2.default.createElement(
          "option",
          {
            key: choice.value,
            value: choice.value
          },
          choice.label
        );
      })
    );
  };

  return BaseSelectInput;
}(_react2.default.Component)) || _class) || _class;

BaseSelectInput.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  choices: _react2.default.PropTypes.array.isRequired,
  onChange: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  valueInitial: _react2.default.PropTypes.any
};