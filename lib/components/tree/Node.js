"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _App = require("../../utils/App");

var _App2 = _interopRequireDefault(_App);

var _Style = require("../../utils/Style");

var _Style2 = _interopRequireDefault(_Style);

var _NodeConfig = require("./NodeConfig");

var _NodeConfig2 = _interopRequireDefault(_NodeConfig);

var _PropsManager = require("../PropsManager");

var _PropsManager2 = _interopRequireDefault(_PropsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = function (_React$Component) {
    _inherits(Node, _React$Component);

    function Node(props) {
        _classCallCheck(this, Node);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Node).call(this, props));

        _this.settings = _this.props.settings ? _this.props.settings : new _NodeConfig2.default();
        _this.toggle = _this.toggle.bind(_this);
        _this.getTreeNodes = _this.getTreeNodes.bind(_this);
        _this.getTreeLabel = _this.getTreeLabel.bind(_this);
        _this.getIconName = _this.getIconName.bind(_this);
        _this.createSessionStateForTree = _this.createSessionStateForTree.bind(_this);
        _this.showChildren = _this.showChildren.bind(_this);
        _this.childrenCallback = _this.childrenCallback.bind(_this);
        _this.renderChildren = _this.renderChildren.bind(_this);
        _this.propsManager = new _PropsManager2.default();
        _this.isSessionStateCreatedForTreeData = false;
        return _this;
    }

    _createClass(Node, [{
        key: "addCallbacks",
        value: function addCallbacks() {
            this.settings.open.addImmediateCallback(this, this.showChildren);
            this.settings.children.childListCallbacks.addGroupedCallback(this, this.childrenCallback);
            this.settings.label.addImmediateCallback(this, this.forceUpdate);
            this.settings.active.addImmediateCallback(this, this.forceUpdate);
        }
    }, {
        key: "removeCallbacks",
        value: function removeCallbacks() {
            this.settings.open.removeCallback(this, this.showChildren);
            this.settings.children.childListCallbacks.removeCallback(this, this.childrenCallback);
            this.settings.label.removeCallback(this, this.forceUpdate);
            this.settings.active.removeCallback(this, this.forceUpdate);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.addCallbacks();
            this.createSessionStateForTree();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.removeCallbacks();
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this.settings.open.value = !this.settings.open.value;
            if (this.props.clickCallback) this.props.clickCallback.call(this, this.props.data, this.settings);
            this.props.treeConfig.changeActiveNode(this.settings);
        }
    }, {
        key: "childrenCallback",
        value: function childrenCallback() {
            this.forceUpdate();
        }
    }, {
        key: "createSessionStateForTree",
        value: function createSessionStateForTree(data, label, nodes, icon) {
            if (data) {
                // calling with data arguments indicates data is changed so wipe the session state
                this.settings.reset();
            }
            this.settings.label.value = this.getTreeLabel(data, label);
            this.settings.iconName.value = this.getIconName(data, icon);
            var treeNodes = this.getTreeNodes(data, nodes);

            if (treeNodes && treeNodes.length) {
                this.settings.children.delayCallbacks();
                for (var i = 0; i < treeNodes.length; i++) {
                    var objectName = "node" + i;
                    var nodeConfig = this.settings.children.requestObject(objectName, _NodeConfig2.default);
                    var nodeLabel = this.getTreeLabel(treeNodes[i]);
                    nodeConfig.label.state = nodeLabel;
                    var nodeIcon = this.getIconName(treeNodes[i]);
                    nodeConfig.iconName.state = nodeIcon;
                }
                this.settings.children.resumeCallbacks();
            }
            this.isSessionStateCreatedForTreeData = true;
        }
    }, {
        key: "showChildren",
        value: function showChildren() {
            if (!this.isSessionStateCreatedForTreeData) {
                this.createSessionStateForTree();
            }
            if (this.props.treeConfig.defaultSelectedNodes.length > 0) {
                var nodeConfigs = this.settings.children.getObjects();
                nodeConfigs.map(function (nodeConfig, index) {
                    var nodeLabel = nodeConfig.label.state;
                    if (this.props.treeConfig.defaultSelectedNodes.indexOf(nodeLabel) !== -1) {
                        nodeConfig.open.value = true;
                    }
                }.bind(this));
            }
            this.forceUpdate();
        }
    }, {
        key: "getTreeNodes",
        value: function getTreeNodes(data, nodes) {
            if (!data && this.props.data) data = this.props.data;
            if (!nodes && this.props.nodes) nodes = this.props.nodes;
            if (data) {
                if (data[nodes] instanceof Function) {
                    return data[nodes]();
                } else {
                    return data[nodes];
                }
            } else return [];
        }
    }, {
        key: "getIconName",
        value: function getIconName(data, icon) {

            if (!data && this.props.data) data = this.props.data;
            if (!icon && this.props.icon) icon = this.props.icon;

            if (data) {
                if (data[icon] instanceof Function) {
                    return data[icon]();
                } else if (icon instanceof Function) {
                    return icon(data);
                } else {
                    return data[icon];
                }
            } else {
                return "";
            }
        }
    }, {
        key: "getTreeLabel",
        value: function getTreeLabel(data, label) {
            if (!data && this.props.data) data = this.props.data;
            if (!label && this.props.label) label = this.props.label;

            if (data) {
                if (data[label] instanceof Function) {
                    return data[label]();
                } else {
                    return data[label];
                }
            } else {
                return "";
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.data !== nextProps.data) {
                this.createSessionStateForTree(nextProps.data, nextProps.label, nextProps.nodes, nextProps.icon);
            }
            if (this.props.open !== nextProps.open) {
                this.settings.open.value = nextProps.open;
            }
        }
    }, {
        key: "renderChildren",
        value: function renderChildren() {
            this.propsManager.addNewProps("treeConfig", this.props.treeConfig);
            this.propsManager.addNewProps("label", this.props.label);
            this.propsManager.addNewProps("nodes", this.props.nodes);
            this.propsManager.addNewProps("icon", this.props.icon);
            this.propsManager.addNewProps("clickCallback", this.props.clickCallback);
            var treeNodes = this.getTreeNodes();
            this.propsManager.addKeyProps("data", treeNodes);
            return _App2.default.renderChildren(this, this.propsManager);
        }
    }, {
        key: "render",
        value: function render() {
            var nodeUI = _react2.default.createElement("div", null);
            var domeDefinedStyle = this.props.style;
            if (this.props.data) {
                var nodesUI = [];
                var nodes = this.settings.getNodes();
                if (this.settings.open.value) {
                    nodesUI = this.renderChildren();
                }

                var iconName = this.settings.iconName.value;
                var label = this.settings.label.value;
                if (nodes.length > 0) {
                    //folder
                    var branchStyle = this.props.treeConfig.branchStyle.getStyleFor();
                    var nodeStyle = this.props.treeConfig.nodeStyle.getStyleFor();
                    if (domeDefinedStyle) _Style2.default.mergeStyleObjects(nodeStyle, domeDefinedStyle, true); //this happens for rootNode
                    var controlName = this.props.treeConfig.getFolderIcon(this.settings.open.value);

                    var folderUI = _react2.default.createElement(
                        "span",
                        { style: nodeStyle, onClick: this.toggle },
                        _react2.default.createElement("i", { className: iconName }),
                        " ",
                        label,
                        _react2.default.createElement("span", { style: { flex: "1" } }),
                        _react2.default.createElement("i", { className: controlName })
                    );

                    var nodePadding = this.props.treeConfig.nodePadding.state;
                    nodeUI = _react2.default.createElement(
                        "span",
                        { style: branchStyle },
                        folderUI,
                        _react2.default.createElement(
                            "ul",
                            { style: { listStyleType: "none", paddingLeft: nodePadding } },
                            nodesUI
                        )
                    );
                } else {
                    //leaf
                    var fileIcon = this.props.treeConfig.getFileIcon(this.props.data, this.settings.open.value);
                    // this will return either normal/Active/Slected Style based on state of the leaf
                    var leafStyle = this.props.treeConfig.getLeafStyle(this.settings.open.value, this.settings.active.value);

                    nodeUI = _react2.default.createElement(
                        "li",
                        { style: leafStyle, onClick: this.toggle },
                        _react2.default.createElement("i", { className: iconName }),
                        " ",
                        label,
                        _react2.default.createElement("span", { style: { flex: "1" } }),
                        _react2.default.createElement("i", { className: fileIcon })
                    );
                }
            }

            return nodeUI;
        }
    }]);

    return Node;
}(_react2.default.Component);

