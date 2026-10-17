/**
 * Fast, instant-response smooth scrolling utility.
 * Triggers hardware-accelerated smooth scrolling with 0ms delay.
 */

export function getScrollParent(node: HTMLElement | null): HTMLElement | Window {
  if (!node || typeof window === 'undefined') return window;

  let current = node.parentElement;
  while (current && current !== document.body && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY;
    if ((overflowY === 'auto' || overflowY === 'scroll') && current.scrollHeight > current.clientHeight) {
      return current;
    }
    current = current.parentElement;
  }
  return window;
}

export interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  updateHash?: boolean;
}

/**
 * Smoothly scrolls to an element by ID or to the top.
 * Starts IMMEDIATELY upon clicking with 0ms delay.
 * Uses native GPU-composited smooth scrolling to eliminate all lag.
 */
export function smoothScrollToSection(
  targetId: string,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === 'undefined') return;

  const { updateHash = true } = options;
  const cleanId = targetId.replace(/^#/, '').trim();

  // Scroll to top
  if (!cleanId || cleanId === 'top' || cleanId === 'hero') {
    const header = document.querySelector('header');
    const container = getScrollParent(header);

    if (container === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (container as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (updateHash) {
      try {
        history.pushState(null, '', window.location.pathname);
      } catch {
        // ignore
      }
    }
    return;
  }

  // Find target element
  const targetElement = document.getElementById(cleanId);
  if (!targetElement) {
    return;
  }

  // Immediate native smooth scroll (0ms delay, hardware accelerated)
  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (updateHash) {
    try {
      history.pushState(null, '', `#${cleanId}`);
    } catch {
      // ignore
    }
  }
}
