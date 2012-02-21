/*!
* jQuery UI
*
* Copyright 2011, https://github.com/jquery/jquery-ui/blob/master/AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI
*/

(function($) {
    /*
     * Experimental assertion for comparing DOM objects.
     *
     * Serializes an element and some attributes and it's children if any, otherwise the text.
     * Then compares the result using deepEqual.
     */
    window.domEqual = function( selector, modifier, message ) {
        var attributes = ["class", "role", "id", "tabIndex", "aria-activedescendant"];

        function extract(value) {
            if (!value || !value.length) {
                QUnit.push( false, actual, expected, "domEqual failed, can't extract " + selector + ", message was: " + message );
                return;
            }
            var result = {};
            result.nodeName = value[0].nodeName;
            $.each(attributes, function(index, attr) {
                result[attr] = value.prop(attr);
            });
            result.children = [];
            var children = value.children();
            if (children.length) {
                children.each(function() {
                    result.children.push(extract($(this)));
                });
            } else {
                result.text = value.text();
            }
            return result;
        }
        var expected = extract($(selector));
        modifier($(selector));

        var actual = extract($(selector));
        QUnit.push( QUnit.equiv(actual, expected), actual, expected, message );
    }

})(jQuery);
