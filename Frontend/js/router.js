export default class Router {
  constructor(routes, onRouteChange) {
    this.routes = routes;
    this.rootElem = document.getElementById('app');
    this.onRouteChange = onRouteChange || (() => {});
    this.handleRoute();

    window.addEventListener('popstate', () => this.handleRoute());
    document.body.addEventListener('click', e => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigate(e.target.getAttribute('href'));
      }
    });
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const { route, params } = this.matchRoute(path);
    if (route) {
      route.template(params);
    } else {
      this.rootElem.innerHTML = '<h2>404 Not Found</h2>';
    }
    this.onRouteChange();
  }

  matchRoute(path) {
    for (const route of this.routes) {
      const routeParts = route.path.split('/').filter(Boolean);
      const pathParts = path.split('/').filter(Boolean);
      if (routeParts.length !== pathParts.length) continue;
      let params = {};
      let matched = true;
      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          params[routeParts[i].slice(1)] = pathParts[i];
        } else if (routeParts[i] !== pathParts[i]) {
          matched = false;
          break;
        }
      }
      if (matched) return { route, params };
    }
    return {};
  }
}
