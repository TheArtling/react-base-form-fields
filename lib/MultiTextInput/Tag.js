"use strict";

exports.__esModule = true;
exports.Tag = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = exports.Tag = function (_React$Component) {
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