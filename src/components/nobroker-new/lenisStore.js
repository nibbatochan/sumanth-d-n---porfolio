// Holds the page's Lenis instance so step buttons can scroll through it instead of fighting it.
let instance = null;
export const setLenis = (l) => { instance = l; };
export const getLenis = () => instance;
