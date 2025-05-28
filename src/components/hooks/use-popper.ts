import { ref, onMounted, onBeforeUnmount, watch, Ref } from 'vue';
import { createPopper, Instance, Options } from '@popperjs/core';

export interface UsePopperOptions {
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end';
  offset?: [number, number];
  arrow?: boolean;
  arrowOffset?: number;
  appendToBody?: boolean;
  popperOptions?: Partial<Options>;
}

export function usePopper(
  referenceEl: Ref<HTMLElement | null>,
  popperEl: Ref<HTMLElement | null>,
  options: UsePopperOptions = {}
) {
  const visible = ref(false);
  let popperInstance: Instance | null = null;

  const defaultOptions: Partial<Options> = {
    placement: options.placement || 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: options.offset || [0, 10],
        },
      },
      {
        name: 'arrow',
        options: {
          element: '[data-popper-arrow]',
          padding: options.arrowOffset || 5,
        },
      },
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: false,
        },
      },
    ],
    strategy: 'fixed',
  };

  const createPopperInstance = () => {
    if (!referenceEl.value || !popperEl.value) return;

    const mergedOptions = {
      ...defaultOptions,
      ...options.popperOptions,
    };

    popperInstance = createPopper(
      referenceEl.value,
      popperEl.value,
      mergedOptions
    );
  };

  const destroyPopperInstance = () => {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  };

  const updatePopper = () => {
    popperInstance?.update();
  };

  const showPopper = () => {
    if (visible.value) return;
    visible.value = true;

    if (!popperInstance) {
      createPopperInstance();
    } else {
      popperInstance.update();
    }
  };

  const hidePopper = () => {
    visible.value = false;
  };

  watch(
    [referenceEl, popperEl],
    ([newReferenceEl, newPopperEl]) => {
      destroyPopperInstance();
      if (newReferenceEl && newPopperEl) {
        createPopperInstance();
        if (visible.value) {
          updatePopper();
        }
      }
    }
  );

  onMounted(() => {
    if (referenceEl.value && popperEl.value) {
      createPopperInstance();
    }
  });

  onBeforeUnmount(() => {
    destroyPopperInstance();
  });

  return {
    visible,
    showPopper,
    hidePopper,
    updatePopper,
  };
} 