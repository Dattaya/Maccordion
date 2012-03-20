(function( $ ) {

    module( "maccordion: events", setupTeardown( function() {
        this.$div.maccordion( { active: false } );
        this.$headers = this.$div.find( ".dattaya-maccordion-header" );
    } ) );

    test( "beforeActivate", function() {
        var self = this;
        this.$div.one( "maccordionbeforeactivate", function( event, data ) {

            strictEqual( event.originalEvent, undefined );

            equal( data.toggled.get( 0 ), self.$headers.get( 0 ) );

            return false;
        } );
        this.$div.maccordion( { active: 0 } );

        maccordion_state_helper( this.$div, 0, 0, 0, "tab should not be opened if \"maccordionbeforeactivate\" returned false" );

        this.$div.one( "maccordionbeforeactivate", function( event ) {

            strictEqual( event.originalEvent.type, "click" );

        } );
        this.$headers.eq( 0 ).click();
        this.$div.one( "maccordionbeforeactivate", function( event ) {

            ok( true, "if there are no headers, event still beign triggered, because widget.$headers propery isn't refreshed by default" );

        } );
        this.$headers.remove();
        this.$div.maccordion( { active: 0 } );
    } );

    test( "activate", function() {
        var self = this;
        this.$div.one( "maccordionactivate", function( event, data ) {

            strictEqual( event.originalEvent, undefined );

            equal( data.toggled.get( 0 ), self.$headers.get( 0 ) );

            return false;
        } );
        this.$div.maccordion( { active: 0 } );

        maccordion_state_helper( this.$div, 1, 0, 0 );

        this.$div.one( "maccordionactivate", function( event ) {

            strictEqual( event.originalEvent.type, "click" );

        } );
        this.$headers.eq( 0 ).click();

    } );

    asyncTest( "activate: during animation", 1, function() {
        this.$div.maccordion( { effect: "fade", speed: 10 } );
        this.$div.one( "maccordionactivate", function( event, data ) {
            setTimeout( function() {

                ok( data.toggled.next().are(":not(:animated)"), "event should be triggered after animation" );

                start();
            }, 50 );
        } );
        this.$headers.click();
    } );

})( jQuery );