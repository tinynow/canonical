<template>
<div>
    <header class="pa1 bg--dark text--light flex">
        <p>songnotes</p>
        <div class="mlauto mr0">
            <template
                v-if="!isLoggedIn"
            >
                <button
                    class="link-style reset-button ph1"
                    type="button"
                    @click="triggerNetlifyIdentityAction('login')"
                >
                    Log in
                </button>
                <button class="link-style reset-button ph1" type="button" @click="triggerNetlifyIdentityAction('signup')">
                    Sign up
                </button>    
            </template>
            <button
                v-else
                class="link-style reset-button ph1"
                type="button"
                @click="triggerNetlifyIdentityAction('logout')"
            >
                Log out
            </button>
        </div>
    </header>
    <router-view />
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('songNotes');

export default {
    name: 'CanonPlaylistApp',
    computed: {
        ...mapGetters({
            isLoggedIn: 'getUserStatus',
            user: 'getUser',
        }),
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            if (vm.isLoggedIn) {
                return next({path: '/songnotes/app', replaceState: true });
            }
        });
    },
    methods: {
        ...mapActions({
            updateUser: 'updateUser',
        }),
        triggerNetlifyIdentityAction(action) {
            const netlifyIdentity = this.$netlifyIdentity;
            if (action === 'login' || action === 'signup') {
                netlifyIdentity.open(action);
                netlifyIdentity.on(action, user => {
                    console.log(user)
                    this.updateUser({
                        currentUser: user,
                    });
                    netlifyIdentity.close();
                    this.$router.push('songnotes/app');
                });
            } else if (action === 'logout') {
                this.updateUser({
                    currentUser: null,
                });
                netlifyIdentity.logout();
                this.$router.push('/');
            }
        },
    },

}
</script>
<style lang="scss">
.netlify-identity-menu {
    text-indent: initial;
    margin: initial;
}
.netlify-identity-item {
    display: inline-block;
    padding: 0 0 0 $space/4;
}
</style>