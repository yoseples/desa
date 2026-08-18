// Helper functions to calculate color shades and apply live theme to document :root

function hexToRgb(hex) {
  if (!hex) return { r: 5, g: 150, b: 105 };
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return { r: 5, g: 150, b: 105 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function adjustColor(hex, percent) {
  if (!hex || !hex.startsWith('#')) return hex;
  const { r, g, b } = hexToRgb(hex);
  const adjust = (val) => Math.min(255, Math.max(0, Math.round(val + (val * percent / 100))));
  const nr = adjust(r).toString(16).padStart(2, '0');
  const ng = adjust(g).toString(16).padStart(2, '0');
  const nb = adjust(b).toString(16).padStart(2, '0');
  return `#${nr}${ng}${nb}`;
}

export function initColorMode() {
  if (typeof window === 'undefined') return 'auto';
  
  const savedMode = localStorage.getItem('desa_color_mode') || 'auto';
  applyColorMode(savedMode);
  
  // Listen to system preference changes if auto
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemChange = () => {
    const currentMode = localStorage.getItem('desa_color_mode') || 'auto';
    if (currentMode === 'auto') {
      applyColorMode('auto');
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleSystemChange);
  }

  return savedMode;
}

export function applyColorMode(mode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  let effectiveMode = mode;

  if (mode === 'auto') {
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    effectiveMode = systemPrefersDark ? 'dark' : 'light';
  }

  root.setAttribute('data-theme', effectiveMode);
  root.setAttribute('data-color-mode', mode);
  localStorage.setItem('desa_color_mode', mode);
  
  // Dispatch custom event for UI updates
  window.dispatchEvent(new CustomEvent('desa-colormode-changed', { detail: { mode, effectiveMode } }));
}

export function applyThemeToDocument(theme) {
  if (!theme || typeof document === 'undefined') return;
  const root = document.documentElement;

  // 1. Primary Colors & Dynamic Shades
  if (theme.primaryColor) {
    const primary = theme.primaryColor;
    const hover = adjustColor(primary, -15);
    const dark = adjustColor(primary, -35);
    const { r, g, b } = hexToRgb(primary);

    root.style.setProperty('--primary', primary);
    root.style.setProperty('--primary-hover', hover);
    root.style.setProperty('--primary-dark', dark);
    root.style.setProperty('--primary-light', `rgba(${r}, ${g}, ${b}, 0.12)`);
    root.style.setProperty('--primary-border', `rgba(${r}, ${g}, ${b}, 0.3)`);
    root.style.setProperty('--hero-bg', `linear-gradient(135deg, ${dark} 0%, ${adjustColor(primary, -20)} 40%, #0f172a 100%)`);
    root.style.setProperty('--shadow-card-hover', `0 14px 28px -4px rgba(${r}, ${g}, ${b}, 0.18), 0 6px 16px -2px rgba(0, 0, 0, 0.05)`);
  }

  // 2. Typography
  if (theme.fontFamily) {
    root.style.setProperty('--font-main', theme.fontFamily);
    document.body.style.fontFamily = theme.fontFamily;
  }
  if (theme.baseFontSize) {
    root.style.fontSize = theme.baseFontSize;
  }
  if (theme.headingWeight) {
    root.style.setProperty('--heading-weight', theme.headingWeight);
  }
  if (theme.letterSpacing) {
    root.style.letterSpacing = theme.letterSpacing;
  }

  // 3. Layout & Geometry
  if (theme.containerWidth) {
    root.style.setProperty('--container-max-width', theme.containerWidth);
  }
  if (theme.navbarHeight) {
    root.style.setProperty('--navbar-height', theme.navbarHeight);
  }
  if (theme.navbarPosition) {
    root.style.setProperty('--navbar-position', theme.navbarPosition);
  }
  if (theme.borderRadius) {
    const radius = theme.borderRadius;
    root.style.setProperty('--radius-md', radius);
    root.style.setProperty('--radius-xs', `calc(${radius} * 0.4)`);
    root.style.setProperty('--radius-sm', `calc(${radius} * 0.65)`);
    root.style.setProperty('--radius-lg', `calc(${radius} * 1.35)`);
    root.style.setProperty('--radius-xl', `calc(${radius} * 1.7)`);
  }

  // 4. Shadow Presets
  if (theme.shadowIntensity) {
    switch (theme.shadowIntensity) {
      case 'none':
        root.style.setProperty('--shadow-card', 'none');
        root.style.setProperty('--shadow-md', 'none');
        root.style.setProperty('--shadow-lg', 'none');
        break;
      case 'subtle':
        root.style.setProperty('--shadow-card', '0 1px 4px rgba(0,0,0,0.04)');
        root.style.setProperty('--shadow-md', '0 2px 4px rgba(0,0,0,0.04)');
        root.style.setProperty('--shadow-lg', '0 4px 8px rgba(0,0,0,0.05)');
        break;
      case 'elevated':
        root.style.setProperty('--shadow-card', '0 8px 24px rgba(15,23,42,0.12)');
        root.style.setProperty('--shadow-md', '0 10px 25px rgba(0,0,0,0.1)');
        root.style.setProperty('--shadow-lg', '0 20px 35px rgba(0,0,0,0.15)');
        break;
      case 'soft':
      default:
        root.style.setProperty('--shadow-card', '0 2px 12px rgba(15, 23, 42, 0.05)');
        root.style.setProperty('--shadow-md', '0 4px 6px -1px rgba(0, 0, 0, 0.07)');
        root.style.setProperty('--shadow-lg', '0 10px 15px -3px rgba(0, 0, 0, 0.08)');
        break;
    }
  }

  // 5. Card Spacing Density
  if (theme.cardDensity) {
    if (theme.cardDensity === 'compact') {
      root.style.setProperty('--card-padding', '1rem');
      root.style.setProperty('--section-padding', '2.25rem 0');
    } else if (theme.cardDensity === 'spacious') {
      root.style.setProperty('--card-padding', '2rem');
      root.style.setProperty('--section-padding', '5rem 0');
    } else {
      root.style.setProperty('--card-padding', '1.5rem');
      root.style.setProperty('--section-padding', '3.75rem 0');
    }
  }
}
