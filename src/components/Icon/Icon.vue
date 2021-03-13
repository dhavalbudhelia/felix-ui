<template>
  <i :class="iconClass" aria-hidden="true"></i>
</template>

<script>
export default {
  name: 'fe-icon',
  props: {
    iconPack: {
      type: String,
      default: 'fas',
      validator: function (value) {
        return ['fas', 'far', 'fab'].includes(value);
      },
    },
    icon: {
      type: String,
    },
    size: {
      type: String,
      default: 'is-md',
      validator: function (value) {
        return ['is-xs', 'is-sm', 'is-md', 'is-lg', 'is-2x', 'is-3x', 'is-5x', 'is-7x', 'is-10x'].includes(value);
      }
    }
  },
  computed: {
    /**
     * compute icons size class
     * @return {string}
     */
    iconSizeClass() {
      switch (this.size) {
        case 'is-xs':
          return 'fa-xs';
        case 'is-sm':
          return 'fa-sm';
        case 'is-md':
          return 'fa-sm';//because fa-md doesn't exist
        case 'is-lg':
          return 'fa-lg';
        case 'is-2x':
          return 'fa-2x';
        case 'is-3x':
          return 'fa-3x';
        case 'is-5x':
          return 'fa-5x';
        case 'is-7x':
          return 'fa-7x';
        case 'is-10x':
          return 'fa-10x';
        default:
          return 'fa-sm';
      }
    },
    /**
     * icon class object
     * @return {string}
     */
    iconClass() {
      return (this.icon) ? `${this.iconSizeClass} ${this.iconPack} fa-${this.icon}` : '';
    }
  }
}
</script>
