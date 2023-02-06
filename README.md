# Divi slider convert - a script to transform modules into sliders

This repo contains the code for a little script that will use [Blaze Slider](https://github.com/blaze-slider/blaze-slider)
and convert sections, rows and blog modules into sliders. You may need to make some adjustments to the different modules
settings, but this script allows a world of possibilities that weren't really available before.

**Be aware that the stylesheet included is still to be considered in alpha and may require some tweaking.**

## How to build it

Clone the repo and then run the following commands:

```sh
npm install
npm run build
```

After this, you should see a "build" folder with the javascript and css files within.

## Usage

To use it, you should first enqueue the Blaze Slider library (personally, I suggest downloading it and
putting it inside a child theme):

```php
/* Include BlazeSlider */
wp_enqueue_style( 'blaze-css', get_stylesheet_directory_uri() . '/lib/blaze.css');
wp_enqueue_script( 'blaze-js', get_stylesheet_directory_uri() . '/lib/blaze-slider.min.js');
```

After that, you can enqueue the scripts that you find inside the `build` folder:

```php
/* Include custom js/css for integrating BlazeSlider */
wp_enqueue_style( 'blaze-convert-css', get_stylesheet_directory_uri() . '/lib/divi-slider-style.css', [], '1.0.0');
wp_enqueue_script( 'blaze-convert-js', get_stylesheet_directory_uri() . '/lib/divi-elements-to-slider.min.js', [], '1.0.0');
```

The stylesheet included includes a very basic style for your pagination and arrows, with some customizability.
However, you can just ignore it and make your own, if you prefer.

Now that the scripts are loaded, you need to give the module a specific Id or a class, in order to reference it
within the javascript code. You can do it in the Divi Builder, in the module settings, then "Advanced" --> "Id & CSS Classes".

Let's say that we gave the module this id: "#team-slider".

Here it is how you can convert it into a slider:

```js
convertToSlider('#team-slider', {
  all: {
    slidesToShow: 3,
    loop: false,
    slideGap: "40px",
    // ...
  }
});
```

Just put this javascript code into a code block or a custom js file in order to convert it. It would be better to
make this script run after the content has finished loading, maybe using the "DOMContentLoaded" window event.

The options given as the second parameter will be directly passed to the Blaze Slider constructor. To look at all
the options that you can set, please refer to [this page](https://blaze-slider.dev/docs/Tutorial/config) in the Blaze Slider docs.

## Basic customization

If you use the included stylesheet, there are some helpful classes and css variables that you can use to customize
the pagination appearance.

### Additional classes

These are the classes that you can add to the module that you converted into a slider:

* **no-arrows**: This class will hide the pagination arrows
* **no-hidden-track**: By default, an `overflow: hidden` will be placed in the slides container. If you want to remove it you can use this class. Be aware that you *will need* a parent with `overflow: hidden` set to avoid horizontal overflow
* **arrows-around**: This will place the arrows around the slides (more or less vertically centered in respect to the slider)

### CSS Variables

These are the css variables to customize the pagination appearance:

| Variable | Description |
| -------- | ----------- |
| --blaze-pagination-padding | This will change the `padding-block` of the pagination section |
| --blaze-pagination-gap | This will set the gap between the pagination buttons (the ones that select a specific slides) |
| --blaze-button-fg | This will change the chevrons color |
| --blaze-button-bg | This will change the color of the chevrons background |
| --blaze-disabled-btn | This is the background color of a disabled chevron (because you reached the end of the slider, or the start, and looping is disabled) |
| --blaze-pagination-bg | This is the color of the pagination buttons when they're not representing the active slide |
| --blaze-pagination-bg-active | This is the color of the active pagination button |

