(function( $ ) {
    module( "maccordion: methods" );

    test( "destroy", function() {
        $.dattaya.maccordion.prototype.options.animated = false;

        domEqual( "#div", function() {
            var $div = $( "#div" ).maccordion();
            var $header = $div.find( ".dattaya-maccordion-header" ).eq( 1 );
            $header.click().mouseenter().keydown( $.Event( "keydown", { keyCode: $.ui.keyCode.DOWN } ) );

            $div.maccordion( "destroy" );
        } );

        $.dattaya.maccordion.prototype.options.animated = false;
    } );

    test( "refresh", function() {
    } )

})( jQuery );
