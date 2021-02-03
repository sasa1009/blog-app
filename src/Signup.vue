<template>
  <form @submit.prevent="submit">
    <FormInput type="text" name="Username" v-model="username" :error="usernameStatus.message" />
    <FormInput type="password" name="Password" v-model="password" :error="passwordStatus.message" />
    <button class="button is-primary" :disabled="!usernameStatus.valid || !passwordStatus.valid">Submit</button>
  </form>
</template>

<script lang="ts">
import { required, length, validate, Status } from './validators'
import { computed, defineComponent, ref } from 'vue'
import FormInput from "./FormImput.vue"
import { User } from './Types'
import { useStore } from './store'
import { useModal } from './useModal'

export default defineComponent({
  components: {
    FormInput
  },

  setup () {
    const username = ref('username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [ required(), length({ min: 5, max: 10 })])
    })

    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [ required(), length({ min: 10, max: 40 })])
    })

    const store = useStore()
    const modal = useModal()

    const submit = async (e: any) => {
      if (!usernameStatus.value.valid || !passwordStatus.value.valid) {
        return
      }

      const user: User = {
        id: -1,
        username: username.value,
        password: password.value
      }

      store.createUser(user)
      modal.hideModal()
    }

    return {
      username,
      usernameStatus,
      password,
      passwordStatus,
      submit
    }
  }
})
</script>

<style scoped>
form {
  background: white;
  padding: 15px;
}
</style>
