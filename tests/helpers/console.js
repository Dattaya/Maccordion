(function ( $ ) {
    window.console = window.console || {};
    console.debug = console.debug || console.info || function ( message ) {
        if ( $( "#debug-console" ).length == 0 ) {
            $( "<div id=\"debug-console\" class=\"ui-helper-hidden\"></div>" ).appendTo( "body" );
        }
        $( "#debug-console" ).prepend( "\n" + (new Date()).getTime().toString().substr(-4) + ". " + message );
    };
})( jQuery );

