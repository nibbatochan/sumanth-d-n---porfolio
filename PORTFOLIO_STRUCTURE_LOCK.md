# Portfolio Structure & Layout Specification (LOCKED)

> **IMPORTANT**: This file defines the golden reference layout and structure for Sumanth Reddy's portfolio website. 
> **RULE**: Do NOT modify the container widths, hero geometry, typography scaling, ASCII canvas proportions, or root zoom unless explicitly requested by the user.

---

## 1. Global Scaling & Viewport Engine

- **File**: `src/index.css`
- **Root Scale**: `zoom: 0.85;` (85% total scale)
  ```css
  @layer base {
    html {
      scroll-behavior: smooth;
      zoom: 0.85; /* Approved spacious scale matching 80-85% browser zoom across all displays */
    }

    body {
      background-color: #FFFFFF;
      color: #18181B;
      overflow-x: hidden;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .dark body {
      background-color: #09090B;
      color: #FFFFFF;
    }
  }
  ```
- **Page Container Width**: Standard **`max-w-6xl` (1152px)** across all sections (`Navbar`, `KineticHero`, `WorkGrid`, `AboutSection`, `Footer`).

---

## 2. Hero Section Architecture

- **File**: `src/components/KineticHero.jsx`
- **Section Wrapper**:
  ```jsx
  <section 
    id="home" 
    className="min-h-[auto] lg:min-h-[calc(100vh-110px)] flex flex-col justify-center pt-28 sm:pt-32 lg:pt-28 pb-4 sm:pb-6 px-4 sm:px-8 max-w-6xl mx-auto relative z-10 my-14"
  >
  ```
  - **Spacing**: `my-14` provides **56px** breathing space above (under fixed navbar) and **56px** below (before skills marquee).
  - **Vertical Centering**: `lg:min-h-[calc(100vh-110px)]` with `my-auto` on the inner grid.

### Grid Layout:
```jsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
  {/* Left 7 Columns: Headline, Badge, Bio, CTAs */}
  <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-3.5">
  ...
  </div>

  {/* Right 5 Columns: 3D ASCII Dove (Native, Untouched) */}
  <div className="lg:col-span-5 flex items-center justify-center relative select-none w-full mt-6 lg:mt-0">
    <AsciiCanvas soundEnabled={soundEnabled} isDarkMode={isDarkMode} />
  </div>
</div>
```

### Typography Scale & Inline Elements:
- **Line 1 ("Crafting thoughtful,")**:
  - "Crafting ": `text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-sans font-bold tracking-tight`
  - "thoughtful,": `text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-serif italic font-normal text-orange-600 dark:text-orange-400`
- **Line 2 ("human-centered" + Pixel Flower)**:
  - Text: `text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-serif italic font-normal text-orange-600 dark:text-orange-400 leading-none`
  - Pixel Flower: `className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 ml-2 sm:ml-2.5 -translate-y-0.5 sm:-translate-y-1 drop-shadow-xs"`
- **Line 3 (Action Portrait Capsule + "products &")**:
  - Portrait Capsule: `h-8 sm:h-10 md:h-11 lg:h-12 w-22 sm:w-28 md:w-34 lg:w-38 shrink-0 group self-center bg-black` (smooth hover-pan portrait)
  - "products &": `text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-sans font-bold tracking-tight leading-none self-center`
- **Line 4 ("brand experiences.")**:
  - Text: `text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-sans font-bold tracking-tight text-zinc-900 dark:text-white leading-none`

---

## 3. 3D ASCII Flying Dove Proportions

- **File**: `src/components/AsciiCanvas.jsx`
- **Column Placement**: Sits cleanly inside `lg:col-span-5` without artificial negative margins or container stretching.
- **Font Sizing**:
  ```jsx
  <pre 
    className={`font-mono text-[7px] xs:text-[7.8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] leading-[0.98] tracking-tighter whitespace-pre text-center select-none transition-colors duration-300 ${currentTheme.textClass} drop-shadow-sm`}
    style={{ margin: 0 }}
  >
    {asciiOutput}
  </pre>
  ```

---

## 4. Skills Marquee & Selected Work Grid

- **Skills Marquee**: `src/components/KineticMarquee.jsx` (`py-4 mt-6 mb-12`)
- **Selected Work**: `src/components/WorkGrid.jsx` (`max-w-6xl mx-auto space-y-10`)
  - Featured Case Study #1: **NoBroker — Ending the Search Flow Break** (`/illustrations/nobroker-case-thumbnail.jpg`)
  - Supported filters: `All Work`, `UI/UX`, `Graphic & Brand`

---

## 5. Deployment Information

- **Production URL**: https://sumanth98.vercel.app
- **Deployment Platform**: Vercel
- **Branch**: main
