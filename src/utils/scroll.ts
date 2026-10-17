/**
 * Custom smooth scrolling utility with timestamp-based requestAnimationFrame animation.
 * Provides a paced, elegant, and slow scroll transition between sections with easing.
 */

let activeScrollAnimationId: number | null = null;
let stopScrollListenerAttached = false;

const cancelActiveScroll = () => {
  if (activeScrollAnimationId !== null) {
    cancelAnimationFrame(activeScrollAnimationId);
    activeScrollAnimationId = null;
  }
};

// If the user manually interrupts the scroll with wheel or touch, smoothly yield control
const handleUserInterrupt = () => {
  cancelActiveScroll();
};

const setupInterruptListeners = () => {
  if (stopScrollListenerAttached || typeof window === 'undefined') return;
  window.addEventListener('wheel', handleUserInterrupt, { passive: true });
  window.addEventListener('touchstart', handleUserInterrupt, { passive: true });
  stopScrollListenerAttached = true;
};

/**
 * Finds the nearest scrollable parent container (e.g. window or simulated phone container)
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

/**
 * Cubic ease-in-out easing function for graceful acceleration and deceleration
 */
const easeInOutCubic = (t: number): number => {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export interface SmoothScrollOptions {
  duration?: number; // Duration in ms (default: 1000ms for slow, elegant travel)
  offset?: number;   // Top offset to accommodate sticky navbar (default: 72px)
  updateHash?: boolean;
}

/**
 * Smoothly scrolls to an element by ID or to the top of the container.
 * Uses requestAnimationFrame with high-precision timestamp.
 * 
 * @param targetId ID of the element (e.g., 'how-it-works', '#documents', or 'top')
 * @param options Duration, offset, and hash update settings
 */
export function smoothScrollToSection(
  targetId: string, 
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === 'undefined') return;

  setupInterruptListeners();
  cancelActiveScroll();

  const {
    duration = 1000, // 1 second duration for clear, visible, smooth scrolling
    offset = 72,     // 72px offset for sticky header breathing room
    updateHash = true,
  } = options;

  const cleanId = targetId.replace(/^#/, '').trim();

  // Handle scrolling to top
  if (!cleanId || cleanId === 'top' || cleanId === 'hero') {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    if (startY <= 0) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, Math.round(startY * (1 - eased)));

      if (progress < 1) {
        activeScrollAnimationId = requestAnimationFrame(step);
      } else {
        window.scrollTo(0, 0);
        activeScrollAnimationId = null;
        if (updateHash) {
          try {
            history.pushState(null, '', window.location.pathname);
          } catch {
            // ignore
          }
        }
      }
    };

    activeScrollAnimationId = requestAnimationFrame(step);
    return;
  }

  // Find target element
  const targetElement = document.getElementById(cleanId);
  if (!targetElement) {
    console.warn(`[smoothScrollToSection] Element with id "${cleanId}" not found.`);
    return;
  }

  const container = getScrollParent(targetElement);
  const isWindow = container === window;

  const startPosition = isWindow
    ? (window.pageYOffset || document.documentElement.scrollTop)
    : (container as HTMLElement).scrollTop;

  let targetPosition = 0;
  let maxScroll = 0;

  if (isWindow) {
    const rect = targetElement.getBoundingClientRect();
    targetPosition = startPosition + rect.top - offset;
    maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  } else {
    const el = container as HTMLElement;
    const containerRect = el.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    targetPosition = startPosition + (targetRect.top - containerRect.top) - offset;
    maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
  }

  const finalDestination = Math.max(0, Math.min(targetPosition, maxScroll));
  const distance = finalDestination - startPosition;

  if (Math.abs(distance) < 2) return;

  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    const currentPos = Math.round(startPosition + distance * easedProgress);

    if (isWindow) {
      window.scrollTo(0, currentPos);
    } else {
      (container as HTMLElement).scrollTop = currentPos;
    }

    if (progress < 1) {
      activeScrollAnimationId = requestAnimationFrame(step);
    } else {
      if (isWindow) {
        window.scrollTo(0, finalDestination);
      } else {
        (container as HTMLElement).scrollTop = finalDestination;
      }
      activeScrollAnimationId = null;

      if (updateHash) {
        try {
          history.pushState(null, '', `#${cleanId}`);
        } catch {
          // ignore
        }
      }
    }
  };

  activeScrollAnimationId = requestAnimationFrame(step);
}