_App2.default.registerToolImplementation("weavereact.NodeConfig", Node);
exports.default = Node;
//# sourceMappingURL=data:application/json;base64,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YyxNQUFkLEVBQXFCLGFBQVksV0FBWixFQUE3QixFQUFKOzRCQUNLLE9BREw7eUJBRkg7cUJBQVQsQ0FkZ0I7aUJBQXBCLE1BcUJJOztBQUNBLHdCQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixXQUF0QixDQUFrQyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWdCLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkIsQ0FBN0Q7O0FBREosd0JBR0ksWUFBWSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFlBQXRCLENBQW1DLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkIsRUFBeUIsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixLQUFyQixDQUF4RSxDQUhKOztBQUtBLDZCQUFTOzswQkFBSSxPQUFPLFNBQVAsRUFBa0IsU0FBUyxLQUFLLE1BQUwsRUFBL0I7d0JBQ0cscUNBQUcsV0FBVyxRQUFYLEVBQUgsQ0FESDs7d0JBRVUsS0FGVjt3QkFHRyx3Q0FBTSxPQUFPLEVBQUMsTUFBSyxHQUFMLEVBQVIsRUFBTixDQUhIO3dCQUlHLHFDQUFHLFdBQVcsUUFBWCxFQUFILENBSkg7cUJBQVQsQ0FMQTtpQkFyQko7YUFUSjs7QUE2Q0osbUJBQVMsTUFBVCxDQWhEUzs7OztXQWpLUDtFQUFhLGdCQUFNLFNBQU47O0FBc05uQixjQUFJLDBCQUFKLENBQStCLHVCQUEvQixFQUF1RCxJQUF2RDtrQkFDZSIsImZpbGUiOiJOb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBcHAgZnJvbSBcIi4uLy4uL3V0aWxzL0FwcFwiO1xuaW1wb3J0IFN0eWxlIGZyb20gXCIuLi8uLi91dGlscy9TdHlsZVwiO1xuaW1wb3J0IE5vZGVDb25maWcgZnJvbSBcIi4vTm9kZUNvbmZpZ1wiO1xuaW1wb3J0IFByb3BzTWFuYWdlciBmcm9tIFwiLi4vUHJvcHNNYW5hZ2VyXCJcblxuY2xhc3MgTm9kZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnByb3BzLnNldHRpbmdzID8gdGhpcy5wcm9wcy5zZXR0aW5nczpuZXcgTm9kZUNvbmZpZygpO1xuICAgICAgICB0aGlzLnRvZ2dsZSA9IHRoaXMudG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZ2V0VHJlZU5vZGVzID0gdGhpcy5nZXRUcmVlTm9kZXMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5nZXRUcmVlTGFiZWwgPSB0aGlzLmdldFRyZWVMYWJlbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmdldEljb25OYW1lID0gdGhpcy5nZXRJY29uTmFtZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNyZWF0ZVNlc3Npb25TdGF0ZUZvclRyZWUgPSB0aGlzLmNyZWF0ZVNlc3Npb25TdGF0ZUZvclRyZWUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zaG93Q2hpbGRyZW4gPSB0aGlzLnNob3dDaGlsZHJlbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuQ2FsbGJhY2sgPSB0aGlzLmNoaWxkcmVuQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbiA9IHRoaXMucmVuZGVyQ2hpbGRyZW4uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9wc01hbmFnZXIgPSBuZXcgUHJvcHNNYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuaXNTZXNzaW9uU3RhdGVDcmVhdGVkRm9yVHJlZURhdGEgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhZGRDYWxsYmFja3MoKXtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5vcGVuLmFkZEltbWVkaWF0ZUNhbGxiYWNrKHRoaXMsIHRoaXMuc2hvd0NoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jaGlsZHJlbi5jaGlsZExpc3RDYWxsYmFja3MuYWRkR3JvdXBlZENhbGxiYWNrKHRoaXMsIHRoaXMuY2hpbGRyZW5DYWxsYmFjayk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGFiZWwuYWRkSW1tZWRpYXRlQ2FsbGJhY2sodGhpcywgdGhpcy5mb3JjZVVwZGF0ZSk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuYWN0aXZlLmFkZEltbWVkaWF0ZUNhbGxiYWNrKHRoaXMsIHRoaXMuZm9yY2VVcGRhdGUpO1xuICAgIH1cblxuICAgIHJlbW92ZUNhbGxiYWNrcygpe1xuICAgICAgICB0aGlzLnNldHRpbmdzLm9wZW4ucmVtb3ZlQ2FsbGJhY2sodGhpcywgdGhpcy5zaG93Q2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnNldHRpbmdzLmNoaWxkcmVuLmNoaWxkTGlzdENhbGxiYWNrcy5yZW1vdmVDYWxsYmFjayh0aGlzLCB0aGlzLmNoaWxkcmVuQ2FsbGJhY2spO1xuICAgICAgICB0aGlzLnNldHRpbmdzLmxhYmVsLnJlbW92ZUNhbGxiYWNrKHRoaXMsIHRoaXMuZm9yY2VVcGRhdGUpO1xuICAgICAgICB0aGlzLnNldHRpbmdzLmFjdGl2ZS5yZW1vdmVDYWxsYmFjayh0aGlzLCB0aGlzLmZvcmNlVXBkYXRlKTtcbiAgICB9XG5cblxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdGhpcy5hZGRDYWxsYmFja3MoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVTZXNzaW9uU3RhdGVGb3JUcmVlKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgICAgIHRoaXMucmVtb3ZlQ2FsbGJhY2tzKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCl7XG4gICAgICAgIHRoaXMuc2V0dGluZ3Mub3Blbi52YWx1ZSA9ICF0aGlzLnNldHRpbmdzLm9wZW4udmFsdWU7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuY2xpY2tDYWxsYmFjaylcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2xpY2tDYWxsYmFjay5jYWxsKHRoaXMsdGhpcy5wcm9wcy5kYXRhLHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLnByb3BzLnRyZWVDb25maWcuY2hhbmdlQWN0aXZlTm9kZSh0aGlzLnNldHRpbmdzKVxuICAgIH1cblxuICAgIGNoaWxkcmVuQ2FsbGJhY2soKXtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cblxuXG5cbiAgICBjcmVhdGVTZXNzaW9uU3RhdGVGb3JUcmVlKGRhdGEsbGFiZWwsbm9kZXMsaWNvbikge1xuICAgICAgICBpZihkYXRhKXsgLy8gY2FsbGluZyB3aXRoIGRhdGEgYXJndW1lbnRzIGluZGljYXRlcyBkYXRhIGlzIGNoYW5nZWQgc28gd2lwZSB0aGUgc2Vzc2lvbiBzdGF0ZVxuICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldHRpbmdzLmxhYmVsLnZhbHVlID0gdGhpcy5nZXRUcmVlTGFiZWwoZGF0YSxsYWJlbCk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaWNvbk5hbWUudmFsdWUgPSB0aGlzLmdldEljb25OYW1lKGRhdGEsaWNvbik7XG4gICAgICAgIHZhciB0cmVlTm9kZXMgPSB0aGlzLmdldFRyZWVOb2RlcyhkYXRhLG5vZGVzKTtcblxuICAgICAgICBpZih0cmVlTm9kZXMgJiYgdHJlZU5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmNoaWxkcmVuLmRlbGF5Q2FsbGJhY2tzKCk7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdHJlZU5vZGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0TmFtZSA9IFwibm9kZVwiICsgaTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZUNvbmZpZyA9IHRoaXMuc2V0dGluZ3MuY2hpbGRyZW4ucmVxdWVzdE9iamVjdChvYmplY3ROYW1lLCBOb2RlQ29uZmlnKTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZUxhYmVsID0gdGhpcy5nZXRUcmVlTGFiZWwodHJlZU5vZGVzW2ldKVxuICAgICAgICAgICAgICAgIG5vZGVDb25maWcubGFiZWwuc3RhdGUgPSBub2RlTGFiZWw7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVJY29uID0gdGhpcy5nZXRJY29uTmFtZSh0cmVlTm9kZXNbaV0pXG4gICAgICAgICAgICAgICAgbm9kZUNvbmZpZy5pY29uTmFtZS5zdGF0ZSA9IG5vZGVJY29uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5jaGlsZHJlbi5yZXN1bWVDYWxsYmFja3MoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU2Vzc2lvblN0YXRlQ3JlYXRlZEZvclRyZWVEYXRhID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaG93Q2hpbGRyZW4oKXtcbiAgICAgICAgaWYoIXRoaXMuaXNTZXNzaW9uU3RhdGVDcmVhdGVkRm9yVHJlZURhdGEpe1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZXNzaW9uU3RhdGVGb3JUcmVlKClcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnByb3BzLnRyZWVDb25maWcuZGVmYXVsdFNlbGVjdGVkTm9kZXMubGVuZ3RoPjApe1xuICAgICAgICAgICAgdmFyIG5vZGVDb25maWdzID0gdGhpcy5zZXR0aW5ncy5jaGlsZHJlbi5nZXRPYmplY3RzKCk7XG4gICAgICAgICAgICBub2RlQ29uZmlncy5tYXAoZnVuY3Rpb24obm9kZUNvbmZpZyxpbmRleCl7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVMYWJlbCA9IG5vZGVDb25maWcubGFiZWwuc3RhdGU7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wcm9wcy50cmVlQ29uZmlnLmRlZmF1bHRTZWxlY3RlZE5vZGVzLmluZGV4T2Yobm9kZUxhYmVsKSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICBub2RlQ29uZmlnLm9wZW4udmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGdldFRyZWVOb2RlcyhkYXRhLG5vZGVzKXtcbiAgICAgICAgaWYoIWRhdGEgJiYgdGhpcy5wcm9wcy5kYXRhKWRhdGEgPSB0aGlzLnByb3BzLmRhdGE7XG4gICAgICAgIGlmKCFub2RlcyAmJiB0aGlzLnByb3BzLm5vZGVzKW5vZGVzID0gdGhpcy5wcm9wcy5ub2RlcztcbiAgICAgICAgaWYoZGF0YSl7XG4gICAgICAgICAgICBpZihkYXRhW25vZGVzXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtub2Rlc10oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbbm9kZXNdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGdldEljb25OYW1lKGRhdGEsaWNvbil7XG5cbiAgICAgICAgaWYoIWRhdGEgJiYgdGhpcy5wcm9wcy5kYXRhKWRhdGEgPSB0aGlzLnByb3BzLmRhdGE7XG4gICAgICAgIGlmKCFpY29uICYmIHRoaXMucHJvcHMuaWNvbilpY29uID0gdGhpcy5wcm9wcy5pY29uO1xuXG4gICAgICAgaWYoZGF0YSl7XG4gICAgICAgICAgICBpZihkYXRhW2ljb25dIGluc3RhbmNlb2YgRnVuY3Rpb24pe1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ljb25dKCk7XG4gICAgICAgICAgICB9ZWxzZSBpZihpY29uIGluc3RhbmNlb2YgRnVuY3Rpb24pe1xuICAgICAgICAgICAgICAgIHJldHVybiBpY29uKGRhdGEpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbaWNvbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUcmVlTGFiZWwoZGF0YSxsYWJlbCl7XG4gICAgICAgIGlmKCFkYXRhICYmIHRoaXMucHJvcHMuZGF0YSlkYXRhID0gdGhpcy5wcm9wcy5kYXRhO1xuICAgICAgICBpZighbGFiZWwgJiYgdGhpcy5wcm9wcy5sYWJlbClsYWJlbCA9IHRoaXMucHJvcHMubGFiZWw7XG5cbiAgICAgICAgaWYoZGF0YSl7XG4gICAgICAgICAgICBpZihkYXRhW2xhYmVsXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtsYWJlbF0oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2xhYmVsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5kYXRhICE9PSBuZXh0UHJvcHMuZGF0YSl7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNlc3Npb25TdGF0ZUZvclRyZWUobmV4dFByb3BzLmRhdGEsbmV4dFByb3BzLmxhYmVsLG5leHRQcm9wcy5ub2RlcyxuZXh0UHJvcHMuaWNvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5wcm9wcy5vcGVuICE9PSBuZXh0UHJvcHMub3Blbil7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLm9wZW4udmFsdWUgPSBuZXh0UHJvcHMub3BlbjtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKXtcbiAgICAgICAgdGhpcy5wcm9wc01hbmFnZXIuYWRkTmV3UHJvcHMoXCJ0cmVlQ29uZmlnXCIsdGhpcy5wcm9wcy50cmVlQ29uZmlnKTtcbiAgICAgICAgdGhpcy5wcm9wc01hbmFnZXIuYWRkTmV3UHJvcHMoXCJsYWJlbFwiLHRoaXMucHJvcHMubGFiZWwpO1xuICAgICAgICB0aGlzLnByb3BzTWFuYWdlci5hZGROZXdQcm9wcyhcIm5vZGVzXCIsdGhpcy5wcm9wcy5ub2Rlcyk7XG4gICAgICAgIHRoaXMucHJvcHNNYW5hZ2VyLmFkZE5ld1Byb3BzKFwiaWNvblwiLHRoaXMucHJvcHMuaWNvbik7XG4gICAgICAgIHRoaXMucHJvcHNNYW5hZ2VyLmFkZE5ld1Byb3BzKFwiY2xpY2tDYWxsYmFja1wiLHRoaXMucHJvcHMuY2xpY2tDYWxsYmFjayk7XG4gICAgICAgIHZhciB0cmVlTm9kZXMgPSB0aGlzLmdldFRyZWVOb2RlcygpO1xuICAgICAgICB0aGlzLnByb3BzTWFuYWdlci5hZGRLZXlQcm9wcyhcImRhdGFcIix0cmVlTm9kZXMpO1xuICAgICAgICByZXR1cm4gQXBwLnJlbmRlckNoaWxkcmVuKHRoaXMsIHRoaXMucHJvcHNNYW5hZ2VyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBub2RlVUkgPSA8ZGl2Lz47XG4gICAgICAgIHZhciBkb21lRGVmaW5lZFN0eWxlID0gdGhpcy5wcm9wcy5zdHlsZTtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5kYXRhKXtcbiAgICAgICAgICAgIHZhciBub2Rlc1VJID0gW107XG4gICAgICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLnNldHRpbmdzLmdldE5vZGVzKCk7XG4gICAgICAgICAgICBpZih0aGlzLnNldHRpbmdzLm9wZW4udmFsdWUpe1xuICAgICAgICAgICAgICAgIG5vZGVzVUkgPSB0aGlzLnJlbmRlckNoaWxkcmVuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpY29uTmFtZSA9IHRoaXMuc2V0dGluZ3MuaWNvbk5hbWUudmFsdWU7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLnNldHRpbmdzLmxhYmVsLnZhbHVlO1xuICAgICAgICAgICAgaWYobm9kZXMubGVuZ3RoID4gMCl7IC8vZm9sZGVyXG4gICAgICAgICAgICAgICAgdmFyIGJyYW5jaFN0eWxlID0gdGhpcy5wcm9wcy50cmVlQ29uZmlnLmJyYW5jaFN0eWxlLmdldFN0eWxlRm9yKCk7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVTdHlsZSA9IHRoaXMucHJvcHMudHJlZUNvbmZpZy5ub2RlU3R5bGUuZ2V0U3R5bGVGb3IoKTtcbiAgICAgICAgICAgICAgICBpZihkb21lRGVmaW5lZFN0eWxlKVN0eWxlLm1lcmdlU3R5bGVPYmplY3RzKG5vZGVTdHlsZSxkb21lRGVmaW5lZFN0eWxlLHRydWUpOy8vdGhpcyBoYXBwZW5zIGZvciByb290Tm9kZVxuICAgICAgICAgICAgICAgIHZhciBjb250cm9sTmFtZSA9IHRoaXMucHJvcHMudHJlZUNvbmZpZy5nZXRGb2xkZXJJY29uKHRoaXMuc2V0dGluZ3Mub3Blbi52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZm9sZGVyVUkgPSA8c3BhbiBzdHlsZT17bm9kZVN0eWxlfSBvbkNsaWNrPXt0aGlzLnRvZ2dsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9e2ljb25OYW1lfSA+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7e2xhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbGV4OlwiMVwifX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXtjb250cm9sTmFtZX0gPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPjtcblxuICAgICAgICAgICAgICAgIHZhciBub2RlUGFkZGluZyA9IHRoaXMucHJvcHMudHJlZUNvbmZpZy5ub2RlUGFkZGluZy5zdGF0ZTtcbiAgICAgICAgICAgICAgICBub2RlVUkgPSA8c3BhbiBzdHlsZT17YnJhbmNoU3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb2xkZXJVSX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgc3R5bGU9e3tsaXN0U3R5bGVUeXBlOlwibm9uZVwiLHBhZGRpbmdMZWZ0Om5vZGVQYWRkaW5nfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtub2Rlc1VJfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7IC8vbGVhZlxuICAgICAgICAgICAgICAgIHZhciBmaWxlSWNvbiA9IHRoaXMucHJvcHMudHJlZUNvbmZpZy5nZXRGaWxlSWNvbih0aGlzLnByb3BzLmRhdGEsdGhpcy5zZXR0aW5ncy5vcGVuLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdpbGwgcmV0dXJuIGVpdGhlciBub3JtYWwvQWN0aXZlL1NsZWN0ZWQgU3R5bGUgYmFzZWQgb24gc3RhdGUgb2YgdGhlIGxlYWZcbiAgICAgICAgICAgICAgICB2YXIgbGVhZlN0eWxlID0gdGhpcy5wcm9wcy50cmVlQ29uZmlnLmdldExlYWZTdHlsZSh0aGlzLnNldHRpbmdzLm9wZW4udmFsdWUsdGhpcy5zZXR0aW5ncy5hY3RpdmUudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVVJID0gPGxpIHN0eWxlPXtsZWFmU3R5bGV9IG9uQ2xpY2s9e3RoaXMudG9nZ2xlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9e2ljb25OYW1lfSA+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwO3tsYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2ZsZXg6XCIxXCJ9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXtmaWxlSWNvbn0+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgcmV0dXJuICggbm9kZVVJKTtcbiAgICB9XG5cbn1cblxuQXBwLnJlZ2lzdGVyVG9vbEltcGxlbWVudGF0aW9uKFwid2VhdmVyZWFjdC5Ob2RlQ29uZmlnXCIsTm9kZSk7XG5leHBvcnQgZGVmYXVsdCBOb2RlO1xuIl19