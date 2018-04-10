import 'babel-polyfill';
import 'styles/main.css';
import 'modules/three';

// Utils

const timeoutPromise = () => new Promise((resolve) => setTimeout(resolve, 1000));

const addClass = (el, className) => {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

const removeClass = (el, className) => {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}


async function getComponent(num) {
    const n = num < 10 ? `0${num}` : num;
    const module = await import(/* webpackChunkName: "loop" */ `./loops/${n}.js`);

    return module;
}

class Main {
    constructor() {

        window.addEventListener('hashchange', async e => {
            this.reload();
        })
        this.startTime = 0;
        this.mainElement = document.querySelector('main');
        this.loader = document.querySelector('.loader');
        this.clock = new THREE.Clock(true);
        this.loadModule()
            .then(this.update);
    }

    update = () => {
        requestAnimationFrame(this.update);
        this.module.draw(this.startTime);
    }

    setLoading = () => addClass(this.loader, 'loading');
    unsetLoading = () => removeClass(this.loader, 'loading');

    loadModule = () => {
        const num = window.location.hash.substr(1) || 1;
        this.setLoading();
        return Promise.all([
            timeoutPromise(),
            getComponent(num),
        ])
            .then(([_, mod]) => {
                this.unsetLoading();
                this.module = mod; 
                this.mainElement.appendChild(this.module.canvas);
            });
    }

    reload = async () => {
        console.log('clean stuff up');
        // Clean stuff here
        if (this.module && this.module.canvas) {
            this.mainElement.removeChild(this.module.canvas);
        }
        this.loadModule()
            .then(() => {
                this.startTime = this.clock.getElapsedTime();
            });
    }
}

new Main();

