import { ref, watchEffect } from 'vue'

const widgetShown = ref(false)
const widgetReady = ref(false)

export function useFormitable() {
  console.log('RUNNING useFormitable')

  // @ts-ignore
  if (window.formitableWidgetReady) {
    // Widget is already loaded
    widgetReady.value = true
  } else {
    // Widget is not yet loaded, so we set an eventlistener to wait for it
    window.addEventListener('ft-widget-ready', () => {
      console.log('ft-widget-ready HANDLER RUNNING')
      widgetReady.value = true
    })
  }

  function showWidget() {
    // @ts-ignore
    ;(FT.widgets.get().element as HTMLElement).style = ''
  }

  function hideWidget() {
    // @ts-ignore
    ;(FT.widgets.get().element as HTMLElement).style = 'display: none !important;'
  }

  watchEffect(() => {
    if (widgetReady.value) {
      widgetShown.value ? showWidget() : hideWidget()
    }
  })

  return { widgetShown }
}
