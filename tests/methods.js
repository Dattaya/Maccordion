(function( $ ) {
    module( "maccordion: methods" );

    test( "destroy", function() {

        domEqual( "#div", function() {
            var $div = $( "#div" ).maccordion();
            var $header = $div.find( ".dattaya-maccordion-header" ).eq( 1 );
            $header.click().mouseenter().keydown( $.Event( "keydown", { keyCode: $.ui.keyCode.DOWN } ) );

            $div.maccordion( "destroy" );
        } );

    } );

    module( "maccordion: methods", setupTeardown( function() {
        this.$div.maccordion( { active: false } );
        var $newTab = $( "<h3><a href=\"#\">Header</a></h3><div><p>Content</p></div>" ).appendTo( this.$div );
        this.$div.maccordion( "refresh" );
        this.$header = $newTab.eq( 0 );
        this.$prevHeader = this.$div.find( ".dattaya-maccordion-header" ).eq( -2 );
    } ) );

    test( "refresh: initial state", function() {

        domElEqual( this.$header, this.$prevHeader,
            "new header should have the same attributes and childs as previous one",
            [ "aria-selected", "aria-expanded", "role" ]
        );

        domElEqual( this.$header.next(), this.$prevHeader.next(),
            "new header should have the same attributes and childs as previous one",
            [ "role" ]
        );

    } );

    test( "refresh: click", function() {
        this.$header.click();

        maccordion_state_helper( this.$div, 0, 0, 0, 1 );

    } );

    test( "refresh: keydown", function() {
        this.$header.trigger( $.Event( "keydown", { keyCode: $.ui.keyCode.ENTER } ) );

        maccordion_state_helper( this.$div, 0, 0, 0, 1, "keydown event is binded" );

    } );

    test( "refresh: other events", function() {
        this.$header.mouseenter().focus();

        ok( this.$header.is( ".ui-state-hover.ui-state-focus" ) );

        this.$header.mouseleave().blur();

        ok( this.$header.is( ":not(.ui-state-hover.ui-state-focus)" ) );

    } );

    module( "maccordion: methods", setupTeardown( function() {
            this.$headers = this.$div.find( ".dattaya-maccordion-header" );
        }
    ) );

    test( "refresh: heightStyle: auto", function() {
        var $content = this.$headers.eq( 0 ).next();
        var height = $content.height();
        $content.append( "<br><br><br>" );
        this.$div.maccordion( "refresh" );

        ok( $content.height() > height + 5 );

    } );

})( jQuery );
