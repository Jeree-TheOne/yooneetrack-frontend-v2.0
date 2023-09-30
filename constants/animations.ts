export const FADE = 'fade'
export const SLIDE_DOWN = 'slideDown'

export const DEFAULT_ANIMATION_NAME = FADE

export default {
  [FADE]: {
    enter: { opacity: [ 0, 1 ], easing: 'easeInQuart' },
    leave: { opacity: [ 1, 0 ], easing: 'easeOutQuart' }
  },

  [SLIDE_DOWN]: {
    enter: {
      translateY: 20,
      opacity: [ 0, 1 ],
      easing: 'linear'
    },
    leave: {
      translateY: 0,
      opacity: [ 1, 0 ],
      easing: 'linear'
    }
  }
}
