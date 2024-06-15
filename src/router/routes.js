const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: 'login', component: () => import('pages/LoginPage.vue') },
			{ path: 'register', component: () => import('pages/RegisterPage.vue') },
			{ 
				path: '', 
				component: () => import('pages/IndexPage.vue'), 
				meta: {
					auth: true
				} 
			},
			{ 
				path: 'protected', 
				component: () => import('pages/ProtectedPage.vue'),
				meta: {
					auth: true
				}
			}
		]
	},
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue')
	}
]

export default routes
