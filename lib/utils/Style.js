'use strict';

var _appendVendorPrefix = require('./appendVendorPrefix');

var _appendVendorPrefix2 = _interopRequireDefault(_appendVendorPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (module) {

    function Style() {}

    function merge(into, obj) {
        for (var attr in obj) {
            into[attr] = obj[attr];
        }

        return into;
    }

    Style.mergeStyleObjects = function (into, obj, appendVendorPrefix) {
        var styleObject = merge(into, obj);
        if (appendVendorPrefix) return Style.appendVendorPrefix(styleObject);else return styleObject;
    };

    /*convenience function to get a particular sessioned property of a sessioned object*/
    Style.getStyleStateFor = function (sessionObj, properties, appendVendorPrefix) {
        var state = {};
        if (properties.constructor === Array) {
            properties.map(function (propertyName) {
                if (sessionObj[propertyName].state) {
                    if (sessionObj[propertyName].constructor === weavejs.core.LinkableVariable) {
                        state = Style.mergeStyleObjects(state, sessionObj[propertyName].state);
                    } else state[propertyName] = sessionObj[propertyName].state;
                }
            });
        } else if (properties instanceof String) {
            state[properties] = sessionObj[properties].state;
        }
        if (appendVendorPrefix) return Style.appendVendorPrefix(state);
        return state;
    };

    Style.getStyle = function (style) {
        return (0, _appendVendorPrefix2.default)(style);
    };

    Style.appendVendorPrefix = function (style) {
        return (0, _appendVendorPrefix2.default)(style);
    };

    // due to bootstrap Navbar zindex (1029) value we have to give 1030 for overlay
    Style.overlayContainer = function (isOpen) {
        return (0, _appendVendorPrefix2.default)({
            position: 'fixed',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
            transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
            zIndex: 1030
        });
    };

    Style.modal = function (isOpen) {
        return (0, _appendVendorPrefix2.default)({
            position: 'fixed',
            zIndex: 1050,
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
            transition: 'all 0.5s'

        });
    };

    module.exports = Style;
})(module);
//# sourceMappingURL=data:application/json;base64,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QTVFQzs7QUE4RmYsV0FBTyxPQUFQLEdBQWlCLEtBQWpCLENBOUZlO0NBQWxCLEVBZ0dDLE1BaEdELENBQUQiLCJmaWxlIjoiU3R5bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBwZW5kVmVuZG9yUHJlZml4IGZyb20gJy4vYXBwZW5kVmVuZG9yUHJlZml4JztcblxuXG5cbihmdW5jdGlvbiAobW9kdWxlKSB7XG5cblxuICAgIGZ1bmN0aW9uIFN0eWxlKCkge1xuXG4gICAgfVxuXG5cblxuICAgIGZ1bmN0aW9uIG1lcmdlKGludG8sIG9iaikge1xuICAgICAgICBmb3IgKGxldCBhdHRyIGluIG9iaikge1xuICAgICAgICAgICAgaW50b1thdHRyXSA9IG9ialthdHRyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnRvO1xuICAgIH1cblxuICAgIFN0eWxlLm1lcmdlU3R5bGVPYmplY3RzID0gZnVuY3Rpb24gKGludG8sIG9iaiwgYXBwZW5kVmVuZG9yUHJlZml4KSB7XG4gICAgICAgIHZhciBzdHlsZU9iamVjdCA9IG1lcmdlKGludG8sIG9iaik7XG4gICAgICAgIGlmIChhcHBlbmRWZW5kb3JQcmVmaXgpXG4gICAgICAgICAgICByZXR1cm4gU3R5bGUuYXBwZW5kVmVuZG9yUHJlZml4KHN0eWxlT2JqZWN0KVxuICAgICAgICBlbHNlIHJldHVybiBzdHlsZU9iamVjdDtcbiAgICB9XG5cblxuICAgIC8qY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gZ2V0IGEgcGFydGljdWxhciBzZXNzaW9uZWQgcHJvcGVydHkgb2YgYSBzZXNzaW9uZWQgb2JqZWN0Ki9cbiAgICBTdHlsZS5nZXRTdHlsZVN0YXRlRm9yID0gZnVuY3Rpb24gKHNlc3Npb25PYmosIHByb3BlcnRpZXMsIGFwcGVuZFZlbmRvclByZWZpeCkge1xuICAgICAgICB2YXIgc3RhdGUgPSB7fTtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLm1hcChmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYoc2Vzc2lvbk9ialtwcm9wZXJ0eU5hbWVdLnN0YXRlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2Vzc2lvbk9ialtwcm9wZXJ0eU5hbWVdLmNvbnN0cnVjdG9yID09PSB3ZWF2ZWpzLmNvcmUuTGlua2FibGVWYXJpYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IFN0eWxlLm1lcmdlU3R5bGVPYmplY3RzKHN0YXRlLHNlc3Npb25PYmpbcHJvcGVydHlOYW1lXS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZVtwcm9wZXJ0eU5hbWVdID0gc2Vzc2lvbk9ialtwcm9wZXJ0eU5hbWVdLnN0YXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnRpZXMgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgIHN0YXRlW3Byb3BlcnRpZXNdID0gc2Vzc2lvbk9ialtwcm9wZXJ0aWVzXS5zdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihhcHBlbmRWZW5kb3JQcmVmaXgpXG4gICAgICAgICAgICByZXR1cm4gU3R5bGUuYXBwZW5kVmVuZG9yUHJlZml4KHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG5cblxuICAgIFN0eWxlLmdldFN0eWxlID0gZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRWZW5kb3JQcmVmaXgoc3R5bGUpO1xuICAgIH1cblxuICAgIFN0eWxlLmFwcGVuZFZlbmRvclByZWZpeCA9IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgICByZXR1cm4gYXBwZW5kVmVuZG9yUHJlZml4KHN0eWxlKTtcbiAgICB9XG5cblxuXG5cblxuXG5cbiAgICAvLyBkdWUgdG8gYm9vdHN0cmFwIE5hdmJhciB6aW5kZXggKDEwMjkpIHZhbHVlIHdlIGhhdmUgdG8gZ2l2ZSAxMDMwIGZvciBvdmVybGF5XG4gICAgU3R5bGUub3ZlcmxheUNvbnRhaW5lciA9IGZ1bmN0aW9uIChpc09wZW4pIHtcbiAgICAgICAgcmV0dXJuIGFwcGVuZFZlbmRvclByZWZpeCh7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjEpJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IGlzT3BlbiA/IDEgOiAwLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBpc09wZW4gPyAndHJhbnNsYXRlM2QoMCwgMCwgMCknIDogJ3RyYW5zbGF0ZTNkKC0xMDAlLCAwLCAwKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBpc09wZW4gPyAnb3BhY2l0eSAwLjVzJyA6ICdvcGFjaXR5IDAuNXMsIHRyYW5zZm9ybSAwLjFzIDAuNXMnLFxuICAgICAgICAgICAgekluZGV4OiAxMDMwXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIFN0eWxlLm1vZGFsID0gZnVuY3Rpb24gKGlzT3Blbikge1xuICAgICAgICByZXR1cm4gYXBwZW5kVmVuZG9yUHJlZml4KHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgekluZGV4OiAxMDUwLFxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogaXNPcGVuID8gJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJyA6ICd0cmFuc2xhdGUzZCgwLCAtMTAwJSwgMCknLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCAwLjVzJyxcblxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gU3R5bGU7XG5cbn0obW9kdWxlKSk7XG4iXX0=