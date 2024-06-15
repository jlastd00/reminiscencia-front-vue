import { defineStore } from 'pinia'
import { api } from 'src/boot/axios';
import { ref } from 'vue';

export const useUsuarioStore = defineStore('usuario', () => {

	const token = ref(null);
	const expiresIn = ref(null);

	const login = async () => {
		try {
			const res = await api.post("auth/login", {
				email: "maria@email.com",
				password: "Maria12"
			});
			token.value = res.data.token;
			expiresIn.value = res.data.expiresIn;
			sessionStorage.setItem('usuario', 'true');
			setTime();
		} catch (error) {
			console.log(err);
		}
	};

	const logout = async () => {
		try {
			const res = await api.get("auth/logout");
			console.log(res.data);
		} catch (error) {
			console.log(error);
		} finally {
			resetStore();
			sessionStorage.removeItem('usuario');
		}
	}

	const setTime = () => {
		setTimeout(() => {
			refreshToken();
		},
		expiresIn.value * 1000 - 5000)
	};

	const refreshToken = async () => {
		console.log("RefreshToken");
		try {
			const res = await api.get("auth/refresh");
			token.value = res.data.token;
			expiresIn.value = res.data.expiresIn;
			sessionStorage.setItem('usuario', 'true');
			setTime();
		} catch (error) {
			console.log(error);
			sessionStorage.removeItem('usuario');
		}
	};

	const resetStore = () => {
		token.value = null;
		expiresIn.value = null;
	};

	return {
		token,
		expiresIn,
		login,
		refreshToken,
		logout
	};

});

