/*
 * jQueryUI Maccordion
 * (c) Yaroslav Kiliba <om.dattaya@gmail.com>
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.effects.core.js
 *	jquery.ui.effects.blind.js - default effect
 */

(function( $, undefined ) {
    $.widget( "dattaya.maccordion", {
        options: {
            active     : 0,
            header     : "> li > :first-child,> :not(li):even",
            event      : "click",
            effect     : "blind",
            options    : {},
            easing     : "swing",
            speed      : "normal",
            disabled   : false,
            heightStyle: "auto",
            icons      : {
                activeHeader: "ui-icon-triangle-1-s",
                header      : "ui-icon-triangle-1-e"
            }
        },

        /**
         *
         * @param {jQuery} $headers
         */
        _toggle: function( $headers, event ) {
            var $toToggle = $headers.next().not(".ui-effects-wrapper").not(":animated");
            var options = this.options,
                data = { toggled: $headers = $toToggle.prev() },
                self = this;

            if ( $headers.length == 0 ||
                ( this._trigger( "beforeActivate", event, data ) === false ) )
                return;

            if ( options.effect ) {
                $toToggle
                    .toggle( options.effect, this.effOptions, options.speed,
                        function() {
                            self._trigger( "activate", event, data );
                        } );
            } else {
                $toToggle.toggle();
                this._trigger( "activate", event, data );
            }

            $headers
                .toggleClass( "ui-state-active ui-corner-all ui-corner-top dattaya-maccordion-header-active" )
                .maccordionToggleAttributes( "aria-selected aria-expanded" )
                .find( ".dattaya-maccordion-header-icon" )
                    .toggleClass( options.icons.header + " " + options.icons.activeHeader );

            $toToggle.toggleClass( "dattaya-maccordion-content-active" );
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

            this._toggle( $( event.currentTarget ), event );

            event.preventDefault();
        },

        _create: function() {
            var options = this.options;

            this._setupElement();

            this.$headers = this.element.find( options.header );

            this._setupTabs( this.$headers );

            this._setupHelpers();

            this._activate( options.active );

            this._setZeroTabindex( this.$headers.eq( 0 ) );

            this._heightStyle();
        },

        _setupHelpers: function() {
            if ( !$.fn.maccordionToggleAttributes ) {
                $.fn.maccordionToggleAttributes = function( attributes ) {
                    attributes = $.trim( attributes ).split( " " );
                    this.each( function( index, el ) {
                        $.each( attributes, function( index, attr ) {
                            $( el ).attr( attr, $( el ).attr( attr ) != "true" );
                        } );
                    } );
                    return this;
                };
            }
        },

        destroy: function() {
            this._cleanupElement();

            this._cleanupHeaders();

            this._cleanupContents();

            return $.Widget.prototype.destroy.call( this );
        },

        _cleanupHeaders: function() {
            this.$headers
                .off( ".maccordion" )
                .removeClass( "dattaya-maccordion-header ui-helper-reset ui-state-default " +
                "ui-corner-all ui-state-active ui-corner-top dattaya-maccordion-header-active " +
                "ui-maccordion-disabled ui-state-disabled ui-state-focus ui-state-hover" )
                .removeAttr( "role tabindex aria-selected aria-expanded" );

            this._destroyIcons();
            this._cleanupAnchors();
        },

        _cleanupContents: function() {
            this.$headers.next()
                .css( "display", "" )
                .removeClass( "dattaya-maccordion-content ui-helper-reset ui-widget-content " +
                "ui-corner-bottom dattaya-maccordion-content-active " +
                "ui-maccordion-disabled ui-state-disabled" )
                .removeAttr( "role" );
        },

        _cleanupElement: function() {
            this.element
                .removeClass( "dattaya-maccordion ui-widget ui-helper-reset" )
                .removeAttr( "aria-multiselectable role" );
        },

        /**
         *
         * @param {Number[]|String|Boolean|jQuery} active
         */
        _activate: function( active ) {
            if ( this.options.disabled ) {
                return;
            }
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

        _heightStyle: function() {
            if ( this.options.heightStyle === "auto" ) {
                var maxHeight = 0;
                this.$headers.next()
                    .each( function() {
                        maxHeight = Math.max( maxHeight, $( this ).height() );
                    } )
                    .height( maxHeight );
            }
        },

        refresh: function() {
            var options = this.options;

            this._setupTabs( this.element.find( options.header ).not( this.$headers ) );
            this.$headers = this.element.find( options.header );

            this._heightStyle();
        },

        _setOption: function( key, value ) {
            var options = this.options;

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

                case "icons":
                    this._destroyIcons( this.$headers );
                    this._setupIcons( this.$headers );
                    break;

                case "options":
                    this.effOptions = $.extend( {}, value, { easing: options.easing } );
                    break;
            }
        },

        _setupEvents: function( event, $headers ) {
            if ( event ) {
                $headers.on( event.split( " " ).join( ".maccordion " ) + ".maccordion",
                    $.proxy( this, "_eventHandler" ) );
            }
        },

        _setupElement: function() {
            this.element
                .addClass( "dattaya-maccordion ui-widget ui-helper-reset" );

            this.element
                .attr( "aria-multiselectable", true )
                .attr( "role", "tablist" );
        },

        _setupTabs: function( $headers ) {
            this._setupHeaders( $headers );

            this._setupContents( $headers );
        },

        _setupHeaders: function( $headers ) {
            var options = this.options;

            $headers
                .addClass( "dattaya-maccordion-header ui-helper-reset ui-state-default " +
                                "ui-corner-all" )
                .attr( {
                    role           : "tab",
                    tabindex       : -1,
                    "aria-selected": false,
                    "aria-expanded": false
                } )
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

                        $( this ).addClass( "ui-state-focus" );
                    },
                    "blur.maccordion"      : function() {
                        if ( options.disabled ) {
                            return;
                        }
                        $( this ).removeClass( "ui-state-focus" );

                    },
                    "keydown.maccordion"   : $.proxy( this, "_keydown" )
            } );

            this._setupEvents( this.options.event, $headers );

            this._setupAnchors( $headers );

            this._setupIcons( $headers );
        },

        _setupContents: function( $headers ) {
            $headers.next()
                .attr( "role", "tabpanel" );

            $headers.next()
                .addClass( "dattaya-maccordion-content ui-helper-reset ui-widget-content " +
                "ui-corner-bottom" );
        },

        _setupIcons: function( $headers ) {
            if ( this.options.icons ) {
                $( "<span>" )
                    .addClass( "dattaya-maccordion-header-icon ui-icon " + this.options.icons.header )
                    .prependTo( $headers );
                this.element.addClass( "dattaya-maccordion-icons" );
            }
        },

        _setupAnchors: function( $headers ) {
            $headers.children( "a:first-child" )
                .addClass( "dattaya-maccordion-heading" )
                .attr( "tabindex", -1 );
        },

        _cleanupAnchors: function() {
            this.$headers.children( "a:first-child" )
                .removeClass( "dattaya-maccordion-heading" )
                .removeAttr( "tabindex" );
        },

        _destroyIcons: function() {
            this.element.removeClass( "dattaya-maccordion-icons" );
            this.$headers.children( ".dattaya-maccordion-header-icon" ).remove();
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