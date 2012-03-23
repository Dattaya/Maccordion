# README

## What is Maccordion?

Maccordion is similar to [jQuery UI Accordion](http://jqueryui.com/demos/accordion/) but allows
more than one content panel to be opened at the same time.

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
Toggles tab. Doesn't support negative numbers.

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

