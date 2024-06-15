<template>
	<q-page class="container row justify-center">
		<div class="col-12 col-sm-6 col-md-5">
			<h3>Registrarse</h3>
			<q-form @submit.prevent="handleSubmit">
				<q-input v-model="nombre" label="Introduce nombre de usuario" type="text" 
						:rules="[
							(val) => (val && val.length > 0) || 'En nombre de usuario es obligatorio',
						]">
				</q-input>
				<q-input v-model="email" label="Introduce email" type="text" 
						:rules="[
							(val) => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 
							'Formato de email incorrecto',
						]">
				</q-input>
				<q-select v-model="role" :options="roleOptions" label="Selecciona tipo de usuario"
						:rules="[
							(val) => (val && val !== '') || 'Debe seleccionar un tipo de usuario'
						]">
				</q-select>
				<q-input v-model="password" label="Introduce contraseña" type="password" 
						:rules="[
							(val) => (val && /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,}$$/.test(val)) || 
							'La contraseña debe tener mínimo 6 caracteres y contener al menos 1 mayúscula, 1 minúscula y 1 número'
						]">
				</q-input>
				<q-input v-model="repassword" label="Vuelve a introducir la contraseña" type="password" 
						:rules="[(val) => (val && val === password) || 'Las contraseñas no coinciden']">
				</q-input>
				<div>
					<q-btn label="Entrar" type="submit"></q-btn>						
				</div>
			</q-form>
		</div>
	</q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from '../stores/usuarioStore'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();

const usuarioStore = useUsuarioStore();
const router = useRouter();
const roleOptions = ['TERAPEUTA', 'FAMILIAR'];
const nombre = ref('');
const email = ref('');
const role = ref('');
const password = ref('');
const repassword = ref('');

const handleSubmit = async () => {
	try {
		console.log("pasó las validaciones");
		await usuarioStore.register(nombre.value, email.value, role.value, password.value);
		alertSucccessMessage("El usuario se ha registrado correctamente, ya puede iniciar sesión");
	} 
	catch (error) {
		console.log("error", error);
		alertErrorMessage(error.error);
	}
}

const alertErrorMessage = (message = "Error inesperado en el servidor") => {
	$q.dialog({
		title: 'Error',
		message
	});
};

const alertSucccessMessage = (message = "Operación realizada correctamente") => {
	$q.dialog({
		title: 'OK',
		message: message
	}).onOk(() => {
		return router.push('login');
	});
};

</script>
