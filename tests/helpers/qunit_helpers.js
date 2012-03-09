/*!
 * jQuery UI
 *
 * Copyright 2011, https://github.com/jquery/jquery-ui/blob/master/AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */

(function( $ ) {
    /*
     * Experimental assertion for comparing DOM objects.
     *
     * Serializes an element and some attributes and it's children if any, otherwise the text.
     * Then compares the result using deepEqual.
     */
    window.domEqual = function( selector, modifier, message ) {
        var attributes = ["class", "role", "id", "tabIndex", "aria-activedescendant"];

        function extract( value ) {
            if ( !value || !value.length ) {
                QUnit.push( false, actual, expected, "domEqual failed, can't extract " + selector + ", message was: " + message );
                return;
            }
            var result = {};
            result._nodeName = value[0].nodeName;

            result.attributes = {};
            $.each( attributes, function( index, attr ) {
                result.attributes[attr] = value.prop( attr );
            } );
            result.children = [];
            var children = value.children();
            if ( children.length ) {
                children.each( function() {
                    result.children.push( extract( $( this ) ) );
                } );
            } else {
                result.text = value.text();
            }
            return result;
        }

        var expected = extract( $( selector ) );
        modifier( $( selector ) );

        var actual = extract( $( selector ) );
        QUnit.push( QUnit.equiv( actual, expected ), actual, expected, message );
    };

    window.domElEqual = function( actual, expected, message, attributes ) {

        attributes = $.merge( [ "id", "class", "tabIndex" ], attributes || [] );

        function extract( $el ) {

            if ( !$el.length ) {
                QUnit.push( false, actual, expected, "domElEqual failed, wrong arguments, message was: " + message );
                return;
            }

            var result = {};

            // Name of the element. "_" - to show name of the node as a first property - easier to read
            result._nodeName = $el.get( 0 ).nodeName;

            // All attributes
            result.attributes = {};
            $.each( attributes, function( index, attr ) {
                result.attributes[attr] = $el.prop( attr );
            } );

            // All children except text nodes
            result.children = [];
            var $childs = $el.children();
            if ( $childs.length ) {
                $childs.each( function() {
                    result.children.push( extract( $( this ) ) );
                } );
            }

            return result;
        }

        expected = extract( $( expected ) );

        actual = extract( $( actual ) );

        QUnit.push( QUnit.equiv( actual, expected ), actual, expected, message );

    }

})( jQuery );
