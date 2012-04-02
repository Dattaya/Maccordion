# README

## What is Maccordion?

Maccordion is a jQueryUI plugin, similar to [jQuery UI Accordion](http://jqueryui.com/demos/accordion/) but allows
more than one content panel to be opened at the same time.

**Options:** disabled, active, effect, options, easing, speed, heightStyle, event, header, icons.

**Methods:** destroy, disable, enable, option, widget, refresh.

**Events:** create, beforeActivate, activate.

### Dependencies

* UI Core
* UI Widget
* UI Effects Core + UI Effects Blind if "effect" option is used.

### Screenshot

![Maccordion](http://dl.dropbox.com/u/55246206/dev/libraries/maccordion/maccordion.png)

## Options
### disabled
**bool *disabled* : false** ([example](http://jsfiddle.net/Dattaya/VsByz/))

Disables (true) or enables (false) the maccordion. Can be set when initializing the maccordion.


```js
//Initialization
$( ".selector" ).accordion({ disabled: true });

//Set
$( ".selector" ).accordion( "option", "disabled", true );
```
### active
**mixed *active* : 0**

**number** ([example](http://jsfiddle.net/Dattaya/g5w25/)) 
Toggles tab. Supports negative numbers (works like jQuery ```.eq()```)

```js
$( ".maccordion" ).maccordion( "option", "active", -2  );
```

**array**
Toggles tabs. Doesn't support negative numbers.

```js
// opens first and second tabs
$( ".maccordion" ).maccordion( "option", "active", [0, 1] );
```

**bool : true**
Opens all tabs. Only for opening.

```js
$( ".maccordion" ).maccordion( "option", "active", true );
```

**bool : false**
Closes all tabs.

```js
$( ".maccordion" ).maccordion( "option", "active", false );
```

**string : "toggle"** ([example](http://jsfiddle.net/Dattaya/UeGVn/)) 
Toggles all tabs.

```js
$( ".maccordion" ).maccordion( "option", "active", "toggle" );
```

**object : jQuery (tab's headers)** ([example](http://jsfiddle.net/Dattaya/46NCz/))
Toggles tabs.

```js
$( ".maccordion" ).maccordion( { active: false } );

$( ".maccordion" ).maccordion( "option", "active", $( ".maccordion .dattaya-maccordion-header" ) );
```

### effect
**string *effect* : blind**

For this to work, JQuery UI Effects Core and an effect one want to use are required. Supports effects that can be used with toggle function.
jQuery UI Effects - [Examples](http://jqueryui.com/demos/effect/ ), [Descriptions](http://docs.jquery.com/UI/Effects) 

```js
$( ".maccordion" ).maccordion( "option", "effect", "fade" );
```

### options
**object *options* : {}** ([example](http://jsfiddle.net/Dattaya/VetAB/)) 

An object/hash including specific options for the effect. [Effects and their options](http://docs.jquery.com/UI/Effects#Individual_effects) 

### easing
**string *easing* : swing**

Effect related. Name of a function to perform easing of the animation. ([Easing showcase](http://jqueryui.com/demos/effect/#easing)) 

### speed
**string *speed* : normal**

Duration of the effect.

### heightStyle
**string *heightStyle* : auto**

**false**
Content panes height will be according to the height of inner content.

**auto** 
If set, the highest content part is used as height reference for all other parts.

### event
**string *event* : click** ([example](http://jsfiddle.net/Dattaya/CL7Mm/)) 

Specifies the event used to toggle a maccordion tab.

```js
$( ".maccordion" ).maccordion( "option", "event", "mouseenter click" );
```

### header
**string *header* : "> li > :first-child,> :not(li):even"**

Selector for the header element.

### icons 
**object *icons* : { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" }** 
([example](http://jsfiddle.net/Dattaya/NwJe8/)) 

Icons to use for headers. ([jQueryUI icons](http://jqueryui.com/themeroller/#icons)) 

```js
$( ".maccordion" ).maccordion( {
    icons: {
        activeHeader: "ui-icon-minus",
        header      : "ui-icon-plus"
    } 
} );
```

## Events
### create

This event is triggered when a maccordion is created.

```js
$( ".maccordion" ).maccordion({
    create: function(event) { ... }
});
```

or

```js
$( ".maccordion" ).bind("maccordioncreate": function(event) { 
    ... 
});
```

### beforeActivate

Triggered when the maccordion is about to change. 

```js
$( ".maccordion" ).bind("maccordionbeforeActivate": function(event, data) { 
    data.toggled // headers of the content panels that are going to be toggled.
});
```

### activate

Triggered when the maccordion has been changed.

```js
$( ".maccordion" ).bind("maccordionactivate": function(event, data) {
    data.toggled // headers of the content panels that have been toggled.
});
```

## Methods

### destroy

Removes the maccordion functionality completely. This will return the element back to its pre-init state.

### disable

Disables the maccordion.

### enable

Enables the maccordion.

### option

Gets or sets any maccordion option. If no value is specified, will act as a getter.


### widget

Returns the .dattaya-maccordion element.

### refresh

Recomputes heights of tabs, adds/removes tabs.

Adding a tab dynamically ([playground](http://jsfiddle.net/Dattaya/pMM8T/)):

```js
$( ".maccordion" ).maccordion()
    .append( "<h3><a href=\"#\">Fourth header</a></h3><div>Fourth content</div>" )
    .maccordion( "refresh" );
```

Removing a tab dynamically ([playground](http://jsfiddle.net/Dattaya/rPbUL/)):

```js
$( ".maccordion" ).maccordion()
    .children( ":first" )
        .next()
        .andSelf()
            .remove();

$( ".maccordion" ).maccordion( "refresh" );

```

## Theming

Maccordion uses jQuery UI CSS Framework. Use [ThemeRoller](http://jqueryui.com/themeroller/) tool to create and download custom themes that are easy to build and maintain. 

If a deeper level of customization is needed, there are widget-specific classes that can be modified (all classes bellow):  

```html
<div class="dattaya-maccordion dattaya-maccordion-icons">

    <!--Opened tab-->
    <h3 class="dattaya-maccordion-header dattaya-maccordion-header-active">
        <span class="dattaya-maccordion-header-icon"></span>
        <a href="#" class="dattaya-maccordion-heading">Header</a>
    </h3>
    <div class="dattaya-maccordion-content dattaya-maccordion-content-active">Content</div>

    <!--Closed tab-->
    <h3 class="dattaya-maccordion-header">
        <span class="dattaya-maccordion-header-icon"></span>
        <a href="#" class="dattaya-maccordion-heading">Header</a>
    </h3>
    <div class="dattaya-maccordion-content">Content</div>

</div>
```