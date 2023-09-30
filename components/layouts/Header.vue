<script setup lang="ts">
import User from '@/models/User'
const { $event } = useNuxtApp()
const router = useRouter()
const props = defineProps({
  workspace: {
    type: String,
    default: null
  }
})

const user = inject<User>('user', {} as User)

const isMenuOpen = ref(false)
const toggleMenu = (isOpen: boolean) => {
  isMenuOpen.value = isOpen
}

const changeTheme = (value: boolean) => {
  $event('theme-change', value)
}
</script>

<template>
  <!-- TODO: TRANSLATE ALLLLLL -->
  <div class="header">
    <CommonVButton :to="{ name: 'personal' }" class="header__brand">
      <CommonVIcon
        name="logoIcon"
        :size="44"
      />
      <span class="header__brand-name">YooneeTrack</span>
    </CommonVButton>
    <span class="header__workspace-name">{{ workspace || 'Personal tasks' }}</span>
    <CommonVMenu
      right
      card-wrapper-class="header__card-wrapper"
      card-class="header__card"
      @toggle="toggleMenu"
    >
      <template #activator="{ attrs }">
        <CommonVButton
          text
          class="header__menu"
          v-bind="attrs"
        >
          <CommonVImage :path="user.avatar" />
        </CommonVButton>
      </template>
      <div class="header__menu-items">
        <span class="header__menu-title">Account</span>
        <div class="header__menu-info">
          <CommonVImage
            :size="48"
            class="header__menu-avatar"
            :path="user.avatar"
          />
          <div class="header__menu-name-and-login">
            <span class="header__menu-name">{{ user.firstName && user.secondName ? `${user.firstName} ${user.secondName}` : user.email }} </span>
            <span class="header__menu-login">@{{ user.login }}</span>
          </div>
        </div>
        <CommonVButton
          text
          :to="{ name: 'profile' }"
          class="header__menu-item"
        >
          Manage profile
        </CommonVButton>
        <CommonVDivider />
        <CommonVButton
          text
          :to="{ name: 'personal' }"
          class="header__menu-item"
        >
          Personal tasks
        </CommonVButton>
        <CommonVButton
          text
          class="header__menu-item"
          @click.stop
        >
          <CommonVSwitch
            class="header__menu-theme"
            @switch="changeTheme"
            @click.stop
          >
            Theme
          </CommonVSwitch>
        </CommonVButton>
        <CommonVButton
          text
          class="header__menu-item"
        >
          Create new workspace
        </CommonVButton>
        <CommonVDivider />
        <CommonVButton
          :to="{ name: 'profile' }"
          class="header__menu-item"
        >
          Log out
        </CommonVButton>
      </div>
    </CommonVMenu>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__brand {
    height: fit-content;
    padding: 0;
    text-decoration: none;
    width: 320px;
    display: flex;
    justify-content: center;

    margin-left: 8px;

    gap: 12px;

    &-name {
      background: -webkit-linear-gradient(320deg, $green-600, $torquoise-600);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      @include h3;
      font-family: $font-family-brand;
    }
  }

  &__workspace-name {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  &__menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    gap: 12px;

    padding-right: 16px;

    height: 48px;

    @include set-prop-states-values(color, $gray-0, $torquoise-400);

    &-expand-icon {
      &--reverse {
        transform: rotate(180deg);
        transition-duration: 250ms;
      }
    }

    &-title {
      align-self: start;
      margin-bottom: 8px;
      padding: 0 14px;

      @include h6;
    }

    &-info {
      display: flex;
      gap: 12px;
      padding: 0 14px;

      align-items: center;
      justify-content: center;
    }

    &-name-and-login {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &-name {
      @include caption-1;
    }

    &-login {
      color: $gray-500;
      @include caption-1;
    }

    &-items {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      gap: 4px;

      width: 100%;
    }

    &-theme {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
    }

    &-item {
      display: flex;
      justify-content: flex-start;
      width: 100%;

      text-decoration: none;

      @include set-prop-states-values(color, $gray-0, $green-400)
    }
  }

  &__workspace-name {
    max-width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;

    @include h5;
    font-weight: 400;
  }

  &:deep(.header__card-wrapper) {
    padding-right: 4px;
    margin-top: -12px;
    width: fit-content;
  }

  &:deep(.header__card) {
    padding: 16px;
  }
}
</style>
