<template>
  <header class="d-flex w-100 primary header">
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <h2>
      Agent
      <span class="blue--text">Tenant</span>
    </h2>
    <HeaderMenu />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderMenu from "./HeaderMenu.vue";

export default defineComponent({
  components: {
    HeaderMenu,
  },
});
</script>

<style lang="scss">
$side-desktop: 250px;
$side-mobile: 280px;

.header {
  padding: space(2);
  position: fixed;
  z-index: 7;
  top: 0;

  @media screen and (max-width: 780px) {
    align-items: center;
  }
}

#menu__toggle {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;

  &:checked {
    ~ .menu__btn--mobile {
      // @media screen and (max-width: 780px) {
      display: block;
      pointer-events: all;
      // }
    }
    ~ .content-container .diagram-popper {
      transform: translateX(-300%);
    }

    ~ .content-container {
      transform: translateX(#{$side-desktop});
      -webkit-transition: -webkit-transform 0.5s ease-in-out;
      will-change: transform;

      @media screen and (max-width: 780px) {
        transform: translateX(#{$side-mobile});
      }

      .header {
        .menu__btn {
          > span {
            transform: rotate(45deg);
            transform-origin: left;
            background-color: #fff;
            &::before {
              top: 0;
              transform: rotate(0deg);
            }
            &::after {
              top: 0;
              transform: rotate(90deg);
            }
          }
        }
      }
    }

    ~ {
      .menu__box {
        min-width: #{$side-desktop};
        transform: translateX(0%);

        @media screen and (max-width: 780px) {
          min-width: #{$side-mobile};
        }

        & > * {
          transform: translateX(0%);
          width: 100%;
        }
      }
    }
  }
}

.menu {
  &__btn {
    position: relative;
    width: 26px;
    height: 26px;
    cursor: pointer;
    z-index: 1;
    margin-right: space(2);
    padding-top: 3px;

    > span {
      display: block;
      position: absolute;
      width: 100%;
      height: 3px;
      border-radius: space(1);
      background-color: color(bg-dark);
      transition-duration: 0.5s;
      &::before {
        display: block;
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: space(1);
        background-color: color(bg-dark);
        -webkit-transform: translate3d(0px, 0px, 0px);
        -webkit-transition: -webkit-transform 0.5s ease-in-out;
        transition-duration: 0.5s;
        content: "";
        bottom: space(-2);
      }
      &::after {
        display: block;
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: space(1);
        background-color: color(bg-dark);
        -webkit-transform: translate3d(0px, 0px, 0px);
        -webkit-transition: -webkit-transform 0.5s ease-in-out;
        transition-duration: 0.5s;
        content: "";
        top: space(1);
      }
    }

    &--mobile {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: color(overlay);
      opacity: 0.6;
      z-index: 6;
      display: none;
      pointer-events: none;
    }
  }

  &__box {
    transform: translateX(-100%);
    width: 0;
    height: 100vh;
    margin: 0;
    padding-top: 60px;
    background-color: color(bg-dark);
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
    transition-duration: 0.2s;
    position: fixed;
    z-index: 8;

    & > * {
      transform: translateX(-100%);
      overflow: hidden;
      width: 0;
    }

    &--wrapper {
      padding: 0 space(2);
    }
  }
}
</style>
