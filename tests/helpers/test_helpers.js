/*!
* jQuery UI
*
* Copyright 2011, https://github.com/jquery/jquery-ui/blob/master/AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI
*/

function accordion_state( accordion ) {
	var expected = $.makeArray( arguments ).slice( 1 );
	var actual = accordion.find( ".ui-accordion-content" ).map(function() {
		return $( this ).css( "display" ) === "none" ? 0 : 1;
	}).get();
	deepEqual( actual, expected );
}

function setupTeardown() {
    var animated = $.dattaya.maccordion.prototype.options.animated;
    return {
        setup:function () {
            $.dattaya.maccordion.prototype.options.animated = false;
        },
        teardown:function () {
            $.dattaya.maccordion.prototype.options.animated = animated;
        }
    };
}



