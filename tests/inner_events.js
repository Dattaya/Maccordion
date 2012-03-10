(function( $ ) {
    module( "maccordion: inner events", setupTeardown() );

    test( "keydown: ENTER", function() {

        var $header = this.$div.maccordion()
            .find( ".dattaya-maccordion-header-active" )
            .trigger( $.Event( "keydown", { keyCode: $.ui.keyCode.ENTER } ) );

        ok( $header.next().is( ":hidden" ), "keydown: ENTER on opened tab makes content hidden" );

    } );

    test( "keydown: UP and DOWN", function() {

        var $header = $( "#div" ).maccordion()
            .find( ".dattaya-maccordion-header:first" )
            .trigger( $.Event( "keydown", { keyCode: $.ui.keyCode.DOWN } ) );

        ok( $header.is( "[tabindex=-1]" ),
            "keydown: DOWN sets tabindex to -1 for the current tab" );

        var $nextHeader = $header.nextAll( ".dattaya-maccordion-header:first" );

        ok( $nextHeader.is( "[tabindex=0].ui-state-focus" ),
            "keydown: DOWN sets tabindex to 0 and adds class ui-state-focus for the next header" );

        var e = $.Event( "keydown", { keyCode: $.ui.keyCode.UP } );

        $nextHeader.trigger( e ).blur();

        ok( $nextHeader.is( "[tabindex=-1]:not(.ui-state-focus)" ),
            "keydown: UP sets tabindex to -1 for the current tab and removes ui-state-focus class" );

        ok( $nextHeader.prevAll( ".dattaya-maccordion-header:first" ).is( "[tabindex=0].ui-state-focus" ),
            "keydown: UP sets tabindex to 0 and adds class ui-state-focus for the previous header" );

    } );

    test( "mouseenter, mouseleave", function() {
        var $header = $( "#div" ).maccordion()
            .find( ".dattaya-maccordion-header:first" )
            .mouseenter();

        ok( $header.is( ".ui-state-hover" ), "mouseenter adds class ui-state-hover" );

        $header.mouseleave();

        ok( $header.is( ":not(.ui-state-hover)", "mouseleave removes class ui-state-hover" ) );

    } );

})( jQuery );