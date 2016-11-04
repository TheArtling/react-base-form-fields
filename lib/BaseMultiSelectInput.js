"use strict";

exports.__esModule = true;
exports.BaseMultiSelectInput = undefined;

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

var BaseMultiSelectInput = exports.BaseMultiSelectInput = (0, _reactGetFormData.Formfield)(_class = (0, _radium2.default)(_class = function (_React$Component) {
  _inherits(BaseMultiSelectInput, _React$Component);

  function BaseMultiSelectInput(props) {
    _classCallCheck(this, BaseMultiSelectInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
    // See BaseTextInput for explanation.


    var value = _this.getValue(props.valueInitial);
    _this.state = { value: value, isActive: false };
    return _this;
  }
  // Base component for a DropDownList that can have several selected items.
  // In order to style this, write a wrapper component that has this as a child
  // and passes in all necessary props.
  //
  // @prop options: Should be an array of objects. Each object should be of
  //   the form `{value: "1", label: "Foo"}`. The first item in the list should
  //   be the empty value, i.e. `{value: "", label: "All"}`. When the user
  //   selects this item, all other items will be de-selected.
  //
  // @prop renderDisplay(value): This function should return the component
  //   that is rendered when the DDL is not selected.
  //
  // @prop renderItem(name, index, label, value, selected, handleChangeCallback):
  //   This function should return the component that represents one selectable
  //   option in the modal that opens when the user clicks at the displayValue.
  //
  // @prop modal: Your project's component class for a modal. It must have a
  //   `showModal` prop, if set to `true`, it should show the modal. It must
  //   emit an `onClose` event that can be handled by this base component.

  BaseMultiSelectInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // See BaseTextInput for explanation.
    if (this.props.valueInitial !== nextProps.valueInitial) {
      var value = this.getValue(nextProps.valueInitial);
      this.setState({ value: value });
      var formContext = this.context.formContext;

      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false);
      }
    }
  };

  BaseMultiSelectInput.prototype.getValue = function getValue(value) {
    // Helper function to "normalize" the value.
    // If this field is empty, we turn it into an empty Array.
    // If this field is not an Array, we turn it into an Array with one element.
    if (!value) {
      value = [];
    }
    if (value instanceof Array === false) {
      value = [value];
    }
    return value;
  };

  BaseMultiSelectInput.prototype.setChangedValue = function setChangedValue(value) {
    var name = this.props.name;
    var formContext = this.context.formContext;

    if (formContext && formContext.handleChange) {
      formContext.handleChange("", name, value, true);
    }
    this.setState({ value: value });
  };

  BaseMultiSelectInput.prototype.handleChange = function handleChange(e) {
    // See BaseTextInput for explanation.
    //
    // This component is based on checkboxes. If the user clicks on a checkbox,
    // it always emits the checkbox value, we don't know if it was checked or
    // unchecked. Therefore, we check if the value currently exists in our
    // internal state or not. If it exists, we remove it, if it doesn't exist,
    // we add it.
    //
    var options = this.props.options;
    var value = this.state.value;

    var newValue = e.target.value;

    if (newValue === options[0].value) {
      return this.setChangedValue([]);
    }

    var newValueList = value;
    var found = false;
    value.forEach(function (item, index) {
      if (item === newValue) {
        found = true;
        newValueList.splice(index, 1);
      }
    });
    if (!found) {
      newValueList.push(newValue);
    }
    this.setChangedValue(newValueList);
  };

  BaseMultiSelectInput.prototype.getDisplayValue = function getDisplayValue() {
    // Returns the value that should be shown when the DDL is not activated.
    //
    // This should be a comma separated list of selected items.
    //
    var options = this.props.options;
    var value = this.state.value;

    var displayValue = "";
    value.forEach(function (value) {
      options.forEach(function (option) {
        if (value === option.value) {
          displayValue += option.label + ", ";
        }
      });
    });
    if (displayValue) {
      displayValue = displayValue.replace(/, $/, "");
    }
    if (!displayValue) {
      return options[0].label;
    }
    return displayValue;
  };

  BaseMultiSelectInput.prototype.handleClick = function handleClick() {
    // Toggles active state of the modal when user clicks at the displayValue.
    this.setState({ isActive: !this.state.isActive });
  };

  BaseMultiSelectInput.prototype.handleClose = function handleClose() {
    // Closes the modal.
    this.setState({ isActive: false });
  };

  BaseMultiSelectInput.prototype.renderItems = function renderItems() {
    var _this2 = this;

    // Renders the items that should be shown in the modal.
    //
    // These should be checkboxes so that the user can select many items.
    //
    var _props = this.props,
        name = _props.name,
        options = _props.options,
        renderItem = _props.renderItem;
    var value = this.state.value;

    return options.map(function (option, index) {
      var selected = false;
      value.forEach(function (valueItem) {
        if (valueItem === option.value) {
          selected = true;
        }
      });

      if (value instanceof Array && value.length === 0 && option.value === "") {
        // if no item is selected, then the first option (the empty item)
        // should be treated as selected
        selected = true;
      }

      var item = renderItem(name, index, option.label, option.value, selected, function (e) {
        return _this2.handleChange(e);
      });
      return item;
    });
  };

  BaseMultiSelectInput.prototype.render = function render() {
    var _this3 = this;

    var renderDisplay = this.props.renderDisplay;
    var isActive = this.state.isActive;

    var value = this.getDisplayValue();
    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { onClick: function onClick() {
            return _this3.handleClick();
          } },
        renderDisplay(value)
      ),
      _react2.default.createElement(
        this.props.modal,
        { showModal: isActive, onClose: function onClose() {
            return _this3.handleClose();
          } },
        this.renderItems()
      )
    );
  };

  return BaseMultiSelectInput;
}(_react2.default.Component)) || _class) || _class;

BaseMultiSelectInput.propTypes = {
  modal: _react2.default.PropTypes.any.isRequired,
  name: _react2.default.PropTypes.string.isRequired,
  options: _react2.default.PropTypes.array.isRequired,
  renderDisplay: _react2.default.PropTypes.func.isRequired,
  renderItem: _react2.default.PropTypes.func.isRequired,
  valueInitial: _react2.default.PropTypes.any
};