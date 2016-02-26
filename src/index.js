import Tree from "./components/tree/Tree";
import TreeConfig from "./components/tree/TreeConfig";
import Node from "./components/tree/Node";
import NodeConfig from "./components/tree/NodeConfig";

import Modal from "./components/modal/Modal";
import ModalConfig from "./components/modal/ModalConfig";

import SplitPane from "./components/splitPane/SplitPane";
import SplitPaneConfig from "./components/splitPane/SplitPaneConfig";

import Navbar from "./components/navbar/Navbar";
import navbarConfig from "./components/navbar/Config";

import InlineStyle from "./configs/InlineStyle";
import CSS from "./configs/CSS";


import App from "./utils/App";
import PropsManager from "./components/PropsManager";


exports.Tree = Tree;
exports.TreeConfig = TreeConfig;

exports.Modal = Modal;
exports.ModalConfig = ModalConfig;

exports.SplitPane = SplitPane;
exports.SplitPaneConfig = SplitPaneConfig;

exports.Navbar = Navbar;
exports.navbarConfig = navbarConfig;

exports.InlineStyle = InlineStyle;
exports.CSS = CSS;

exports.PropsManager = PropsManager;


exports.registerToolImplementation = function (asClassName, jsClass) {
    App.registerToolImplementation(asClassName, jsClass);
}

exports.getToolImplementation = function (name) {
    if (App.getToolImplementation(name)) {
        return App.getToolImplementation(name);
    }
}


exports.registerToolConfig = function (toolClass, configClass) {
    App.registerToolConfig(toolClass, configClass);
}

exports.getToolConfig = function (toolClass) {
    App.getToolConfig(toolClass);
}

exports.hookSessionStateForComponentChildren = function (ReactChildren,ownerConfig)  {
    App.hookSessionStateForComponentChildren(ReactChildren,ownerConfig);
}

exports.renderChildren = function (reactComp,propsManager)  {
    App.renderChildren(reactComp,propsManager);
}
