import { ref, watchEffect } from 'vue'

const widgetShown = ref(false)

export function useFormitable() {
  function showWidget() {
    (FT.widgets.get().element as HTMLElement).style.cssText = ''
  }

  function hideWidget() {
    (FT.widgets.get().element as HTMLElement).style.cssText = 'display: none !important;'
  }

  watchEffect(() => {
    widgetShown.value ? showWidget() : hideWidget()
  })

  return { widgetShown }
}