// Custom RequestAnimationFrame interpolated smooth scroll engine
// Immune to native browser scroll aborts on mouse hover/interaction

let currentAnimationId: number | null = null;

// Cubic ease-out curve for a weighted, luxury feel
const easeOutCubic = (t: number): number => --t * t * t + 1;

export const navigateToSection = (
  targetId: string,
  duration = 650,
  offset = 80
): void => {
  const element = document.getElementById(targetId);
  if (!element) return;

  // Cancel any existing scroll animation loop
  if (currentAnimationId !== null) {
    cancelAnimationFrame(currentAnimationId);
    currentAnimationId = null;
  }

  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const targetPosition = element.getBoundingClientRect().top + startPosition - offset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  // Prevent hover micro-interactions from breaking momentum
  document.body.style.pointerEvents = 'none';

  const animationLoop = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      currentAnimationId = requestAnimationFrame(animationLoop);
    } else {
      document.body.style.pointerEvents = 'auto';
      currentAnimationId = null;
    }
  };

  currentAnimationId = requestAnimationFrame(animationLoop);
};

export const scrollToTop = (duration = 650): void => {
  if (currentAnimationId !== null) {
    cancelAnimationFrame(currentAnimationId);
    currentAnimationId = null;
  }

  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const distance = -startPosition;
  let startTime: number | null = null;

  document.body.style.pointerEvents = 'none';

  const animationLoop = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      currentAnimationId = requestAnimationFrame(animationLoop);
    } else {
      document.body.style.pointerEvents = 'auto';
      currentAnimationId = null;
    }
  };

  currentAnimationId = requestAnimationFrame(animationLoop);
};
