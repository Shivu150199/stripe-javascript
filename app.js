import sublinks from './data.js'

const toggleBtn = document.querySelector('.toggle-btn')

const closeBtn = document.querySelector('.close-btn')
const sideBarWrapper = document.querySelector('.sidebar-wrapper')
const sidebar = document.querySelector('.sidebar-links')
const linkBtns = [...document.querySelectorAll('.link-btn')]
const submenu = document.querySelector('.submenu')
const hero=document.querySelector('.hero')
const nav=document.querySelector('.nav')

// toggle button functionality
toggleBtn.addEventListener('click', () => {
  sideBarWrapper.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  sideBarWrapper.classList.remove('show')
})

//sidebar link

sidebar.innerHTML = sublinks
  .map((item) => {
    const { links, page } = item
    return `
 <article>
            <h4>${page}</h4>
            <div class="sidebar-sublinks">
             ${links
               .map((link) => {
                 const { url, label, icon } = link
                 return `
            <a href=${url}><i class="${icon}"></i>  ${label}</a>
            `
               })
               .join('')}
            </div>
          </article>
`
  })
  .join('')

//   full page links buttons

linkBtns.forEach((btn) => {
  btn.addEventListener('mouseover', (e) => {
    const text = e.currentTarget.textContent

    const tempBtn = e.currentTarget.getBoundingClientRect()
    
    const center = (tempBtn.left + tempBtn.right) / 2
    const bottom = tempBtn.bottom 

    const tempPage = sublinks.find((link) => link.page === text)

    if (tempPage) {
      const { page, links } = tempPage
      submenu.classList.add('show')
      submenu.style.left = `${center}px`
      submenu.style.top = `${bottom}px`

      let columns = 'col-2'
      if (links.length === 3) {
        columns = 'col-3'
      }
      if (links.length > 3) {
        columns = 'col-4'
      }

      submenu.innerHTML = `
 <section>
        <h4>${page}</h4>
        <div class="submenu-center ${columns}">
       ${links
         .map((item) => {
           const { icon, label, url } = item
           return `<a href=${url}> <i class="${icon}"></i>${label}</a>`
         })
         .join('')}
        </div>
      </section>
`
    }
  })
})



hero.addEventListener('mouseover',()=>{
  submenu.classList.remove('show');
})

nav.addEventListener('mouseover',(e)=>{
  if(!e.target.classList.contains('link-btn')){
    submenu.classList.remove('show')
  }
})