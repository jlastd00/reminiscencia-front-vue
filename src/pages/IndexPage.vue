<template>
	<q-page padding>
		<!-- <q-btn @click="usuarioStore.login">Iniciar sesión</q-btn> -->
		<q-btn @click="getPacientes">Lista pacientes</q-btn>
		<!-- <q-btn @click="usuarioStore.logout">Cerrar sesión</q-btn> -->
		{{ usuarioStore.token }} - {{ usuarioStore.expiresIn }}
	</q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useUsuarioStore } from '../stores/usuarioStore'

const usuarioStore = useUsuarioStore();

//usuarioStore.refreshToken();

const getPacientes = () => { 
	api({
		method: 'GET',
		url: 'pacientes',
		headers: {
			Authorization: `Bearer ${usuarioStore.token.value}`
		}
	}).then(res => {
		console.log(res.data);

	}).catch(err => console.log(err))
};


</script>
