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

// reference to all section tag elements in the page
let sections = document.getElementsByTagName('section')

// adds a new section element to the page when called
const addSection = () => {
    const section = document.createElement('section')
    section.id = `section${sections.length + 1}`
    section.dataset.nav = `Section ${sections.length + 1}`
    section.innerHTML = `
    <div class="landing__container">
                    <h2>Section ${sections.length + 1}</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi fermentum metus faucibus lectus pharetra dapibus.
                        Suspendisse potenti. Aenean aliquam elementum mi, ac
                        euismod augue. Donec eget lacinia ex. Phasellus
                        imperdiet porta orci eget mollis. Sed convallis
                        sollicitudin mauris ac tincidunt. Donec bibendum, nulla
                        eget bibendum consectetur, sem nisi aliquam leo, ut
                        pulvinar quam nunc eu augue. Pellentesque maximus
                        imperdiet elit a pharetra. Duis lectus mi, aliquam in mi
                        quis, aliquam porttitor lacus. Morbi a tincidunt felis.
                        Sed leo nunc, pharetra et elementum non, faucibus vitae
                        elit. Integer nec libero venenatis libero ultricies
                        molestie semper in tellus. Sed congue et odio sed
                        euismod.
                    </p>

                    <p>
                        Aliquam a convallis justo. Vivamus venenatis, erat eget
                        pulvinar gravida, ipsum lacus aliquet velit, vel luctus
                        diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus
                        purus. Vestibulum fermentum consectetur porttitor.
                        Suspendisse imperdiet porttitor tortor, eget elementum
                        tortor mollis non.
                    </p>
                </div>
    `
    // insert it at the bottom of the sections
    sections[sections.length - 1].after(section)
}


const changeNavStyle = () => {
    // display navbar elements in a centered way without block display
    const navbarList = document.getElementById('navbar__list');
    navbarList.style.cssText = " \
    display: flex; \
    justify-content: center; \
    "
    navbarList.appendChild(createNavItems())
}


// adding navbar elements and sets the events for them and for the sections
const createNavItems = () => {
    const navItems = document.createDocumentFragment()
    for (let i = 0; i < sections.length; i++) {
        const li = document.createElement('li')
        li.className = "menu__link"
        li.style.cursor = "pointer"

        // an event that determines when an element is active on the viewport
        window.addEventListener('scroll', () => {
            const bounding = sections[i].getBoundingClientRect();
            if (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                sections[i].className = "active"
            } else {
                sections[i].className = ""
            }
        })

        // an event that moves to a the corresponding section when a navbar element is clicked
        li.addEventListener('click', () => {
            sections[i].scrollIntoView()
        })
        li.innerText = sections[i].dataset.nav
        navItems.appendChild(li)
    }
    return navItems
}


addSection()
changeNavStyle()
createNavItems()