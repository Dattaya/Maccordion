(function( $ ) {

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

})( jQuery );