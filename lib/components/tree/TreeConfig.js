"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NodeConfig = require("./NodeConfig");

var _NodeConfig2 = _interopRequireDefault(_NodeConfig);

var _InlineStyle = require("../../configs/InlineStyle");

var _InlineStyle2 = _interopRequireDefault(_InlineStyle);

var _ComponentManager = require("../../ComponentManager");

var _ComponentManager2 = _interopRequireDefault(_ComponentManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreeConfig = function () {
    function TreeConfig() {
        _classCallCheck(this, TreeConfig);

        _ComponentManager2.default.createDefaultSessionProperties(this);

        Object.defineProperties(this, {
            treeIconState: {
                value: Weave.linkableChild(this, new weavejs.core.LinkableVariable())
            },
            enableDataTypeIcon: {
                value: Weave.linkableChild(this, new weavejs.core.LinkableBoolean(false))
            },
            align: {
                value: Weave.linkableChild(this, new weavejs.core.LinkableString("left"))
            },
            nodePadding: {
                value: Weave.linkableChild(this, new weavejs.core.LinkableString("20px"))
            },
            rootNode: {
                value: Weave.linkableChild(this, new _NodeConfig2.default())
            },
            rootStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            nodeStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            nodeListStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            nodeIconStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            leafStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            leafIconStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            selectedLeafStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            activeLeafStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            branchStyle: {
                value: Weave.linkableChild(this, new _InlineStyle2.default())
            },
            enableAccordionMode: {
                value: Weave.linkableChild(this, new weavejs.core.LinkableBoolean(false))
            },
            selectionType: { // radio | check
                value: Weave.linkableChild(this, weavejs.core.LinkableString)
            },
            defaultSelectedNodes: {
                value: Weave.linkableChild(this, new weavejs.core.LinkableVariable())
            },
            enableMenuModeFromLevel: {
                value: Weave.linkableChild(this, weavejs.core.LinkableNumber)
            }
        });

        this.dataTypesMap = null;
        this.getDataType = null;

        this.defaultSelectedNodes.state = [];

        this.branchStyle.state = {
            "display": "flex",
            "flexDirection": "column"
        };

        this.nodeStyle.state = {
            "display": "flex",
            "flexDirection": this.reverseLayout.state ? "row-reverse" : "row",
            "alignItems": "center"
        };

        //todo - add getter setter to facilitate settings only one state
        // or create like InlineStyle
        this.treeIconState.state = {
            "nodeDefault": this.reverseLayout.state ? "fa fa-folder fa-flip-horizontal" : "fa fa-folder",
            "nodeOpen": this.reverseLayout.state ? "fa fa-folder-open fa-flip-horizontal" : "fa fa-folder-open",
            "leafDefault": this.reverseLayout.state ? "fa fa-file-text fa-flip-horizontal" : "fa fa-file-text",
            "leafOpen": this.reverseLayout.state ? "fa fa-file-text-o fa-flip-horizontal" : "fa-file-text-o",
            "select": this.reverseLayout.state ? "fa fa-check-square-o fa-flip-horizontal" : "fa fa-check-square-o",
            "unSelect": this.reverseLayout.state ? "fa fa-square-o fa-flip-horizontal" : "fa fa-square-o"
        };

        this.nodeIconStyle.state = {
            width: "20px",
            height: "20px",
            paddingRight: "2px"
        };

        this.leafStyle.state = {
            "display": "flex",
            "flexDirection": this.reverseLayout.state ? "row-reverse" : "row",
            "alignItems": "center"
        };

        this.activeLeafStyle.state = {
            "background": "orange"
        };

        //todo move this to componentManager defaultCallbacks
        this.reverseLayout.addImmediateCallback(this, this.updateStyle);
    }

    _createClass(TreeConfig, [{
        key: "updateStyle",
        value: function updateStyle() {
            var flexDir = this.reverseLayout.state ? "row-reverse" : "row";
            this.nodeStyle.state = { flexDirection: flexDir };
            this.leafStyle.state = { flexDirection: flexDir };
            _ComponentManager2.default.flipIcons(this, ["treeIconState"]);
        }
    }, {
        key: "mergeInto",
        value: function mergeInto(into, obj) {
            for (var attr in obj) {
                into[attr] = obj[attr];
            }
            return into;
        }
    }, {
        key: "getLeafStyle",
        value: function getLeafStyle(selected, active) {
            var style = this.leafStyle.state;
            if (selected) {
                this.mergeInto(style, this.selectedLeafStyle.state);
                if (active) return this.mergeInto(style, this.activeLeafStyle.state);
            }
            return style;
        }
    }, {
        key: "getListStyle",
        value: function getListStyle() {
            var style = this.nodeListStyle.state;
            return style;
        }
    }, {
        key: "getStyleForIconType",
        value: function getStyleForIconType(type, iconName) {
            var iconStyleObj = type == "branch" ? this.nodeIconStyle.state : this.leafIconStyle.state;

            return iconStyleObj;
        }
    }, {
        key: "setDefaultNodeSelection",


        //to-do do this for entire tree rather only for the first child
        value: function setDefaultNodeSelection(nodesLabel) {
            this.defaultSelectedNodes.state = nodesLabel;
        }
    }, {
        key: "getActiveAncestorNode",
        value: function getActiveAncestorNode(nodeConfig) {
            if (nodeConfig.active.state) {
                return null;
            }

            var lhmOwner = Weave.getOwner(nodeConfig);
            var owner = Weave.getOwner(lhmOwner); // lHM -> NodeConfig
            if (!owner || owner.constructor !== nodeConfig.constructor) {
                return null;
            } else if (owner.active.state) {
                return owner;
            } else {
                return this.getActiveAncestorNode(owner);
            }
        }
    }, {
        key: "getActiveSiblingNode",
        value: function getActiveSiblingNode(nodeConfig) {

            var owner = Weave.getOwner(nodeConfig);
            if (!owner || owner.constructor !== nodeConfig.constructor) {
                return null;
            }
            var children = owner.getObjects();
            for (var i = 0; i < children.length; i++) {
                if (nodeConfig !== children[i]) {
                    if (children[i].active.state) return children[i];
                }
            }

            return null;
        }
    }, {
        key: "changeActiveNode",
        value: function changeActiveNode(nodeConfig, nodeData, eventType) {
            var lhmOwner = Weave.getOwner(nodeConfig);
            var parentNode = Weave.getOwner(lhmOwner); // lHM -> NodeConfig
            var activeSiblingNode = this.getActiveSiblingNode(nodeConfig);
            var activeAncestorNode = this.getActiveAncestorNode(nodeConfig);

            /*** active Mode (Active State Update) ****/
            if (activeAncestorNode) activeAncestorNode.active.value = false;
            if (activeSiblingNode) activeSiblingNode.active.value = false;

            nodeConfig.active.value = true;

            /*** selection Mode (Select state Update) ****/
            if (this.selectionType.value && (!eventType || eventType == "select")) {
                if (this.selectionType.value == "radio") {
                    if (activeSiblingNode) activeSiblingNode.select.value = false;

                    if (parentNode && parentNode.selectedChild && parentNode.selectedChild !== nodeConfig) {
                        parentNode.selectedChild.select.value = false;
                    }

                    nodeConfig.select.value = true;
                } else if (this.selectionType.value == "check") // toggle selection
                    {
                        nodeConfig.select.value = !nodeConfig.select.value;
                        if (nodeConfig.select.value) {
                            parentNode.selectedNodes.push(nodeData);
                        } else {
                            var nodeIndex = parentNode.selectedNodes.indexOf(nodeData);
                            if (nodeIndex !== -1) {
                                parentNode.selectedNodes.splice(nodeIndex, 1);
                            }
                        }
                    }

                parentNode.selectedChild = nodeConfig;
            }

            if (!eventType || eventType == "open") {
                /*** Open Mode (Open State Udpate) ****/
                if (this.enableAccordionMode.state) // accordion Mode
                    {
                        if (activeSiblingNode) activeSiblingNode.open.value = false;

                        if (parentNode && parentNode.openedChild && parentNode.openedChild !== nodeConfig) {
                            parentNode.openedChild.open.value = false;
                        }
                    }
                nodeConfig.open.state = !nodeConfig.open.state; // toggle open state

                parentNode.openedChild = nodeConfig;
            }
        }
    }, {
        key: "getFileIcon",
        value: function getFileIcon(data, isOpen) {
            if (data) {
                if (this.enableDataTypeIcon.value) {
                    var datType = this.getDataType ? this.getDataType(data) : data.constructor.name;
                    if (this.dataTypesMap && this.dataTypesMap[datType]) return this.dataTypesMap[datType];
                } else {
                    return isOpen ? this.treeIconState.state.leafOpen : this.treeIconState.state.leafDefault;
                }
            } else return "";
        }
    }, {
        key: "getFolderIcon",
        value: function getFolderIcon(isOpen) {
            return isOpen ? this.treeIconState.state.nodeOpen : this.treeIconState.state.nodeDefault;
        }
    }, {
        key: "getSelectIcon",
        value: function getSelectIcon(isSelected) {
            return isSelected ? this.treeIconState.state["select"] : this.treeIconState.state["unSelect"];
        }
    }]);

    return TreeConfig;
}();

//This Function makes this class as SessionClass


exports.default = TreeConfig;
Weave.registerClass(TreeConfig, ['weavereact.TreeConfig'], [weavejs.api.core.ILinkableObject], "Tree Config");
//# sourceMappingURL=data:application/json;base64,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QUFMLENBQW1CLEtBQW5CLENBQXlCLFFBQXpCLEdBQXFDLEtBQUssYUFBTCxDQUFtQixLQUFuQixDQUF5QixXQUF6QixDQURwRDtpQkFKTDthQURKLE1BU0ksT0FBTyxFQUFQLENBVEo7Ozs7c0NBY1csUUFDZjtBQUNJLG1CQUFPLFNBQVMsS0FBSyxhQUFMLENBQW1CLEtBQW5CLENBQXlCLFFBQXpCLEdBQW9DLEtBQUssYUFBTCxDQUFtQixLQUFuQixDQUF5QixXQUF6QixDQUR4RDs7OztzQ0FJZSxZQUNmO0FBQ0ksbUJBQU8sYUFBYSxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBeUIsUUFBekIsQ0FBYixHQUFrRCxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBeUIsVUFBekIsQ0FBbEQsQ0FEWDs7OztXQTVUaUI7Ozs7Ozs7QUFvVWpCLE1BQU0sYUFBTixDQUFxQixVQUFyQixFQUFnQyxDQUFDLHVCQUFELENBQWhDLEVBQTBELENBQUMsUUFBUSxHQUFSLENBQVksSUFBWixDQUFpQixlQUFqQixDQUEzRCxFQUE2RixhQUE3RiIsImZpbGUiOiJUcmVlQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTm9kZUNvbmZpZyBmcm9tIFwiLi9Ob2RlQ29uZmlnXCI7XG5pbXBvcnQgSW5saW5lU3R5bGUgZnJvbSBcIi4uLy4uL2NvbmZpZ3MvSW5saW5lU3R5bGVcIjtcbmltcG9ydCBDb21wb25lbnRNYW5hZ2VyIGZyb20gXCIuLi8uLi9Db21wb25lbnRNYW5hZ2VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWVDb25maWd7XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgQ29tcG9uZW50TWFuYWdlci5jcmVhdGVEZWZhdWx0U2Vzc2lvblByb3BlcnRpZXModGhpcyk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgICAgICAgdHJlZUljb25TdGF0ZTp7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IHdlYXZlanMuY29yZS5MaW5rYWJsZVZhcmlhYmxlKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlRGF0YVR5cGVJY29uOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IHdlYXZlanMuY29yZS5MaW5rYWJsZUJvb2xlYW4oZmFsc2UpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsaWduOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IHdlYXZlanMuY29yZS5MaW5rYWJsZVN0cmluZyhcImxlZnRcIikpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9kZVBhZGRpbmc6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogV2VhdmUubGlua2FibGVDaGlsZCh0aGlzLCBuZXcgd2VhdmVqcy5jb3JlLkxpbmthYmxlU3RyaW5nKFwiMjBweFwiKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByb290Tm9kZTp7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IE5vZGVDb25maWcoKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByb290U3R5bGU6e1xuICAgICAgICAgICAgICAgIHZhbHVlOiBXZWF2ZS5saW5rYWJsZUNoaWxkKHRoaXMsIG5ldyBJbmxpbmVTdHlsZSgpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vZGVTdHlsZTp7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IElubGluZVN0eWxlKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9kZUxpc3RTdHlsZTp7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IElubGluZVN0eWxlKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9kZUljb25TdHlsZTp7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IElubGluZVN0eWxlKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVhZlN0eWxlOntcbiAgICAgICAgICAgICAgICB2YWx1ZTogV2VhdmUubGlua2FibGVDaGlsZCh0aGlzLCBuZXcgSW5saW5lU3R5bGUoKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWFmSWNvblN0eWxlOntcbiAgICAgICAgICAgICAgICB2YWx1ZTogV2VhdmUubGlua2FibGVDaGlsZCh0aGlzLCBuZXcgSW5saW5lU3R5bGUoKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RlZExlYWZTdHlsZTp7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IElubGluZVN0eWxlKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZlTGVhZlN0eWxlOntcbiAgICAgICAgICAgICAgICB2YWx1ZTogV2VhdmUubGlua2FibGVDaGlsZCh0aGlzLCBuZXcgSW5saW5lU3R5bGUoKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmFuY2hTdHlsZTp7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgbmV3IElubGluZVN0eWxlKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlQWNjb3JkaW9uTW9kZTp7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFdlYXZlLmxpbmthYmxlQ2hpbGQodGhpcywgIG5ldyB3ZWF2ZWpzLmNvcmUuTGlua2FibGVCb29sZWFuKGZhbHNlKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Rpb25UeXBlOnsgLy8gcmFkaW8gfCBjaGVja1xuICAgICAgICAgICAgICAgIHZhbHVlOiBXZWF2ZS5saW5rYWJsZUNoaWxkKHRoaXMsICAgd2VhdmVqcy5jb3JlLkxpbmthYmxlU3RyaW5nKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZE5vZGVzOntcbiAgICAgICAgICAgICAgICB2YWx1ZTogV2VhdmUubGlua2FibGVDaGlsZCh0aGlzLCAgbmV3IHdlYXZlanMuY29yZS5MaW5rYWJsZVZhcmlhYmxlKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlTWVudU1vZGVGcm9tTGV2ZWw6e1xuICAgICAgICAgICAgICAgIHZhbHVlOiBXZWF2ZS5saW5rYWJsZUNoaWxkKHRoaXMsICB3ZWF2ZWpzLmNvcmUuTGlua2FibGVOdW1iZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5kYXRhVHlwZXNNYXAgPSBudWxsO1xuICAgICAgICB0aGlzLmdldERhdGFUeXBlID0gbnVsbDtcblxuICAgICAgICB0aGlzLmRlZmF1bHRTZWxlY3RlZE5vZGVzLnN0YXRlID0gW107XG5cbiAgICAgICAgdGhpcy5icmFuY2hTdHlsZS5zdGF0ZSA9IHtcbiAgICAgICAgICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ub2RlU3R5bGUuc3RhdGUgPSB7XG4gICAgICAgICAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgICAgICAgICBcImZsZXhEaXJlY3Rpb25cIjogdGhpcy5yZXZlcnNlTGF5b3V0LnN0YXRlP1wicm93LXJldmVyc2VcIiA6IFwicm93XCIsXG4gICAgICAgICAgICBcImFsaWduSXRlbXNcIjpcImNlbnRlclwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy90b2RvIC0gYWRkIGdldHRlciBzZXR0ZXIgdG8gZmFjaWxpdGF0ZSBzZXR0aW5ncyBvbmx5IG9uZSBzdGF0ZVxuICAgICAgICAvLyBvciBjcmVhdGUgbGlrZSBJbmxpbmVTdHlsZVxuICAgICAgICB0aGlzLnRyZWVJY29uU3RhdGUuc3RhdGUgPSB7XG4gICAgICAgICAgICBcIm5vZGVEZWZhdWx0XCIgOiB0aGlzLnJldmVyc2VMYXlvdXQuc3RhdGU/XCJmYSBmYS1mb2xkZXIgZmEtZmxpcC1ob3Jpem9udGFsXCI6XCJmYSBmYS1mb2xkZXJcIixcbiAgICAgICAgICAgIFwibm9kZU9wZW5cIiA6IHRoaXMucmV2ZXJzZUxheW91dC5zdGF0ZT9cImZhIGZhLWZvbGRlci1vcGVuIGZhLWZsaXAtaG9yaXpvbnRhbFwiOlwiZmEgZmEtZm9sZGVyLW9wZW5cIixcbiAgICAgICAgICAgIFwibGVhZkRlZmF1bHRcIiA6IHRoaXMucmV2ZXJzZUxheW91dC5zdGF0ZT9cImZhIGZhLWZpbGUtdGV4dCBmYS1mbGlwLWhvcml6b250YWxcIjpcImZhIGZhLWZpbGUtdGV4dFwiLFxuICAgICAgICAgICAgXCJsZWFmT3BlblwiIDogdGhpcy5yZXZlcnNlTGF5b3V0LnN0YXRlP1wiZmEgZmEtZmlsZS10ZXh0LW8gZmEtZmxpcC1ob3Jpem9udGFsXCI6XCJmYS1maWxlLXRleHQtb1wiLFxuICAgICAgICAgICAgXCJzZWxlY3RcIjp0aGlzLnJldmVyc2VMYXlvdXQuc3RhdGU/XCJmYSBmYS1jaGVjay1zcXVhcmUtbyBmYS1mbGlwLWhvcml6b250YWxcIjpcImZhIGZhLWNoZWNrLXNxdWFyZS1vXCIsXG4gICAgICAgICAgICBcInVuU2VsZWN0XCI6dGhpcy5yZXZlcnNlTGF5b3V0LnN0YXRlP1wiZmEgZmEtc3F1YXJlLW8gZmEtZmxpcC1ob3Jpem9udGFsXCI6XCJmYSBmYS1zcXVhcmUtb1wiLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubm9kZUljb25TdHlsZS5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBcIjIwcHhcIixcbiAgICAgICAgICAgIGhlaWdodCA6IFwiMjBweFwiLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OlwiMnB4XCJcbiAgICAgICAgfTtcblxuXG4gICAgICAgIHRoaXMubGVhZlN0eWxlLnN0YXRlID0ge1xuICAgICAgICAgICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IHRoaXMucmV2ZXJzZUxheW91dC5zdGF0ZT9cInJvdy1yZXZlcnNlXCIgOiBcInJvd1wiLFxuICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6XCJjZW50ZXJcIlxuICAgICAgICB9O1xuXG5cbiAgICAgICAgdGhpcy5hY3RpdmVMZWFmU3R5bGUuc3RhdGUgPSB7XG4gICAgICAgICAgICBcImJhY2tncm91bmRcIiA6IFwib3JhbmdlXCJcbiAgICAgICAgfTtcblxuICAgICAgICAvL3RvZG8gbW92ZSB0aGlzIHRvIGNvbXBvbmVudE1hbmFnZXIgZGVmYXVsdENhbGxiYWNrc1xuICAgICAgICB0aGlzLnJldmVyc2VMYXlvdXQuYWRkSW1tZWRpYXRlQ2FsbGJhY2sodGhpcywgdGhpcy51cGRhdGVTdHlsZSk7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVTdHlsZSgpXG4gICAge1xuICAgICAgICB2YXIgZmxleERpciA9IHRoaXMucmV2ZXJzZUxheW91dC5zdGF0ZT9cInJvdy1yZXZlcnNlXCI6XCJyb3dcIjtcbiAgICAgICAgdGhpcy5ub2RlU3R5bGUuc3RhdGUgPSB7ZmxleERpcmVjdGlvbjpmbGV4RGlyfTtcbiAgICAgICAgdGhpcy5sZWFmU3R5bGUuc3RhdGUgPSB7ZmxleERpcmVjdGlvbjpmbGV4RGlyfTtcbiAgICAgICAgQ29tcG9uZW50TWFuYWdlci5mbGlwSWNvbnModGhpcyxbXCJ0cmVlSWNvblN0YXRlXCJdKTtcbiAgICB9XG5cblxuICAgICBtZXJnZUludG8oaW50bywgb2JqKVxuICAgICB7XG4gICAgICAgIGZvciAobGV0IGF0dHIgaW4gb2JqKSB7XG4gICAgICAgICAgICBpbnRvW2F0dHJdID0gb2JqW2F0dHJdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnRvO1xuICAgIH07XG5cbiAgICBnZXRMZWFmU3R5bGUoc2VsZWN0ZWQsYWN0aXZlKVxuICAgIHtcbiAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5sZWFmU3R5bGUuc3RhdGU7XG4gICAgICAgIGlmKHNlbGVjdGVkKXtcbiAgICAgICAgICAgIHRoaXMubWVyZ2VJbnRvKHN0eWxlLHRoaXMuc2VsZWN0ZWRMZWFmU3R5bGUuc3RhdGUpO1xuICAgICAgICAgICAgaWYoYWN0aXZlKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lcmdlSW50byhzdHlsZSx0aGlzLmFjdGl2ZUxlYWZTdHlsZS5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH07XG5cblxuXG4gICBnZXRMaXN0U3R5bGUoKVxuICAge1xuICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLm5vZGVMaXN0U3R5bGUuc3RhdGU7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9O1xuXG4gICAgZ2V0U3R5bGVGb3JJY29uVHlwZSh0eXBlLGljb25OYW1lKVxuICAgIHtcbiAgICAgICAgdmFyIGljb25TdHlsZU9iaiA9ICh0eXBlID09IFwiYnJhbmNoXCIpID8gIHRoaXMubm9kZUljb25TdHlsZS5zdGF0ZSA6IHRoaXMubGVhZkljb25TdHlsZS5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gaWNvblN0eWxlT2JqO1xuICAgIH07XG5cblxuXG4gICAgLy90by1kbyBkbyB0aGlzIGZvciBlbnRpcmUgdHJlZSByYXRoZXIgb25seSBmb3IgdGhlIGZpcnN0IGNoaWxkXG4gICAgc2V0RGVmYXVsdE5vZGVTZWxlY3Rpb24obm9kZXNMYWJlbClcbiAgICB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFNlbGVjdGVkTm9kZXMuc3RhdGUgPSBub2Rlc0xhYmVsXG4gICAgfTtcblxuXG5cbiAgICBnZXRBY3RpdmVBbmNlc3Rvck5vZGUgKG5vZGVDb25maWcpXG4gICAge1xuICAgICAgICBpZihub2RlQ29uZmlnLmFjdGl2ZS5zdGF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGhtT3duZXIgPSBXZWF2ZS5nZXRPd25lcihub2RlQ29uZmlnKTtcbiAgICAgICAgbGV0ICBvd25lciA9IFdlYXZlLmdldE93bmVyKGxobU93bmVyKTsgLy8gbEhNIC0+IE5vZGVDb25maWdcbiAgICAgICAgaWYoIW93bmVyIHx8IChvd25lci5jb25zdHJ1Y3RvciAhPT0gbm9kZUNvbmZpZy5jb25zdHJ1Y3RvcikgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG93bmVyLmFjdGl2ZS5zdGF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG93bmVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmVBbmNlc3Rvck5vZGUob3duZXIpO1xuICAgICAgICB9XG5cblxuICAgIH07XG5cbiAgICBnZXRBY3RpdmVTaWJsaW5nTm9kZShub2RlQ29uZmlnKVxuICAgIHtcblxuICAgICAgICBsZXQgb3duZXIgPSBXZWF2ZS5nZXRPd25lcihub2RlQ29uZmlnKTtcbiAgICAgICAgaWYoIW93bmVyIHx8IChvd25lci5jb25zdHJ1Y3RvciAhPT0gbm9kZUNvbmZpZy5jb25zdHJ1Y3RvcikpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGlsZHJlbiA9IG93bmVyLmdldE9iamVjdHMoKTtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBjaGlsZHJlbi5sZW5ndGggOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKG5vZGVDb25maWcgIT09IGNoaWxkcmVuW2ldKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGNoaWxkcmVuW2ldLmFjdGl2ZS5zdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG5cblxuXG4gICAgY2hhbmdlQWN0aXZlTm9kZShub2RlQ29uZmlnLG5vZGVEYXRhLGV2ZW50VHlwZSApXG4gICAge1xuICAgICAgICBsZXQgbGhtT3duZXIgPSBXZWF2ZS5nZXRPd25lcihub2RlQ29uZmlnKTtcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBXZWF2ZS5nZXRPd25lcihsaG1Pd25lcik7IC8vIGxITSAtPiBOb2RlQ29uZmlnXG4gICAgICAgIGxldCBhY3RpdmVTaWJsaW5nTm9kZSA9IHRoaXMuZ2V0QWN0aXZlU2libGluZ05vZGUobm9kZUNvbmZpZyk7XG4gICAgICAgIGxldCBhY3RpdmVBbmNlc3Rvck5vZGUgPSB0aGlzLmdldEFjdGl2ZUFuY2VzdG9yTm9kZShub2RlQ29uZmlnKTtcblxuICAgICAgICBcbiAgICAgICAgLyoqKiBhY3RpdmUgTW9kZSAoQWN0aXZlIFN0YXRlIFVwZGF0ZSkgKioqKi9cbiAgICAgICAgaWYoYWN0aXZlQW5jZXN0b3JOb2RlKVxuICAgICAgICAgICAgYWN0aXZlQW5jZXN0b3JOb2RlLmFjdGl2ZS52YWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZihhY3RpdmVTaWJsaW5nTm9kZSlcbiAgICAgICAgICAgIGFjdGl2ZVNpYmxpbmdOb2RlLmFjdGl2ZS52YWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIG5vZGVDb25maWcuYWN0aXZlLnZhbHVlID0gdHJ1ZTtcblxuICAgICAgICAvKioqIHNlbGVjdGlvbiBNb2RlIChTZWxlY3Qgc3RhdGUgVXBkYXRlKSAqKioqL1xuICAgICAgICBpZih0aGlzLnNlbGVjdGlvblR5cGUudmFsdWUgJiYgKCFldmVudFR5cGUgfHwgZXZlbnRUeXBlID09XCJzZWxlY3RcIikpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0aW9uVHlwZS52YWx1ZSA9PSBcInJhZGlvXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoYWN0aXZlU2libGluZ05vZGUpXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNpYmxpbmdOb2RlLnNlbGVjdC52YWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYocGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLnNlbGVjdGVkQ2hpbGQgJiYgKHBhcmVudE5vZGUuc2VsZWN0ZWRDaGlsZCAhPT0gbm9kZUNvbmZpZykgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zZWxlY3RlZENoaWxkLnNlbGVjdC52YWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5vZGVDb25maWcuc2VsZWN0LnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5zZWxlY3Rpb25UeXBlLnZhbHVlID09IFwiY2hlY2tcIikgLy8gdG9nZ2xlIHNlbGVjdGlvblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5vZGVDb25maWcuc2VsZWN0LnZhbHVlID0gIW5vZGVDb25maWcuc2VsZWN0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKG5vZGVDb25maWcuc2VsZWN0LnZhbHVlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zZWxlY3RlZE5vZGVzLnB1c2gobm9kZURhdGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlSW5kZXggPSBwYXJlbnROb2RlLnNlbGVjdGVkTm9kZXMuaW5kZXhPZihub2RlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5vZGVJbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuc2VsZWN0ZWROb2Rlcy5zcGxpY2Uobm9kZUluZGV4LDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgcGFyZW50Tm9kZS5zZWxlY3RlZENoaWxkID0gbm9kZUNvbmZpZztcbiAgICAgICAgfVxuXG5cbiAgICAgICBpZighZXZlbnRUeXBlIHx8IGV2ZW50VHlwZSA9PSBcIm9wZW5cIilcbiAgICAgICB7XG4gICAgICAgICAgIC8qKiogT3BlbiBNb2RlIChPcGVuIFN0YXRlIFVkcGF0ZSkgKioqKi9cbiAgICAgICAgICAgaWYodGhpcy5lbmFibGVBY2NvcmRpb25Nb2RlLnN0YXRlICkgLy8gYWNjb3JkaW9uIE1vZGVcbiAgICAgICAgICAge1xuICAgICAgICAgICAgICAgaWYoYWN0aXZlU2libGluZ05vZGUpXG4gICAgICAgICAgICAgICAgICAgYWN0aXZlU2libGluZ05vZGUub3Blbi52YWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICBpZihwYXJlbnROb2RlICYmIHBhcmVudE5vZGUub3BlbmVkQ2hpbGQgJiYgKHBhcmVudE5vZGUub3BlbmVkQ2hpbGQgIT09IG5vZGVDb25maWcpIClcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLm9wZW5lZENoaWxkLm9wZW4udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICB9XG4gICAgICAgICAgIG5vZGVDb25maWcub3Blbi5zdGF0ZSA9ICFub2RlQ29uZmlnLm9wZW4uc3RhdGU7IC8vIHRvZ2dsZSBvcGVuIHN0YXRlXG5cblx0ICAgICAgIHBhcmVudE5vZGUub3BlbmVkQ2hpbGQgPSBub2RlQ29uZmlnO1xuICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuXG5cblxuXG5cbiAgICB9O1xuXG4gICAgZ2V0RmlsZUljb24oZGF0YSxpc09wZW4pXG4gICAge1xuICAgICAgICBpZihkYXRhKXtcbiAgICAgICAgICAgIGlmKHRoaXMuZW5hYmxlRGF0YVR5cGVJY29uLnZhbHVlKXtcbiAgICAgICAgICAgICAgICB2YXIgZGF0VHlwZSA9IHRoaXMuZ2V0RGF0YVR5cGUgPyB0aGlzLmdldERhdGFUeXBlKGRhdGEpIDogZGF0YS5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFUeXBlc01hcCAmJiB0aGlzLmRhdGFUeXBlc01hcFtkYXRUeXBlXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVR5cGVzTWFwW2RhdFR5cGVdO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzT3BlbiA/IHRoaXMudHJlZUljb25TdGF0ZS5zdGF0ZS5sZWFmT3BlbiAgOiB0aGlzLnRyZWVJY29uU3RhdGUuc3RhdGUubGVhZkRlZmF1bHQgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxuXG5cbiAgICBnZXRGb2xkZXJJY29uKCBpc09wZW4pXG4gICAge1xuICAgICAgICByZXR1cm4gaXNPcGVuID8gdGhpcy50cmVlSWNvblN0YXRlLnN0YXRlLm5vZGVPcGVuIDogdGhpcy50cmVlSWNvblN0YXRlLnN0YXRlLm5vZGVEZWZhdWx0O1xuICAgIH07XG5cbiAgICBnZXRTZWxlY3RJY29uKCBpc1NlbGVjdGVkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzU2VsZWN0ZWQgPyB0aGlzLnRyZWVJY29uU3RhdGUuc3RhdGVbXCJzZWxlY3RcIl0gOiB0aGlzLnRyZWVJY29uU3RhdGUuc3RhdGVbXCJ1blNlbGVjdFwiXTtcbiAgICB9O1xufVxuXG5cblxuICAgIC8vVGhpcyBGdW5jdGlvbiBtYWtlcyB0aGlzIGNsYXNzIGFzIFNlc3Npb25DbGFzc1xuICAgIFdlYXZlLnJlZ2lzdGVyQ2xhc3MoIFRyZWVDb25maWcsWyd3ZWF2ZXJlYWN0LlRyZWVDb25maWcnXSxbd2VhdmVqcy5hcGkuY29yZS5JTGlua2FibGVPYmplY3RdLFwiVHJlZSBDb25maWdcIik7XG5cbiJdfQ==