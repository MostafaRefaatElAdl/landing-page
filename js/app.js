/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 * 
 */
//~getting sections and converting then to pure array 
const mySections = Array.from(document.getElementsByTagName("section"))

//~Get the ul to add to it
const myUL = document.getElementById("navbar__list");

//~Media Query condition
let mediaConditionSmall = window.matchMedia("(min-width: 450px)")

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

//!TODO:README File!!!!

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav

//^Creating li's having a's inside them to navigate between sections
function createNavItems() {
    for (let i = 0; i < mySections.length; i++) {
        //~create li
        const newLi = document.createElement("li");
        //~create a
        const newA = document.createElement("a");
        //~adding style to the a
        newA.classList.add("menu__link");
        //~get section attribute
        const sTitle = mySections[i].getAttribute("data-nav");
        //~get section id
        const sID = mySections[i].getAttribute("id");
        //~Adding text to the a
        newA.textContent = sTitle;
        //~Adding href to the a
        newA.href = `#${sID}`;
        //~add ID to use it later for scrolling
        newA.setAttribute("id", sID);
        //~Adding the a to the li
        newLi.appendChild(newA);
        //~append the li to the Ul
        myUL.appendChild(newLi);
    }
}
// Add class 'active' to section when near top of viewport

//^Assigning and removing active class to the sections
function makeSectionActive() {
    //~Looping over sections
    for (let i = 0; i < mySections.length; i++) {
        //~Get section top
        const mySectionTop = mySections[i].getBoundingClientRect().top;
        //~Get the li's to style it
        const liToChange = document.querySelector(`a#${mySections[i].id}`);
        //~Assigning the active class
        if (mySectionTop >= 0 && mySectionTop <= 300) {
            mySections[i].classList.add("your-active-class");
            liToChange.classList.add("nav-item-active");
        } else {
            mySections[i].classList.remove("your-active-class");
            liToChange.classList.remove("nav-item-active");
        }
    }
}


// Scroll to anchor ID using scrollTO event
//^Creating function for scrolling
function smoothScrollToSection(sectionID) {
    //get section by passed ID from type Section
    sectionToScrollTo = document.querySelector(`section#${sectionID}`);
    sectionToScrollTo.scrollIntoView({
        behavior: 'smooth'
    })
}

//~Media Query for navbar items
function navBarStylingForMobile(mediaCondition, toChange) {
    if (mediaCondition.matches) {
        for (const item of toChange.children) {
            item.style.display = "inline-block";
        }
    } else {
        for (const item of toChange.children) {
            item.style.display = "block";
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

document.addEventListener('DOMContentLoaded', function () {
    // Build menu 
    createNavItems();
    // Scroll to section on link click
    myUL.addEventListener("click", (ev) => {
        //~prevent default to use scrolling
        ev.preventDefault();
        //~get clicked link id to use it to get to the section
        clickedLinkID = ev.path[0].id
        smoothScrollToSection(clickedLinkID)
    });
    //active my section style
    window.addEventListener("scroll",makeSectionActive)
    // Resize makes li's responsive
    window.addEventListener("resize", () => navBarStylingForMobile(mediaConditionSmall, myUL))
});