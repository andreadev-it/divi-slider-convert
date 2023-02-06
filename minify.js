import { minify } from 'minify';
import { writeFileSync } from 'fs';

const filesToMinify = {
    "./build/divi-elements-to-slider.js": "./build/divi-elements-to-slider.min.js",
    "./src/divi-slider-style.css"       : "./build/divi-slider-style.css"
};

for (let [src, dest] of Object.entries(filesToMinify)) {
    try {
        const data = await minify(src);

        writeFileSync(dest, data);
    }
    catch (e) {
        console.error(`Could not minify ${src} into ${dest}.`);
        console.error(e);
    }
}
