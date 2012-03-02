(function( $ ) {
    module( "maccordion: inner methods", setupTeardown( function() {
        this.$div.maccordion( { active: false } );
        this.$headers = this.$div.find( ".dattaya-maccordion-header" );
        this.transform = $.proxy( this.$div.data( "maccordion" ), "_transformActiveToElement" );
    } ) );

    test( "_transformActiveToElement: Number", function() {

        equal( this.transform( 0 ).get( 0 ), this.$headers.eq( 0 ).get( 0 ) );

    } );

    test( "_transformActiveToElement: Array", function() {

        deepEqual( this.transform( [ 0, 1 ] ).get(),
            this.$div.find( ".dattaya-maccordion-header:lt(2)" ).get() );

    } );

    test( "_transformActiveToElement: true", function() {
        this.$div.maccordion( { active: [ 0, 1 ] } );

        deepEqual( this.transform( true ).get(),
            this.$headers.not( ".dattaya-maccordion-header-active" ).get() );

    } );

    test( "_transformActiveToElement: false", function() {
        this.$div.maccordion( { active: [ 0, 1 ] } );

        deepEqual( this.transform( false ).get(),
            this.$headers.filter( ".dattaya-maccordion-header-active" ).get(),
            "should only return active headers"
        );

    } );

    test( "_transformActiveToElement: \"toggle\"", function() {

        deepEqual( this.transform( "toggle" ).get(), this.$headers.get(), "returns all headers" );

    } );
    test( "_transformActiveToElement: wrapped set", function() {

        deepEqual( this.transform( this.$headers ).get(),
            this.$headers.get() );

        ok( this.transform( this.$div.find( ".dattaya-maccordion-content" ) ).length === 0 );

    } );


    test( "_transformActiveToElement: unexpected", function() {

        ok( this.transform( "unexpected" ) instanceof jQuery );

        ok( this.transform( "unexpected" ).length === 0 );

    } );

    test( "_toggle", function() {

        var toggle = $.proxy( this.$div.data( "maccordion" ), "_toggle" );

        ok( toggle( $( [] ) ) == undefined );

        var $headers = this.$div.find( ".dattaya-maccordion-header:lt(2)" );

        // opens tabs
        toggle( $headers );

        // headers
        ok( $headers.are( ".ui-state-active.ui-corner-top.dattaya-maccordion-header-active" ) );

        ok( $headers.are( ":not(.ui-corner-all)" ) );

        ok( $headers.are( "[aria-selected=true][aria-expanded=true]" ) );

        // content panes
        ok( $headers.next().are( ".dattaya-maccordion-content-active" ) );

        ok( $headers.next().are( ":visible" ) );

        // closes tabs
        toggle( $headers );

        // headers
        ok( $headers.are( ":not(.ui-state-active.ui-corner-top.dattaya-maccordion-header-active)" ) );

        ok( $headers.are( ".ui-corner-all" ) );

        ok( $headers.are( "[aria-selected=false][aria-expanded=false]" ) );

        // content panes
        ok( $headers.next().are( ":not(.dattaya-maccordion-content-active)" ) );

        ok( $headers.next().are( ":hidden" ) );

        //TODO Test animated
    } );

    test( "_toggleActive", function() {

        var toggleActive = $.proxy( this.$div.data( "maccordion" ), "_toggleActive" );

        this.spy( this.$div.data( "maccordion" ), "_transformActiveToElement" );
        this.spy( this.$div.data( "maccordion" ), "_toggle" );

        var active = [ 0, 1 ];
        toggleActive( active );

        ok( this.$div.data( "maccordion" )._transformActiveToElement.calledWith( active ) );

        ok( this.$div.data( "maccordion" )._transformActiveToElement.calledOnce );

        ok( this.$div.data( "maccordion" )._toggle.calledOnce );

    } );

    test( "_create", function() {

        // main element
        ok( this.$div.is( ".dattaya-maccordion.ui-widget.ui-helper-reset" ) );

        // headers
        equal( this.$div.find( ".dattaya-maccordion-header.ui-helper-reset.ui-state-default.ui-corner-all" ).length, 3 );

        // content panes
        equal( this.$div.find( ".dattaya-maccordion-content.ui-helper-reset.ui-widget-content.ui-corner-bottom" ).length, 3 );

        deepEqual( this.$div.find( ".dattaya-maccordion-header" ).next().get(),
            this.$div.find( ".dattaya-maccordion-content" ).get(),
            "content panels come immidiately after headers"
        );

        this.spy( this.$div.data( "maccordion" ), "_toggleActive" );

        this.$div.data( "maccordion" )._create();

        var toggleActive = this.$div.data( "maccordion" )._toggleActive;

        ok( toggleActive.calledOnce );
        ok( toggleActive.calledWith( this.$div.maccordion( "option", "active" ) ) );

    } );

    test( "_create: accessibility", function() {

        // main element
        ok( this.$div.is( "[aria-multiselectable=true][role=tablist]" ) );

        // headers
        var $headers = this.$div.find( ".dattaya-maccordion-header" );

        ok( $headers.is( "[role=tab]" ), "all headers have role=tab" );

        ok( $headers.eq( 0 ).is( "[tabindex=0]" ) );

        ok( $headers.filter( ":gt(0)" ).are( "[tabindex=-1]" ) );

        ok( $headers.next().is( "[role=tabpanel]" ), "all content panes have role=tabpanel" );

    } );

    test( "_eventHandler", function() {

        this.spy( this.$div.data( "maccordion" ), "_toggle" );

        var headerD = this.$div.find( ".dattaya-maccordion-header" )[0];
        var e = $.Event( "click", { currentTarget: headerD } );

        this.$div.data( "maccordion" )._eventHandler( e );

        ok( this.$div.data( "maccordion" )._toggle.calledOnce );

        equal( this.$div.data( "maccordion" )._toggle.getCall( 0 ).args[0].get( 0 ),
            headerD
        );

    } );

    test( "_setupEvents", function() {

        this.spy( this.$div.data( "maccordion" ), "_eventHandler" );

        var eventHandler = this.$div.data( "maccordion" )._eventHandler;
        var setupEvents = $.proxy( this.$div.data( "maccordion" ), "_setupEvents" );

        var $headers = this.$div.find( ".dattaya-maccordion-header" );

        setupEvents( null );

        $headers.click().mouseenter();

        equal( eventHandler.callCount, 0 );

        setupEvents( "click mouseenter custom" );

        $headers.click().mouseenter().trigger( "custom" ).trigger( "custom.maccordion" );

        equal( eventHandler.callCount, $headers.size() * 4 );

    } );

    test( "_setZeroTabindex", function() {

//        this.$div.maccordion( { active:  } );

    } );

    module( "maccordion: inner methods", setupTeardown( function() {
        this.$div.maccordion( { active: 0 } );
        this.$headers = this.$div.find( ".dattaya-maccordion-header" );
        this.keydown = $.proxy( this.$div.data( "maccordion" ), "_keydown" );
        this.headerD = this.$div.find( ".dattaya-maccordion-header[tabindex=0]" )[0];
        this.event = $.Event( "click", { currentTarget: this.headerD, target: this.headerD } );
    } ) );

    test( "_keydown: ENTER", function() {

        this.spy( this.$div.data( "maccordion" ), "_eventHandler" );

        this.event.keyCode = $.ui.keyCode.ENTER;
        this.keydown( this.event );

        ok( this.$div.data( "maccordion" )._eventHandler.calledOnce );

        ok( this.$div.data( "maccordion" )._eventHandler.calledWith( this.event ) );

    } );

    test( "_keydown: UP, DOWN", function() {

        this.event.keyCode = $.ui.keyCode.UP;
        this.keydown( this.event );

        ok( $( this.headerD ).is( "[tabindex=-1]" ) );

        ok( this.$headers.eq( 2 ).is( "[tabindex=0]" ) );


    } );

})( jQuery );