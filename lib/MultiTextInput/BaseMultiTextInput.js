"use strict";

exports.__esModule = true;
exports.BaseMultiTextInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var _Tag = require("./Tag");

var _MultiText = require("./MultiText");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  base: {
    width: "100%",
    padding: ".1em",
    display: "flex",
    flexDirection: "column"
  }
};

var BaseMultiTextInput = exports.BaseMultiTextInput = (0, _radium2.default)(_class = function (_React$Component) {
  _inherits(BaseMultiTextInput, _React$Component);

  function BaseMultiTextInput(props) {
    _classCallCheck(this, BaseMultiTextInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { input: "", action: "none" };
    _this.resetInput = _this.resetValues.bind(_this);
    return _this;
  }

  BaseMultiTextInput.prototype.resetValues = function resetValues() {
    this.setState({ input: "", action: "none" });
  };

  BaseMultiTextInput.prototype.handleTextChange = function handleTextChange(evt) {
    this.setState({ input: evt.target.value });
  };

  BaseMultiTextInput.prototype.handleKey = function handleKey(evt) {
    if (evt.keyCode == 8) {
      if (this.state.input === "") this.handleRemove(-1);
    } else {
      if (this.props.addKeys.indexOf(evt.keyCode) > -1) {
        this.setState({ action: "add" });
        evt.preventDefault();
      }
    }
  };

  BaseMultiTextInput.prototype.handleClick = function handleClick() {
    if (this.input) this.input.focus();
  };

  BaseMultiTextInput.prototype.handleRemove = function handleRemove(index) {
    this.setState({ action: "remove", input: index });
  };

  BaseMultiTextInput.prototype.handleChange = function handleChange(value) {
    if (this.props.onChange) this.props.onChange(value);
    this.resetValues();
  };

  BaseMultiTextInput.prototype.renderTag = function renderTag(value, index) {
    var _this2 = this;

    var tag = void 0;
    if (this.props.renderTag) tag = this.props.renderTag(value, index);else tag = _react2.default.createElement(
      _Tag.Tag,
      null,
      value
    );
    return _react2.default.createElement(
      "span",
      {
        style: { cursor: "pointer" },
        key: value,
        onClick: function onClick() {
          return _this2.handleRemove(index);
        } },
      tag
    );
  };

  BaseMultiTextInput.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        inputStyle = _props.inputStyle,
        containerStyle = _props.containerStyle,
        onChange = _props.onChange,
        others = _objectWithoutProperties(_props, ["inputStyle", "containerStyle", "onChange"]);

    var _state = this.state,
        input = _state.input,
        action = _state.action;

    return _react2.default.createElement(
      "div",
      {
        style: [styles.base, containerStyle],
        onClick: function onClick() {
          return _this3.handleClick();
        }
      },
      _react2.default.createElement(_MultiText.MultiText, _extends({
        renderTag: function renderTag(value, index) {
          return _this3.renderTag(value, index);
        },
        onChange: function onChange(value) {
          return _this3.handleChange(value);
        },
        resetInput: this.resetInput,
        WrapperComp: "div",
        WrapperStyle: {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center"
        },
        input: input,
        action: action
      }, others)),
      _react2.default.createElement("input", {
        ref: function ref(item) {
          _this3.input = item;
        },
        onChange: function onChange(evt) {
          return _this3.handleTextChange(evt);
        },
        onKeyDown: function onKeyDown(evt) {
          return _this3.handleKey(evt);
        },
        style: inputStyle,
        value: String(input)
      })
    );
  };

  return BaseMultiTextInput;
}(_react2.default.Component)) || _class;

BaseMultiTextInput.propTypes = _extends({}, _MultiText.MultiText.propTypes, {
  inputStyle: _react2.default.PropTypes.object,
  containerStyle: _react2.default.PropTypes.object
});
BaseMultiTextInput.defaultProps = {
  addKeys: [13, 188],
  inputStyle: {},
  containerStyle: {}
};