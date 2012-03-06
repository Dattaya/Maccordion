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

    module( "maccordion: methods", setupTeardown( function() {
        this.$div.maccordion( { active: false } );
        var $newTab = $( "<h3><a href=\"#\">Header</a></h3><div><p>Content</p></div>" ).appendTo( this.$div );
        this.$div.maccordion( "refresh" );
        this.$header = $newTab.eq( 0 );
    } ) );

    test( "refresh: initial state", function() {

        // headers
        equal( this.$div.find( ".dattaya-maccordion-header.ui-helper-reset.ui-state-default.ui-corner-all" ).size(), 4 );

        ok( this.$header.is( "[role=tab][tabindex=-1][aria-selected=false][aria-expanded=false]" ) );

        // content panes
        equal( this.$div.find( ".dattaya-maccordion-content.ui-helper-reset.ui-widget-content.ui-corner-bottom" ).size(),
            4 );

        ok( this.$header.next().is( "[role=tabpanel]" ) );


        deepEqual( this.$div.find( ".dattaya-maccordion-header" ).next().get(),
            this.$div.find( ".dattaya-maccordion-content" ).get(),
            "content panels come immidiately after headers"
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

})( jQuery );
