(function( $ ) {
    module( "maccordion: initial state", setupTeardown() );

    $.each( { div: "#div" }, function( type, selector ) {
        test( "markup structure: " + type, function() {
            var $el = $( selector ).maccordion();

            ok( $el.is( ".dattaya-maccordion.ui-widget.ui-helper-reset" ),
                "main element has classes: dattaya-maccordion ui-widget ui-helper-reset" );

            equal( $el.find( ".dattaya-maccordion-header.ui-helper-reset.ui-state-default" ).length,
                3,
                "header elements have classes: dattaya-accordion-header, ui-helper-reset; correct number"
            );

            equal( $el.find( ".dattaya-maccordion-header-active.ui-state-active.ui-corner-top" ).length,
                1, "one active tab" );

            equal( $el.find( ".dattaya-maccordion-content-active" ).length,
                1, "one expanded content pane" );

            equal( $el.find( ".dattaya-maccordion-content.ui-helper-reset.ui-widget-content.ui-corner-bottom" ).length,
                3,
                "content elements have classes: dattaya-maccordion-content ui-helper-reset ui-widget-content ui-corner-bottom; correct number"
            );

            deepEqual( $el.find( ".dattaya-maccordion-header" ).next().get(),
                $el.find( ".dattaya-maccordion-content" ).get(),
                "content panels come immidiately after headers"
            );
        } );
    } );


    test( "accessibility", function() {
        var $el = $( "#div" ).maccordion();

        ok( $el.is( "[aria-multiselectable='true'][role='tablist']" ),
            "main element has attributes: aria-multiselectable, role" );

        var $headers = $el.find( ".dattaya-maccordion-header" );

        ok( $headers.is( "[role=tab]" ), "all headers have role=tab" );

        ok( $headers.eq( 0 ).is( "[aria-selected='true'][aria-expanded='true'][tabindex=0]" ),
            "first tab is active and has tabindex=0, aria-selected=true, aria-expanded=true" );

        ok( $headers.filter( ":gt(0)" ).is( "[aria-selected='false'][aria-expanded='false'][tabindex=-1]" ),
            "inactive headers have tabindex=-1, aria-selected=false, aria-expanded=false" );
    } );

})( jQuery );