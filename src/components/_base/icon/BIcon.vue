<script lang="ts">
import { defineComponent, PropType, h } from "vue";
import { SizeEnum, sizeValidator, getSvgIcon } from "./BIcon";

export default defineComponent({
  inheritAttrs: false,
  render() {
    let iconName = this.$slots.default ? (this.$slots.default()[0].children as string) : this.icon;

    if (!iconName) {
      return null;
    }

    iconName = iconName.trim();

    return h("span", {
      ...this.$attrs,
      class: [
        "b-icon--custom b-icon",
        "b-icon--" + this.size,
        // use 'default' color value for svg with multiple colors
        this.color === "default" ? "b-icon--custom-default" : this.color && `${this.color}--text`,
        this.$attrs.class,
      ],
      innerHTML: getSvgIcon(`${iconName}.svg`),
    });
  },
  props: {
    icon: String,
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.MEDIUM,
      validator: sizeValidator,
    },
    color: String,
  },
});
</script>

<style lang="scss">
.b-icon {
  cursor: inherit;
  user-select: none;
}

button {
  .b-icon--custom.b-icon svg {
    vertical-align: text-bottom;
  }

  &:disabled .b-icon {
    color: inherit;
  }
}

.b-icon--custom:not(.b-icon--custom-default) svg {
  path,
  use path {
    fill: currentColor;
  }
}

.b-icon--custom.b-icon {
  &--medium svg {
    width: 16px;
    height: 16px;
  }

  &--large svg {
    width: 24px;
    height: 24px;
  }

  &--x-large svg {
    width: 32px;
    height: 32px;
  }
}
</style>
