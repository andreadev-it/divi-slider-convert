var convertToSlider = (function () {
    
    /**
    * This function will change the structure of a Divi row to adapt it to the BlazeSlider
    * Original structure: .et_pb_row > .et_pb_column
    * Target structure:   .blaze-slider > .blaze-container > .blaze-track-container > .blaze-track > slides
    */
    function adaptRowStructure(row : HTMLElement) {
        let blazeContainer = document.createElement('div');
        blazeContainer.classList.add('blaze-container');
        let blazeTrackContainer = document.createElement('div');
        blazeTrackContainer.classList.add('blaze-track-container');
        let blazeTrack = document.createElement('div');
        blazeTrack.classList.add('blaze-track');

        blazeContainer.appendChild(blazeTrackContainer);
        blazeTrackContainer.appendChild(blazeTrack);

        let slides = [...row.children];
        
        let rgxpFindColSize = new RegExp('et_pb_column_._.');
        for (let slide of slides) {

            let results = rgxpFindColSize.exec(slide.className);
            if (!results) continue;

            let colSize = results[0];
            slide.classList.remove('et_pb_column', colSize);
            blazeTrack.appendChild(slide);
        }

        row.appendChild(blazeContainer);
    }

    /**
    * This function will change the structure of a Divi column to adapt it to the BlazeSlider
    * Original structure: .et_pb_column > .et_pb_module
    * Target structure:   .blaze-slider > .blaze-container > .blaze-track-container > .blaze-track > slides
    */
    function adaptColumnStructure(column : HTMLElement) {
        let blazeContainer = document.createElement('div');
        blazeContainer.classList.add('blaze-container');
        let blazeTrackContainer = document.createElement('div');
        blazeTrackContainer.classList.add('blaze-track-container');
        let blazeTrack = document.createElement('div');
        blazeTrack.classList.add('blaze-track');

        blazeContainer.appendChild(blazeTrackContainer);
        blazeTrackContainer.appendChild(blazeTrack);

        let slides = [...column.children];
        
        for (let slide of slides) {
            blazeTrack.appendChild(slide);
        }

        column.appendChild(blazeContainer);
    }

    /**
    * This function will change the structure of a Divi blog adapt it to the BlazeSlider
    * Original structure: .et_pb_posts > .et_pb_ajax_pagination_container > article.et_pb_post
    * Target structure:   .blaze-slider > .blaze-container > .blaze-track-container > .blaze-track > slides
    */
    function adaptBlogStructure(blog : HTMLElement) {
        // Create necessary items
        let blazeContainer = blog.querySelector('.et_pb_ajax_pagination_container')!;
        blazeContainer.classList.add('blaze-container');
        let blazeTrackContainer = document.createElement('div');
        blazeTrackContainer.classList.add('blaze-track-container');
        let blazeTrack = document.createElement('div');
        blazeTrack.classList.add('blaze-track');

        // Remove blog pagination
        let pagination = blog.querySelector(".et_pb_ajax_pagination_container > div");
        if (pagination)
            blazeContainer.removeChild(pagination);

        // Transfer slides to blazeTrack
        let slides = [...blazeContainer.children];

        for (let slide of slides) {
            blazeTrack.appendChild(slide);
        }
        
        // Combine everything together
        blazeContainer.appendChild(blazeTrackContainer);
        blazeTrackContainer.appendChild(blazeTrack);

        blog.appendChild(blazeContainer);
    }


    /**
    * This function will change the structure of a Divi section to adapt it to the BlazeSlider
    * Original structure: .et_pb_section > .et_pb_row
    * Target structure:   .blaze-slider > .blaze-container > .blaze-track-container > .blaze-track > slides
    */
    function adaptSectionStructure(section : HTMLElement) {
        let blazeContainer = document.createElement('div');
        blazeContainer.classList.add('blaze-container');
        let blazeTrackContainer = document.createElement('div');
        blazeTrackContainer.classList.add('blaze-track-container');
        let blazeTrack = document.createElement('div');
        blazeTrack.classList.add('blaze-track');

        blazeContainer.appendChild(blazeTrackContainer);
        blazeTrackContainer.appendChild(blazeTrack);

        let slides = [...section.children];
        
        for (let slide of slides) {
            blazeTrack.appendChild(slide);
        }

        section.appendChild(blazeContainer);
    }

    /**
    * Add the pagination structure to the slider
    */
    function addPagination(slider : HTMLElement) {
        let template = document.createElement("template");
        template.innerHTML = `
            <div class="custom-pagination">
                <button class="blaze-prev" aria-label="Slide precedente">4</button>
                <div class="blaze-pagination"></div>
                <button class="blaze-next" aria-label="Slide successiva">5</button>
            </div>
        `;

        let clone = template.content.cloneNode(true) as DocumentFragment;
        let pagination = clone.children[0];
        let container = slider.querySelector('.blaze-container')!;
        container.appendChild(pagination);
    }

    /**
    * Transform a Divi element to a slider
    */
    let convertToSlider = function (element : HTMLElement | string, options : object, pagination = false) {

        let sliderElement : HTMLElement | null;
        if (typeof(element) == "string") {
            sliderElement = document.querySelector(element);
            if (sliderElement == null) {
                throw new Error(`Cannot find html node with selector "${element}".`);
            }
        }
        else {
            sliderElement = element;
        }

        if (!sliderElement.classList.contains('blaze-slider')) {
            sliderElement.classList.add('blaze-slider');
        }

        let type : string = "";

        if (sliderElement.classList.contains('et_pb_section')) type = "section";
        else if (sliderElement.classList.contains('et_pb_row')) type = "row";
        else if (sliderElement.classList.contains('et_pb_posts')) type = "blog";
        else if (sliderElement.classList.contains('et_pb_column')) type = "column";

        switch (type) {
            case 'section':
                adaptSectionStructure(sliderElement);
                break;
            case 'row':
                adaptRowStructure(sliderElement);
                break;
            case 'column':
                adaptColumnStructure(sliderElement);
                break;
            case 'blog':
                adaptBlogStructure(sliderElement);
                break;
        }

        if (pagination) addPagination(sliderElement);

        // @ts-ignore
        new BlazeSlider(sliderElement, options);
    }

    return convertToSlider;
})();
