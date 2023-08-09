import { ref, watchEffect } from 'vue'

const widgetShown = ref(false)

export function useFormitable() {
  const widgetReady = ref(false)

  // @ts-ignore
  if (window.formitableWidgetReady) {
    // Widget is already loaded
    console.log('FT WIDGET READY')
    widgetReady.value = true
  } else {
    // Widget is not yet loaded, so we set an eventlistener to wait for it
    window.addEventListener('ft-widget-ready ', () => {
      console.log('FT WIDGET READY EVENT FIRED')
      widgetReady.value = true
    })
  }

  function showWidget() {
    ;(FT.widgets.get().element as HTMLElement).style.cssText = ''
  }

  function hideWidget() {
    ;(FT.widgets.get().element as HTMLElement).style.cssText = 'display: none !important;'
  }

  watchEffect(() => {
    if (widgetReady.value) {
      widgetShown.value ? showWidget() : hideWidget()
    }
  })

  return { widgetShown }
}
