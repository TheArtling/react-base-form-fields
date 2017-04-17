"use strict";

exports.__esModule = true;
exports.MultiText = undefined;

var _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactGetFormData = require("react-get-form-data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiText = exports.MultiText = (0, _reactGetFormData.Formfield)(_class = function (_React$Component) {
  _inherits(MultiText, _React$Component);

  function MultiText(props) {
    _classCallCheck(this, MultiText);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      tags: props.valueInitial || [],
      propagateChange: false,
      hasUpdated: false
    };
    return _this;
  }

  MultiText.prototype.componentDidMount = function componentDidMount() {
    this.handleChange(this.props, this.state.tags, false);
  };

  MultiText.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.action !== "none") {
      if (nextProps.action === "add") this.handleAddTag(nextProps, nextProps.input);
      if (nextProps.action === "remove") this.handleRemoveTag(nextProps.input);
    }
  };

  MultiText.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.state.hasUpdated) {
      this.handleChange(this.props, this.state.tags, this.state.propagateChange);
      this.setState({ hasUpdated: false, propagateChange: false });
    }
  };

  MultiText.prototype.handleChange = function handleChange(props, value, propagate) {
    if (this.context) {
      var formContext = this.context.formContext;

      if (formContext && formContext.handleChange) formContext.handleChange("", props.name, value, propagate);
    }
    if (props.onChange) props.onChange(value);
  };

  MultiText.prototype.checkExisting = function checkExisting(original, valueToCheck) {
    return original.indexOf(valueToCheck) > -1;
  };

  MultiText.prototype.handleAddTag = function handleAddTag(props, newValue) {
    var isEmpty = newValue === "";
    var isExistingValue = false;
    if (this.props.unique) isExistingValue = this.checkExisting(this.state.tags, newValue);

    if (!isEmpty && !isExistingValue) {
      var newTags = this.state.tags.concat(newValue);
      this.setState({ tags: newTags, hasUpdated: true, propagateChange: true });
    }
    this.props.resetInput();
  };

  MultiText.prototype.handleRemoveTag = function handleRemoveTag(removalIndex) {
    var tagLength = this.state.tags.length;
    if (tagLength.length === 0) return;

    var indexToRemove = removalIndex;
    if (removalIndex < 0) indexToRemove += tagLength;
    var newTags = this.state.tags.filter(function (tag, index) {
      return index !== indexToRemove;
    });
    this.setState({ tags: newTags, hasUpdated: true, propagateChange: true });
  };

  MultiText.prototype.handleRemoveLastTag = function handleRemoveLastTag() {
    if (this.state.tags.length > 0) this.setState({
      tags: this.state.tags.slice(0, -1),
      hasUpdated: true,
      propagateChange: true
    });
  };

  MultiText.prototype.renderTag = function renderTag(value, index) {
    return this.props.renderTag(value, index);
  };

  MultiText.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        WrapperComp = _props.WrapperComp,
        WrapperStyle = _props.WrapperStyle,
        inputComp = _props.inputComp;
    var tags = this.state.tags;

    var renderedTags = [];
    if (tags.length > 0) renderedTags = tags.map(function (tag, index) {
      return _this2.renderTag(tag, index);
    });
    return _react2.default.createElement(WrapperComp, { style: WrapperStyle }, renderedTags);
  };

  return MultiText;
}(_react2.default.Component)) || _class;

MultiText.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  unique: _react2.default.PropTypes.bool,
  renderTag: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  valueInitial: _react2.default.PropTypes.any,
  input: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  action: _react2.default.PropTypes.oneOf(["add", "remove", "none"]),
  addKeys: _react2.default.PropTypes.array
};
MultiText.defaultProps = {
  unique: true,
  WrapperStyle: {}
};