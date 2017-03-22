"use strict";

exports.__esModule = true;
exports.BaseMultiTextInput = undefined;

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
  base: {
    width: "100%",
    padding: ".1em",
    border: "1px solid grey",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  input: {
    flex: "1 0 25px",
    minWidth: "15px"
  }
};

var Tag = function (_React$Component) {
  _inherits(Tag, _React$Component);

  function Tag() {
    _classCallCheck(this, Tag);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Tag.prototype.render = function render() {
    return _react2.default.createElement(
      "span",
      {
        style: {
          padding: ".25em .5em",
          backgroundColor: "#c8af78",
          margin: "5px",
          color: "white",
          display: "inline-block"
        } },
      this.props.children,
      _react2.default.createElement(
        "span",
        {
          style: {
            marginLeft: "10px",
            textDecoration: "none"
          } },
        "x"
      )
    );
  };

  return Tag;
}(_react2.default.Component);

var BaseMultiTextInput = exports.BaseMultiTextInput = (0, _reactGetFormData.Formfield)(_class = (0, _radium2.default)(_class = function (_React$Component2) {
  _inherits(BaseMultiTextInput, _React$Component2);

  function BaseMultiTextInput(props) {
    _classCallCheck(this, BaseMultiTextInput);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    var value = props.valueInitial ? props.valueInitial : [];
    _this2.state = {
      current: "",
      tags: value,
      hasUpdated: false
    };
    return _this2;
  }

  BaseMultiTextInput.prototype.componentDidMount = function componentDidMount() {
    var formContext = this.context.formContext;

    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.tags, false);
      if (this.props.onChange) {
        this.props.onChange(this.state.tags);
      }
    }
  };

  BaseMultiTextInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.valueInitial !== nextProps.valueInitial) {
      var value = nextProps.valueInitial;
      this.setState({ tags: value });
      var formContext = this.context.formContext;

      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false);
        if (nextProps.onChange) {
          nextProps.onChange(value);
        }
      }
    }
  };

  BaseMultiTextInput.prototype.handleCheckExisting = function handleCheckExisting(original, valueToCheck) {
    return original.indexOf(valueToCheck) > -1;
  };

  BaseMultiTextInput.prototype.handleAddTag = function handleAddTag(value) {
    var newValue = value;
    var isEmpty = newValue === "";
    var isExistingValue = false;
    if (this.props.unique) {
      isExistingValue = this.handleCheckExisting(this.state.tags, newValue);
    }
    if (!isEmpty && !isExistingValue) {
      var newTags = this.state.tags.concat(newValue);
      var newState = { current: "", tags: newTags, hasUpdated: true };
      this.setState(newState);
    } else {
      this.setState({ current: "" });
    }
  };

  BaseMultiTextInput.prototype.handleChange = function handleChange(e) {
    this.setState({ current: e.target.value });
  };

  BaseMultiTextInput.prototype.handleClick = function handleClick() {
    if (this.input) this.input.focus();
  };

  BaseMultiTextInput.prototype.removeTag = function removeTag(value) {
    var newTags = this.state.tags.filter(function (tag) {
      return tag !== value;
    });
    this.setState({ tags: newTags, hasUpdated: true });
  };

  BaseMultiTextInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.state.hasUpdated) {
      var _props = this.props,
          name = _props.name,
          onChange = _props.onChange;
      var formContext = this.context.formContext;

      if (formContext && formContext.handleChange) formContext.handleChange("", name, this.state.tags, true);

      if (onChange) onChange(this.state.tags);
      this.setState({ hasUpdated: false });
    }
  };

  BaseMultiTextInput.prototype.handleKey = function handleKey(evt) {
    //test for backspace
    if (evt.keyCode === 8) {
      if (this.state.current === "" && this.state.tags.length > 0) {
        this.setState({
          tags: this.state.tags.slice(0, -1),
          hasUpdated: true
        });
      }
    }
    //test for enter and ','
    if (this.props.addKeys.indexOf(evt.keyCode) > -1) {
      if (this.state.current !== "") {
        this.handleAddTag(this.state.current);
        evt.preventDefault();
      }
    }
  };

  BaseMultiTextInput.prototype.renderTag = function renderTag(value) {
    var _this3 = this;

    var node = void 0;
    if (this.props.renderTag) node = this.props.renderTag(value);else node = _react2.default.createElement(
      Tag,
      null,
      value
    );
    return _react2.default.createElement(
      "a",
      { key: value, onClick: function onClick() {
          return _this3.removeTag(value);
        } },
      node
    );
  };

  BaseMultiTextInput.prototype.render = function render() {
    var _this4 = this;

    var _props2 = this.props,
        inputStyle = _props2.inputStyle,
        containerStyle = _props2.containerStyle;
    var _state = this.state,
        current = _state.current,
        tags = _state.tags;

    var renderedTags = tags.map(function (tag) {
      return _this4.renderTag(tag);
    });
    return _react2.default.createElement(
      "div",
      {
        style: [styles.base, containerStyle && containerStyle],
        onClick: function onClick() {
          return _this4.handleClick();
        }
      },
      renderedTags,
      _react2.default.createElement("input", {
        ref: function ref(item) {
          _this4.input = item;
        },
        onChange: function onChange(evt) {
          return _this4.handleChange(evt);
        },
        onKeyDown: function onKeyDown(evt) {
          return _this4.handleKey(evt);
        },
        style: [styles.input, inputStyle && inputStyle],
        value: current
      })
    );
  };

  return BaseMultiTextInput;
}(_react2.default.Component)) || _class) || _class;

BaseMultiTextInput.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  unique: _react2.default.PropTypes.bool,
  renderTag: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  valueInitial: _react2.default.PropTypes.any,
  inputStyle: _react2.default.PropTypes.object,
  containerStyle: _react2.default.PropTypes.object,
  addKeys: _react2.default.PropTypes.array
};
BaseMultiTextInput.defaultProps = {
  unique: true,
  addKeys: [13, 188] // Enter key and ','
};