(function( $ ) {
    module( "maccordion: initial state", setupTeardown( function() {
        this.$headers = this.$div.find( ".dattaya-maccordion-header" );
    } ) );

    $.each( { div: "#div" }, function( type, selector ) {
        test( "markup structure: " + type, function() {

            // main element
            ok( this.$div.is( ".dattaya-maccordion.ui-widget.ui-helper-reset" ) );

            // headers
            equal( this.$div.find( ".dattaya-maccordion-header.ui-helper-reset.ui-state-default" ).size(), 3 );

            ok( this.$headers.eq( 0 ).is( ".dattaya-maccordion-header-active.ui-corner-top.ui-state-active" ) );

            ok( this.$div.filter( ":gt(0)" ).are( ".ui-corner-all" ) );

            // content panes
            equal( this.$div.find( ".dattaya-maccordion-content.ui-helper-reset.ui-widget-content.ui-corner-bottom" ).size(), 3 );

            ok( this.$headers.eq( 0 ).next().is( ".dattaya-maccordion-content-active" ) );

            deepEqual( this.$div.find( ".dattaya-maccordion-header" ).next().get(),
                this.$div.find( ".dattaya-maccordion-content" ).get(),
                "content panels come immidiately after headers"
            );

        } );
    } );

    test( "icons", function() {
        var $icons = this.$headers.children( "span:first-child" );

        equal( $icons.size(), 3 );

        ok( $icons.are( ".dattaya-maccordion-header-icon.ui-icon" ) );

        equal( $icons.filter( ".ui-icon-triangle-1-e:not(.ui-icon-triangle-1-s)" ).size(), 2 );

        $icons.eq(0).is( ".ui-icon-triangle-1-s:not(.ui-icon-triangle-1-e)" );

        ok( this.$div.is( ".dattaya-maccordion-icons" ) );

    } );

    test( "accessibility", function() {

        // main element
        ok( this.$div.is( "[aria-multiselectable=true][role=tablist]" ) );

        // headers
        ok( this.$headers.are( "[role=tab]" ), "all headers have role=tab" );

        ok( this.$headers.eq( 0 ).is( "[tabindex=0]" ) );

        ok( this.$headers.filter( ":gt(0)" ).are( "[tabindex=-1]" ) );

        ok( this.$headers.next().are( "[role=tabpanel]" ), "all content panes have role=tabpanel" );

    } );

})( jQuery );