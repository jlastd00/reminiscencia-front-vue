import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useUsuarioStore } from "../stores/usuarioStore";

export default route(function (/* { store, ssrContext } */) {
	const createHistory = process.env.SERVER
		? createMemoryHistory
		: (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

	const Router = createRouter({
		scrollBehavior: () => ({ left: 0, top: 0 }),
		routes,

		history: createHistory(process.env.VUE_ROUTER_BASE)
	});

	Router.beforeEach(async (to, from, next) => {
		
		const requiredAuth = to.meta.auth;
		const usuarioStore = useUsuarioStore();

		// si existe el token en memoria
		if (usuarioStore.token) {
			return next();
		}

		if (requiredAuth || sessionStorage.getItem('usuario')) {
			await usuarioStore.refreshToken();
			if (usuarioStore.token) {
				return next();
			}
			return next('/login');
		}

		return next();
		
	});
	return Router
})
