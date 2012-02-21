(function() {
    var parts = document.location.search.slice( 1 ).split( "&" ),
        i = 0,
        current,
        version = { jquery: "", jqueryui: "1.8.17" };


    for ( ; i < parts.length; i++ ) {
        current = parts[ i ].split( "=" );
        version[ current[ 0 ] ] = current[ 1 ];
    }

    version.jquery = version.jquery ? "-" + version.jquery : version.jquery;

    var cdn = "http://code.jquery.com/",
        loadCSS = function( url ) {
            document.write( "<link rel='stylesheet' type='text/css' href='" + cdn + url + "'>" );
        },
        loadJS = function( url ) {
            document.write( "<script src='" + cdn + url + "'></script>" );
        };

    loadJS( "jquery" + version.jquery + ".min.js" );
    loadJS( "ui/" + version.jqueryui + "/jquery-ui.min.js" );
    loadCSS( "ui/" + version.jqueryui + "/themes/smoothness/jquery-ui.css" );

})();