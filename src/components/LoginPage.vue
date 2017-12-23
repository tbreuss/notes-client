<template>
    <div class="login">
        <h4>Login</h4>
        <div class="form-group">
            <label for="username">Benutzername</label>
            <input v-model="form.username" type="text" :class="getClass('username')" id="username">
        </div>
        <div class="form-group">
            <label for="password">Passwort</label>
            <input v-model="form.password" :class="getClass('password')" type="password" id="password">
        </div>
        <button type="button" class="btn btn-primary" @click="login" ref="loginBtn">Login</button>
        {{ errors }}
    </div>
</template>

<script>
    import {HTTP} from '../http';

    export default {
        name: 'LoginPage',
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                formSent: false,
                errors: []
            }
        },
        methods: {
            login() {
                var config = {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }
                HTTP.post('/auth/login', this.form, config)
                    .then(response => {
                        this.$refs.loginBtn.disabled = false
                        var success = response.data.success
                        if (success) {
                            alert('Logged in')
                        } else {
                            this.errors = response.data.errors
                        }
                    })
                    .catch(e => {
                        console.error(e)
                    })
            },
            getClass(field) {
                if (!this.formSent) {
                    return 'form-control'
                }
                if (field in this.errors) {
                    return 'form-control is-invalid'
                }
                return 'form-control is-valid'
            }
        }
    }
</script>

<style scoped>

</style>
