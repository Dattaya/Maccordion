(function( $ ) {

    module( "maccordion: options", setupTeardown( function() {
        this.$div.maccordion( { active: false } );
        this.$headers = this.$div.find( ".dattaya-maccordion-header" );
    } ) );

    test( "active: general", function() {
        // opened tabs
        this.$div.maccordion( { active: true } );

        // headers
        ok( this.$headers.are( ".ui-state-active.ui-corner-top.dattaya-maccordion-header-active" ) );

        ok( this.$headers.are( ":not(.ui-corner-all)" ) );

        ok( this.$headers.are( "[aria-selected=true][aria-expanded=true]" ) );

        // content panes
        ok( this.$headers.next().are( ".dattaya-maccordion-content-active" ) );

        ok( this.$headers.next().are( ":visible" ) );

        // closed tabs
        this.$div.maccordion( { active: false } );

        // headers
        ok( this.$headers.are( ":not(.ui-state-active.ui-corner-top.dattaya-maccordion-header-active)" ) );

        ok( this.$headers.are( ".ui-corner-all" ) );

        ok( this.$headers.are( "[aria-selected=false][aria-expanded=false]" ) );

        // content panes
        ok( this.$headers.next().are( ":not(.dattaya-maccordion-content-active)" ) );

        ok( this.$headers.next().are( ":hidden" ) );

        //TODO Test animated
    } );

    test( "active: #false", function() {
        this.$div.maccordion( { active: 2 } );
        this.$div.maccordion( { active: false } );

        maccordion_state_helper( this.$div, 0, 0, 0, "all content panels should be hidden" );

        strictEqual( this.$div.maccordion( "option", "active" ), false );

    } );

    test( "active: #true", function() {
        this.$div.maccordion( { active: 1 } );
        this.$div.maccordion( { active: true } );

        maccordion_state_helper( this.$div, 1, 1, 1, "all content panels should be opened" );

        strictEqual( this.$div.maccordion( "option", "active" ), true );

    } );

    test( "active: #number", function() {
        this.$div.maccordion( { active: 2 } );

        maccordion_state_helper( this.$div, 0, 0, 1, "third content panel should be opened" );

        this.$div.maccordion( { active: 2 } );

        maccordion_state_helper( this.$div, 0, 0, 0 );

        strictEqual( this.$div.maccordion( "option", "active" ), 2 );

    } );

    test( "active: #toggle", function() {
        this.$div.maccordion( { active: [ 1 ] } );
        this.$div.maccordion( { active: "toggle" } );

        maccordion_state_helper( this.$div, 1, 0, 1, "second tab was opened; after { active: toggle } first and third should be opened" );

        strictEqual( this.$div.maccordion( "option", "active" ), "toggle" );

    } );

    test( "active: #array", function() {
        this.$div.maccordion( { active: [ 0, 2 ] } );

        maccordion_state_helper( this.$div, 1, 0, 1, "first and third content panels should be opened" );

        this.$div.maccordion( { active: [ 0, 2 ] } );

        maccordion_state_helper( this.$div, 0, 0, 0 );

        deepEqual( this.$div.maccordion( "option", "active" ), [ 0, 2 ] );

    } );

    test( "active: #wrapped set", function() {
        this.$div.maccordion( { active: this.$headers } );

        maccordion_state_helper( this.$div, 1, 1, 1 );

        this.$div.maccordion( { active: this.$headers } );

        maccordion_state_helper( this.$div, 0, 0, 0 );

        deepEqual( this.$div.maccordion( "option", "active" ).get(), this.$headers.get() );

    } );

    test( "event: multiple", function() {
        this.$div.maccordion( { event: "click mouseenter custom" } );
        this.$headers.click().mouseenter().trigger( "custom" );

        maccordion_state_helper( this.$div, 1, 1, 1 );

        this.$div.maccordion( { event: "click" } );
        this.$headers.click().mouseenter();

        maccordion_state_helper( this.$div, 0, 0, 0 );

        this.$div.maccordion( { event: false } );
        this.$headers.click();

        maccordion_state_helper( this.$div, 0, 0, 0 );

    } );

    test( "disabled: classes", function() {
        this.$div.maccordion( { disabled: true } );

        strictEqual( this.$div.maccordion( "option", "disabled" ), true );

        ok( this.$headers.add( this.$headers.next() ).are( ".dattaya-maccordion-disabled.ui-state-disabled" ) );

        this.$div.maccordion( { disabled: false } );

        ok( this.$headers.add( this.$headers.next() ).are( ":not(.dattaya-maccordion-disabled.ui-state-disabled)" ) );

    } );

    test( "disabled: action", function() {
        this.$div.maccordion( { disabled: true } );
        this.$headers.click();

        maccordion_state_helper( this.$div, 0, 0, 0 );

        this.$headers.eq(0).trigger( $.Event( "keydown", { keyCode: $.ui.keyCode.ENTER } ) );

        maccordion_state_helper( this.$div, 0, 0, 0 );

        this.$div.maccordion( { active: 0 } );

        maccordion_state_helper( this.$div, 0, 0, 0 );

    } );

    test( "icons", function() {
        this.$div.maccordion( { icons: { activeHeader: "ui-icon-carat-1-s", header: "ui-icon-carat-1-e" } } );

        equal( this.$headers.children( ".ui-icon-triangle-1-s, .ui-icon-triangle-1-e" ).size(), 0 );

        equal( this.$headers.children( ".ui-icon-carat-1-s, .ui-icon-carat-1-e" ).size(), 3 );

        this.$div.maccordion( { icons: false } );

        equal( this.$headers.children( ".ui-icon-carat-1-s, .ui-icon-carat-1-e" ).size(), 0 );

    } );

    test( "options", function() {
        this.$div.maccordion( { options: false } );

        deepEqual( this.$div.maccordion( "option", "options" ), { easing: "swing" } );

        this.$div.maccordion( "destroy" );
        this.$div.maccordion( { options: { test: "test" } } );

        deepEqual( this.$div.maccordion( "option", "options" ), { test: "test", easing: "swing" } );

    } );

    test( "effect", function() {
        this.$div.maccordion( { effect: "blind", speed: "fast" } );
        this.$div.maccordion( { active: [ 0, 1 ] } );

        ok( this.$headers.filter( ":lt(2)" ).next().are( ":animated" ) );

    } );

})( jQuery );