(function( $ ) {
    var self = this;
    module( "maccordion: options", setupTeardown( function() {
        this.$div.maccordion( { active: false } );
    } ) );

    test( "active", function() {

        this.spy( this.$div.data( "maccordion" ), "_toggleActive" );

        this.$div.maccordion( { active: 2 } );

        var toggleActive = this.$div.data( "maccordion" )._toggleActive;

        ok( toggleActive.calledOnce );
        ok( toggleActive.calledWith( 2 ) );

    } );

    test( "event", function() {

        this.spy( this.$div.data( "maccordion" ), "_eventHandler" );
        this.spy( this.$div.data( "maccordion" ), "_setupEvents" );

        var setupEvents = this.$div.data( "maccordion" )._setupEvents;

        this.$div.maccordion( { event: "click mouseenter custom" } );

        ok( setupEvents.calledOnce );
        ok( setupEvents.calledWith( "click mouseenter custom" ) );

        this.$div.maccordion( { event: false } );

        this.$div.find( ".dattaya-maccordion-header" ).click();

        equal( this.$div.data( "maccordion" )._eventHandler.callCount, 0 );

    } );

    



//    test( "active: false", function() {
//
//        this.$div.maccordion( { active: 2 } );
//        this.$div.maccordion( { active: false } );
//
//        maccordion_state_helper( this.$div, 0, 0, 0, "all content panels should be hidden" );
//
//        strictEqual( this.$div.maccordion( "option", "active" ), false );
//
//    } );
//
//    test( "active: true", function() {
//
//        this.$div.maccordion( { active: [ 1 ] } );
//        this.$div.maccordion( "option", { active: true } );
//
//        maccordion_state_helper( this.$div, 1, 1, 1, "all content panels should be opened" );
//
//        strictEqual( this.$div.maccordion( "option", "active" ), true );
//
//    } );
//
//    test( "active: number", function() {
//
//        this.$div.maccordion( { active: 2 } );
//
//        maccordion_state_helper( this.$div, 0, 0, 1, "third content panel should be opened" );
//
//        this.$div.maccordion( { active: 2 } );
//
//        maccordion_state_helper( this.$div, 0, 0, 0 );
//
//        strictEqual( this.$div.maccordion( "option", "active" ), 2 );
//
//    } );
//
//    test( "active: toggle", function() {
//
//        this.$div.maccordion( { active: [ 1 ] } );
//        this.$div.maccordion( { active: "toggle" } );
//
//        maccordion_state_helper( this.$div, 1, 0, 1, "second tab was opened; after { active: toggle } first and third should be opened" );
//
//        strictEqual( this.$div.maccordion( "option", "active" ), "toggle" );
//
//    } );
//
//
//    test( "active: array", function() {
//
//        this.$div.maccordion( { active: [ 0, 2 ] } );
//
//        maccordion_state_helper( this.$div, 1, 0, 1, "first and third content panels should be opened" );
//
//        this.$div.maccordion( { active: [ 0, 2 ] } );
//
//        maccordion_state_helper( this.$div, 0, 0, 0 );
//
//        deepEqual( this.$div.maccordion( "option", "active" ), [ 0, 2 ] );
//
//    } );
//
//    test( "active: jQuery wrapped set", function() {
//
//        this.$div.maccordion( { active: this.$div.find( ".dattaya-maccordion-header:first" ) } );
//
//        maccordion_state_helper( this.$div, 1, 0, 0 );
//
//        equal( this.$div.maccordion( "option", "active" )[0], this.$div.find( ".dattaya-maccordion-header:first" )[0] );
//
//        this.spy( this.$div.data( "maccordion" ), "_toggle" );
//
//        this.$div.maccordion( { active: this.$div.find( ".dattaya-maccordion-content:first" ) } );

        //TO DO Rewrite
//        equal( this.$div.data( "maccordion" )._animate.callCount, 0,
//            "Elements other then .dattaya-maccordion-header should not be animated" );

//        equal( this.$div.maccordion( "option", "active" )[0], this.$div.find( ".dattaya-maccordion-content:first" )[0] );
//
//    } );

})( jQuery );