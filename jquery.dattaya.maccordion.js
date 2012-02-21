/**
 * Work in progress
 * v. 0.0.-1
 */

(function( $, undefined ) {
    $.widget( "dattaya.maccordion", {
        options: {
            active     : 0,
            header     : "> li > :first-child,> :not(li):even",
            event      : "click",
            easing     : "swing",
            speed      : "normal",
            disabled   : false,
            heightStyle: "auto",
            animated   : true
        },

        /**
         *
         * @param {jQuery} $header
         */
        _animate: function( $header ) {

            if ( $header.length == 0 )
                return;

            console.debug( "animate" );

            $header
                .toggleClass( "ui-state-active ui-corner-all ui-corner-top dattaya-maccordion-header-active" );

            //ARIA
            this._toggleAttributes( $header, [ "aria-selected", "aria-expanded" ] );

            if ( this.options.animated ) {
                $header.next()
                    .slideToggle( this.options.speed, this.options.easing );
            } else {
                $header.next().toggle();
            }

            $header.next().toggleClass( "dattaya-maccordion-content-active" );

        },

        /**
         *
         * @param {Object} event
         */
        _eventHandler: function( event ) {
            var options = this.options;

            if ( options.disabled ) {
                return;
            }

            var $header = $( event.currentTarget );

            console.debug( event.type === "keypress" ? "click" : event.type );

            this._animate( $header );

            event.preventDefault();

        },

        _create: function() {

            var self = this,
                options = self.options;

            self.element
                .addClass( "dattaya-maccordion ui-widget ui-helper-reset" );

            self.$headers = self.element.find( options.header )
                .addClass( "dattaya-maccordion-header ui-helper-reset ui-state-default " +
                "ui-corner-all" );

            self.$headers.next()
                .addClass( "dattaya-maccordion-content ui-helper-reset ui-widget-content " +
                "ui-corner-bottom" );

            // ARIA {
            self.element
                .attr( "aria-multiselectable", true )
                .attr( "role", "tablist" );

            self.$headers
                .attr( {
                role           : "tab",
                tabindex       : -1,
                "aria-selected": false,
                "aria-expanded": false
            } );

            self._expandTabs( options.active );

            self.$zeroTabIndex = self.$headers
                .filter( self.$expanded[0] ? self.$expanded[0] : ":eq(0)" )
                .attr( "tabindex", 0 );

            self.$headers.next()
                .attr( "role", "tabpanel" );

            // }

            self.$headers
                .on( {
                "mouseenter.maccordion": function() {
                    if ( options.disabled ) {
                        return;
                    }
                    $( this ).addClass( "ui-state-hover" );
                },
                "mouseleave.maccordion": function() {
                    if ( options.disabled ) {
                        return;
                    }
                    $( this ).removeClass( "ui-state-hover" );
                },
                "focus.maccordion"     : function() {
                    if ( options.disabled ) {
                        return;
                    }
                    console.debug( "focus" );
                    $( this )
                        .addClass( "ui-state-focus" );
                },
                "blur.maccordion"      : function() {
                    if ( options.disabled ) {
                        return;
                    }
                    $( this ).removeClass( "ui-state-focus" );

                    console.debug( "blur" );
                },
                "keydown.maccordion"   : $.proxy( self, "_keydown" )
            } );

            self._setupEvents( options.event );

            self.refresh();

        },

        destroy: function() {
            //clean up main element
            this.element
                .removeClass( "dattaya-maccordion ui-widget ui-helper-reset" )
                .removeAttr( "aria-multiselectable role" );

            //clean up headers
            this.$headers
                .off( ".maccordion" )
                .removeClass( "dattaya-maccordion-header ui-helper-reset ui-state-default " +
                "ui-corner-all ui-state-active ui-corner-top dattaya-maccordion-header-active " +
                "ui-maccordion-disabled ui-state-disabled" )
                .removeAttr( "role tabindex aria-selected aria-expanded" );

            //clean up content
            this.$headers.next()
                .css( "display", "" )
                .removeClass( "dattaya-maccordion-content ui-helper-reset ui-widget-content " +
                "ui-corner-bottom dattaya-maccordion-content-active " +
                "ui-maccordion-disabled ui-state-disabled" )
                .removeAttr( "role" );

            console.debug( "destroy" );

            return $.Widget.prototype.destroy.call( this );
        },

        /**
         *
         * @param {Number[]|String|Boolean} active
         */
        _expandTabs: function( active ) {
            var self = this;

            var $expandable = this._transformActiveToElement( active ),
                $toExpand = $expandable;

            if ( self.$expanded ) {
                $toExpand = $expandable.not( self.$expanded );
            }

            self.$expanded = $expandable;

            console.debug( "expandTabs" );

            $toExpand.each( function() {
                self._animate( $( this ) );
            } );
        },

        _keydown: function( event ) {
            if ( this.options.disabled || event.altKey || event.ctrlKey ) {
                return;
            }

            if ( event.target != event.currentTarget ) {
                return;
            }

            var keyCode = $.ui.keyCode,
                length = this.$headers.length,
                currentIndex = this.$headers.index( event.currentTarget ),
                toFocus = false;

            console.debug( event.type );

            switch ( event.keyCode ) {
                case keyCode.RIGHT:
                case keyCode.DOWN:
                    toFocus = ( currentIndex + 1 ) % length;
                    break;
                case keyCode.LEFT:
                case keyCode.UP:
                    toFocus = ( length + currentIndex - 1 ) % length;
                    break;
                case keyCode.SPACE:
                case keyCode.ENTER:
                    this._eventHandler( event );
                    break;
                default:
                    return;
            }

            if ( toFocus !== false ) {
                this.$zeroTabIndex.attr( "tabindex", -1 );
                this.$zeroTabIndex = this.$headers.eq( toFocus ).attr( "tabindex", 0 ).focus();
            }

            event.preventDefault();

        },

        refresh: function() {
            var options = this.options;

            if ( options.heightStyle === "auto" ) {
                var maxHeight = 0;
                this.$headers.next()
                    .each( function() {
                        maxHeight = Math.max( maxHeight, $( this ).height() );
                    } )
                    .height( maxHeight );

            }

        },

        _setOption: function( key, value ) {

            var options = this.options;

            if ( options[ key ] === value ) {
                return;
            }

            console.debug( "setOption" );

            if ( key === "event" ) {
                if ( options.event ) {
                    this.$headers.off( options.event.split( " " ).join( ".maccordion " ) + ".maccordion" );
                }

                this._setupEvents( value );
                return;
            }

            $.Widget.prototype._setOption.apply( this, arguments );


            switch ( key ) {
                case "disabled":
                    this.$headers.add( this.$headers.next() )
                        .toggleClass( "ui-maccordion-disabled ui-state-disabled", !!value );
                    break;

                case "active":
                    this._expandTabs( value );
                    break;

            }
        },

        _setupEvents: function( event ) {
            var self = this;

            if ( event ) {
                this.$headers.on( event.split( " " ).join( ".maccordion " ) + ".maccordion",
                    $.proxy( self, "_eventHandler" ) );
            }

        },

        /**
         *
         * @param {jQuery} $oneEl
         * @param {String|String[]} attributes
         */
        _toggleAttributes: function( $oneEl, attributes ) {
            attributes = ( typeof attributes === "string" ) ? [ attributes ] : attributes;

            console.debug( "toggleAttributes" );

            $.each( attributes, function( index, attr ) {
                if ( $oneEl.attr( attr ) == "true" ) {
                    $oneEl.attr( attr, false );
                } else {
                    $oneEl.attr( attr, true );
                }
            } );
        },

        _transformActiveToElement: function( active ) {
            switch ( true ) {
                case $.isNumeric( active ):
                    return this.$headers.eq( active );
                case typeof active === "string":
                    return this.$headers;
                case $.isArray( active ):
                    return this.$headers.not( function( index ) {
                        return $.inArray( index, active );
                    } );
                default:
                    return $( [] );
            }
        }

    } );

})( jQuery );