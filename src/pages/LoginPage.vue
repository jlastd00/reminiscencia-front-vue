<template>
	<h1>Login - {{ usuarioStore.token }}</h1>
</template>

<script setup>

import { useUsuarioStore } from '../stores/usuarioStore'

const usuarioStore = useUsuarioStore();

</script>
