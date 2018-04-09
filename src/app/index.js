import 'babel-polyfill';
import 'styles/main.css';

import 'modules/three';

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
        this.clock = new THREE.Clock(true);
        this.loadModule()
            .then(this.update);
    }

    update = () => {
        requestAnimationFrame(this.update);
        this.module.draw(this.startTime);
    }

    loadModule = () => {
        const num = window.location.hash.substr(1) || 1;
        return getComponent(num)
            .then((mod) => {
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

