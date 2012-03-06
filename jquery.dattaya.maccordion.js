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
            heightStyle: false,
            animated   : true
        },

        /**
         *
         * @param {jQuery} $headers
         */
        _toggle: function( $headers ) {

            if ( $headers.length == 0 )
                return;

            console.debug( "_toggle" );

            $headers
                .toggleClass( "ui-state-active ui-corner-all ui-corner-top dattaya-maccordion-header-active" );

            // ARIA
            $headers.maccordionToggleAttributes( "aria-selected aria-expanded" );

            if ( this.options.animated ) {
                $headers.next()
                    .slideToggle( this.options.speed, this.options.easing );
            } else {
                $headers.next().toggle();
            }

            $headers.next().toggleClass( "dattaya-maccordion-content-active" );
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

            console.debug( event.type === "keypress" ? "click" : event.type );

            this._toggle( $( event.currentTarget ) );

            event.preventDefault();
        },

        _create: function() {
            var self = this,
                options = self.options;

            self.element
                .addClass( "dattaya-maccordion ui-widget ui-helper-reset" );

            self.$headers = self.element.find( options.header );

            this._setupTabs( self.$headers );

            // HELPERS {
            $.fn.maccordionToggleAttributes = function( attributes ) {
                attributes = $.trim( attributes ).split( " " );
                this.each( function( index, el ) {
                    $.each( attributes, function( index, attr ) {
                        $( el ).attr( attr, $( el ).attr( attr ) != "true" );
                    } );
                } );
            };
            // }

            // ARIA {
            self.element
                .attr( "aria-multiselectable", true )
                .attr( "role", "tablist" );

            self._activate( options.active );

            self._setZeroTabindex( this.$headers.eq( 0 ) );
            // }

            self.refresh();
        },

        destroy: function() {
            // clean up main element
            this.element
                .removeClass( "dattaya-maccordion ui-widget ui-helper-reset" )
                .removeAttr( "aria-multiselectable role" );

            // clean up headers
            this.$headers
                .off( ".maccordion" )
                .removeClass( "dattaya-maccordion-header ui-helper-reset ui-state-default " +
                "ui-corner-all ui-state-active ui-corner-top dattaya-maccordion-header-active " +
                "ui-maccordion-disabled ui-state-disabled ui-state-focus ui-state-hover" )
                .removeAttr( "role tabindex aria-selected aria-expanded" );

            // clean up content
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
         * @param {Number[]|String|Boolean|jQuery} active
         */
        _activate: function( active ) {

            console.debug( "_activate" );

            this._toggle( this._transformActiveToElement( active ) );
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
                this._setZeroTabindex( this.$headers.eq( toFocus ).focus() );
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

            this._setupTabs( this.element.find( options.header ).not( this.$headers ) );
            this.$headers = this.element.find( options.header );

        },

        _setOption: function( key, value ) {
            var options = this.options;

            //TODO This optimization breaks { active: [array] } behavior. So should probably be deleted.
//            if ( options[ key ] === value ) {
//                return;
//            }

            console.debug( "_setOption" );

            if ( key === "event" ) {
                if ( options.event ) {
                    this.$headers.off( options.event.split( " " ).join( ".maccordion " ) + ".maccordion" );
                }

                this._setupEvents( value, this.$headers );
            }

            $.Widget.prototype._setOption.apply( this, arguments );

            switch ( key ) {
                case "disabled":
                    this.$headers.add( this.$headers.next() )
                        .toggleClass( "dattaya-maccordion-disabled ui-state-disabled", !!value );
                    break;

                case "active":
                    this._activate( value );
                    break;
            }
        },

        _setupEvents: function( event, $headers ) {
            var self = this;

            if ( event ) {
                $headers.on( event.split( " " ).join( ".maccordion " ) + ".maccordion",
                    $.proxy( self, "_eventHandler" ) );
            }
        },

        _setupTabs: function( $headers ) {
            var options = this.options;

            $headers.addClass( "dattaya-maccordion-header ui-helper-reset ui-state-default " +
                "ui-corner-all" );

            $headers.next()
                .addClass( "dattaya-maccordion-content ui-helper-reset ui-widget-content " +
                "ui-corner-bottom" );

            this._setupEvents( options.event, $headers );

            $headers
                .attr( {
                role           : "tab",
                tabindex       : -1,
                "aria-selected": false,
                "aria-expanded": false
            } );

            $headers.next()
                .attr( "role", "tabpanel" );

            $headers
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

                    $( this ).addClass( "ui-state-focus" );
                },
                "blur.maccordion"      : function() {
                    if ( options.disabled ) {
                        return;
                    }
                    $( this ).removeClass( "ui-state-focus" );

                    console.debug( "blur" );
                },
                "keydown.maccordion"   : $.proxy( this, "_keydown" )
            } );

        },

        _setZeroTabindex: function( $header ) {

            if ( this.$zeroTabIndex ) {
                this.$zeroTabIndex.attr( "tabindex", -1 );
            }

            this.$zeroTabIndex = $header.attr( "tabindex", 0 );
        },

        _transformActiveToElement: function( active ) {

            if ( active instanceof jQuery ) {
                return active.filter( ".dattaya-maccordion-header" );
            }

            switch ( true ) {
                case $.isNumeric( active ):
                    return this.$headers.eq( active );
                case active === true:
                    return this.$headers.not( ".dattaya-maccordion-header-active" );
                case active === "toggle":
                    return this.$headers;
                case $.isArray( active ):
                    return this.$headers.not( function( index ) {
                        return $.inArray( index, active ) === -1;
                    } );
                case active === false:
                    return this.$headers.filter( ".dattaya-maccordion-header-active" );
                default:
                    return $( [] );
            }
        }

    } );

})( jQuery );