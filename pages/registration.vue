<script setup lang="ts">
import { register as registerFunction } from '@/services/authService'
const { getItem } = useStorage()

const router = useRouter()

const user = ref({
  email: '',
  password: '',
  passwordConfirm: ''
})

const errorMessage = ref('')
const errorFields = ref({
  email: false,
  password: false,
  passwordConfirm: false
})

const resetErrors = () => {
  errorFields.value = {
    email: false,
    password: false,
    passwordConfirm: false
  }
  errorMessage.value = ''
}

const register = async () => {
  resetErrors()

  const { hasEmptyFields, fieldsEmptyState } = emptyValidate<{email: boolean, password: boolean, passwordConfirm: boolean}>(user.value)

  if (hasEmptyFields) {
    errorFields.value = fieldsEmptyState
    errorMessage.value = 'Empty fields' // TODO: Translate
    return
  }

  if (!emailValidate(user.value.email)) {
    errorFields.value.email = true
    errorMessage.value = 'This is not a valid email'
    return
  }

  if (!isEquals(user.value.password, user.value.passwordConfirm)) {
    errorFields.value.passwordConfirm = true
    errorMessage.value = 'Passwords are not the same'
    return
  }

  disableInputs()
  try {
    await registerFunction({ email: user.value.email, password: user.value.password })
    router.push({ name: 'login' }) // TODO: Add notification of success
  } catch (error) {
    // console.log(error) // TODO: Replace with notification
  } finally {
    disableInputs()
  }
}

const isInputsDisabled = ref(false)
const disableInputs = () => {
  isInputsDisabled.value = !isInputsDisabled.value
}

onBeforeMount(() => {
  const token = getItem('token')
  user.value.email = history.state.email
  if (!token) return

  router.push({ name: 'personal' })
})
</script>

<template>
  <!-- TODO: Add translation -->
  <div class="registration-page">
    <CommonVCard class="registration-page__card">
      <span class="registration-page__title">Registration</span>
      <CommonVInput
        v-model="user.email"
        :error="errorFields.email"
        :disabled="isInputsDisabled"
        placeholder="Email"
        class="registration-page__input"
        type="email"
        underlined
        @focus="resetErrors"
      />
      <CommonVInput
        v-model="user.password"
        :error="errorFields.password"
        :disabled="isInputsDisabled"
        placeholder="Password"
        class="registration-page__input"
        type="password"
        underlined
        @focus="resetErrors"
      />
      <CommonVInput
        v-model="user.passwordConfirm"
        :error="errorFields.passwordConfirm"
        :disabled="isInputsDisabled"
        placeholder="Confirm password"
        class="registration-page__input"
        type="password"
        underlined
        @focus="resetErrors"
      />
      <span v-if="errorMessage" class="registration-page__error">{{ errorMessage }}</span>
      <div class="registration-page__buttons">
        <CommonVButton
          :disabled="isInputsDisabled"
          class="registration-page__login-button"
          outlined
          @click="register"
        >
          Sign in
        </CommonVButton>
        <CommonVButton
          :disabled="isInputsDisabled"
          :to="{ name: 'login', state: { login: user.email } }"
        >
          Already have an account?
        </CommonVButton>
      </div>
    </CommonVCard>
  </div>
</template>

<style lang="scss" scoped>
.registration-page {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__card {
    width: clamp(400px, 40%, 600px);

    padding: 48px 32px;

    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__title {
    @include h3;
  }

  &__error {
    align-self: flex-start;
    color: $error;

    margin-top: -4px;
  }

  &__buttons {
    margin-top: 12px;
  }

  &__input {
    height: 50px;
  }

  &__login-button {
    padding: 8px 20px;
  }
}
</style>
