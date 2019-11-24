const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg) => {
            pg.addEventListener('show', app.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach ((link) => {
            link.addEventListener('click', app.nav); //Dla więcej niż jednej strony "nav-link" będzie klasą obiektów nawigacji
        })
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin)
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
         //W przypadku istnienia więcej niż 1 strony, "data-target" będzie nową właściwością z wartością, która jest nazwą id strony (np. strona ma id "oNas", to "data-target="oNas")
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'is displaying')
        //aktywuje się przy zmianie strony
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event')
        //Aktywuje sie przy kliknięciu nawigacji
        //Coś tam, żeby nieistniejąca strona się ładowała przy powrocie
        let hash = location.hasg.replace('#', '');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);