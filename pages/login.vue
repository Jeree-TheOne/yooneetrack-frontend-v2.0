<script setup lang="ts">
import StorageService from '@/services/storageService'
import AuthService from '@/services/authService'

const router = useRouter()

const user = ref({
  login: '',
  password: ''
})
const remember = ref(false)

const errorMessage = ref('')
const errorFields = ref({
  login: false,
  password: false
})

const resetErrors = () => {
  errorFields.value = {
    login: false,
    password: false
  }
  errorMessage.value = ''
}

const login = async () => {
  resetErrors()
  const { hasEmptyFields, fieldsEmptyState } = emptyValidate<{login: boolean, password: boolean}>(user.value)

  if (hasEmptyFields) {
    errorFields.value = fieldsEmptyState
    errorMessage.value = 'Empty fields' // TODO: Translate
    return
  }

  disableInputs()
  const loginData = await AuthService.login(user.value)
  if (remember.value) StorageService.setItem('login', user.value)
  disableInputs()
  if (!loginData) return // TODO: Add notification on failed login
  router.push({ name: 'personal' })
}

const isInputsDisabled = ref(false)
const disableInputs = () => {
  isInputsDisabled.value = !isInputsDisabled.value
}

onBeforeMount(() => {
  const token = StorageService.getItem('token')
  user.value.login = history.state.login
  if (StorageService.getItem('login')) {
    user.value = StorageService.getItem('login')
    remember.value = true
  }
  if (!token) return

  router.push({ name: 'personal' })
})
</script>

<template>
  <!-- TODO: Add translation -->
  <div class="login-page">
    <CommonVCard class="login-page__card">
      <span class="login-page__title">Authorization</span>
      <CommonVInput
        v-model="user.login"
        :error="errorFields.login"
        :disabled="isInputsDisabled"
        placeholder="Email/Login"
        class="login-page__input"
        underlined
        @focus="resetErrors"
      />
      <CommonVInput
        v-model="user.password"
        :error="errorFields.password"
        :disabled="isInputsDisabled"
        placeholder="Password"
        class="login-page__input"
        type="password"
        underlined
        @focus="resetErrors"
      />
      <span v-if="errorMessage" class="login-page__error">{{ errorMessage }}</span>
      <div class="login-page__actions">
        <CommonVCheckbox
          v-model="remember"
          :disabled="isInputsDisabled"
          class="login-page__remember"
        >
          Remember me
        </CommonVCheckbox>
        <CommonVButton
          :disabled="isInputsDisabled"
          class="login-page__forgot"
          :to="{ name: 'forgot', state: { login: user.login } }"
        >
          Forgot your password?
        </CommonVButton>
      </div>
      <div class="login-page__buttons">
        <CommonVButton
          :disabled="isInputsDisabled"
          class="login-page__login-button"
          outlined
          @click="login"
        >
          Log in
        </CommonVButton>
        <CommonVButton
          :disabled="isInputsDisabled"
          :to="{ name: 'registration', state: { email: user.login } }"
        >
          Not registered yet?
        </CommonVButton>
      </div>
    </CommonVCard>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
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

  &__actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
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

  &__forgot {
    @include set-prop-states-values(color, $gray-600, $green-600);
  }
}
</style>
