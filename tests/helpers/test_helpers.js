function maccordion_state_helper( $el ) {
    var expected = $.makeArray( arguments ).slice( 1 );
    var message = typeof expected[expected.length - 1] === "string" ? expected.pop() : "";
    var actual = $el.find( ".dattaya-maccordion-content" ).map(
        function() {
            return $( this ).css( "display" ) === "none" ? 0 : 1;
        } ).get();
    deepEqual( actual, expected, message );
}

function setupTeardown( setup, teardown ) {
    var animated = $.dattaya.maccordion.prototype.options.animated;
    return {
        setup   : function() {
            $.dattaya.maccordion.prototype.options.animated = false;
            this.$div = $( "#div" ).maccordion();
            setup ? ( $.proxy( setup, this ) )() : '';

        },
        teardown: function() {
            $.dattaya.maccordion.prototype.options.animated = animated;
            teardown ? ( $.proxy( teardown, this ) )() : '';
        }
    };
}

jQuery.fn.are = function(selector) {
    return !!selector && this.filter(selector).length === this.length;
};



