<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title> Reminiscencia App </q-toolbar-title>

				<q-btn color="dark" to="/" v-if="usuarioStore.token">Inicio</q-btn>
				<q-btn color="orange" to="/protected" v-if="usuarioStore.token">Protected</q-btn>
				<q-btn class="q-mr-sm" color="green" to="/login" v-if="!usuarioStore.token">Iniciar sesion</q-btn>
				<q-btn color="green" to="/register" v-if="!usuarioStore.token">Registrarse</q-btn>
				<q-btn color="red" @click="logout" v-if="usuarioStore.token">Cerrar sesión</q-btn>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<q-list>
				<q-item-label header> Essential Links </q-item-label>

				<EssentialLink
					v-for="link in linksList"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useUsuarioStore } from "../stores/usuarioStore";
import { useRouter } from "vue-router";

const leftDrawerOpen = ref(false);
const usuarioStore = useUsuarioStore();
const router = useRouter();

const logout = async () => {
	await usuarioStore.logout();
	router.push('/login');
}

const login = async () => {
	await usuarioStore.login();
	router.push('/');
}

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}

const linksList = [
	{
		title: "Docs",
		caption: "quasar.dev",
		icon: "school",
		link: "https://quasar.dev",
	},
	{
		title: "Github",
		caption: "github.com/quasarframework",
		icon: "code",
		link: "https://github.com/quasarframework",
	},
	{
		title: "Discord Chat Channel",
		caption: "chat.quasar.dev",
		icon: "chat",
		link: "https://chat.quasar.dev",
	},
	{
		title: "Forum",
		caption: "forum.quasar.dev",
		icon: "record_voice_over",
		link: "https://forum.quasar.dev",
	},
	{
		title: "Twitter",
		caption: "@quasarframework",
		icon: "rss_feed",
		link: "https://twitter.quasar.dev",
	},
	{
		title: "Facebook",
		caption: "@QuasarFramework",
		icon: "public",
		link: "https://facebook.quasar.dev",
	},
	{
		title: "Quasar Awesome",
		caption: "Community Quasar projects",
		icon: "favorite",
		link: "https://awesome.quasar.dev",
	},
];

</script>
