# 3D Spatial Poster Stream — Master Technical & Design Specification Prompt

> **Purpose for AI Models & Designers/Developers**: Use this comprehensive specification prompt to build this exact immersive 3D Spatial Card Stream from scratch in React, Tailwind CSS, HTML5 Canvas, and the Web Audio API.

---

## 1. System Overview & Aesthetic Philosophy

Build an immersive, hardware-accelerated 3D spatial stream gallery. Users navigate through an infinite cylindrical/planar one-point perspective tunnel of floating cards (artwork/posters) set against an interactive 3D mathematical wireframe dome.

### Core Visual Principles
- **Atmosphere**: Deep obsidian space (`#050507`), neon orange electric accents (`#F97316` / `rgb(255, 130, 50)`), translucent glassmorphic surfaces (`backdrop-blur-md`, `border-white/15`).
- **Tactile Physics**: Direct-manipulation physics running on `requestAnimationFrame` with zero layout thrashing (`translate3d`, `rotateX/Y/Z`, pointer capture, spring ease damping).
- **Acoustic Atmosphere**: Zero electronic synth beeps. Pure organic, mellow air displacement and wind swooshes synchronized to user gestures (grab, glide, center snap, fling, auto-cruise arrival).

---

## 2. Technical Stack & Architecture

- **Framework**: React (18+) with Hooks (`useRef`, `useState`, `useCallback`, `useMemo`, `useEffect`)
- **Styling**: Tailwind CSS (with 3D transform utilities: `preserve-3d`, `perspective`)
- **Icons**: `@phosphor-icons/react` (`ArrowLeft`, `Play`, `Pause`, `Eye`, `X`, `Info`)
- **Graphics**: Dual-layer system:
  1. HTML5 2D Canvas for the 3D hemispherical wireframe background mesh.
  2. CSS 3D Matrix/Transform hardware layer for cards (prevents texture downsampling and keeps typography ultra-sharp).
- **Audio Engine**: Native Web Audio API with pre-decoded in-memory `AudioBuffer` and synthetic brownian/pink noise fallback.

---

## 3. Mathematical Foundations & 3D Physics Loop

### 3.1 Spatial Tunnel Geometry
- **Infinite Cylindrical Wrapping**:
  ```javascript
  const totalPosters = items.length;
  const itemSpacingZ = 680; // Distance between successive cards along camera axis
  const totalSpanZ = totalPosters * itemSpacingZ;

  // In 60fps tick loop for each card index:
  let rawZ = (index * itemSpacingZ - physics.current.scrollZ) % totalSpanZ;
  if (rawZ < -totalSpanZ / 2) rawZ += totalSpanZ;
  if (rawZ > totalSpanZ / 2) rawZ -= totalSpanZ;
  ```
- **Staggered Spatial Offsets**:
  Cards must not stack in a flat line; they alternate on a 6-phase rhythm:
  - Pattern 0: $x = -320\text{px}, y = -40\text{px}, \text{rotY} = +7^\circ, \text{rotZ} = -1.2^\circ$
  - Pattern 1: $x = +290\text{px}, y = +35\text{px}, \text{rotY} = -7^\circ, \text{rotZ} = +1.0^\circ$
  - Pattern 2: $x = -160\text{px}, y = +50\text{px}, \text{rotY} = +4^\circ, \text{rotZ} = +0.6^\circ$
  - Pattern 3: $x = +340\text{px}, y = -45\text{px}, \text{rotY} = -8^\circ, \text{rotZ} = -1.0^\circ$
  - Pattern 4: $x = -290\text{px}, y = +20\text{px}, \text{rotY} = +6^\circ, \text{rotZ} = +0.8^\circ$
  - Pattern 5: $x = +180\text{px}, y = -30\text{px}, \text{rotY} = -5^\circ, \text{rotZ} = -0.5^\circ$

- **Near/Far Fade Clipping**:
  - Fade out cards approaching camera: $\text{finalZ} > 180 \implies \text{opacity} = \max(0, 1 - (\text{finalZ} - 180)/120)$
  - Fade out cards receding in deep tunnel: $\text{finalZ} < -2400 \implies \text{opacity} = \max(0, 1 - (-\text{finalZ} - 2400)/700)$
  - Hide non-visible cards completely: `if (finalZ > 300 || finalZ < -3100) el.style.display = 'none'`

### 3.2 Physics Spring Damping
- Separate actual position from target position:
  ```javascript
  // Spring interpolation on RAF
  physics.current.scrollZ += (physics.current.targetZ - physics.current.scrollZ) * 0.08;
  physics.current.panX += (physics.current.targetPanX - physics.current.panX) * 0.08;
  ```
- Mouse wheel advances camera: `targetZ += e.deltaY * 1.5`.
- Canvas drag pans laterally and scrolls:
  ```javascript
  targetPanX = dragStartPanX + deltaX * 1.1;
  targetZ = dragStartScrollZ - deltaY * 1.8;
  ```

### 3.3 3D Wireframe Dome Canvas (Background)
A mathematical front-hemisphere geodesic dome rendered in real-time:
- **Geometry**: 16 concentric latitude rings $\times$ 28 meridian longitude rays projected via spherical trigonometry:
  $$x = R \sin(\theta) \cos(\phi), \quad y = R \sin(\theta) \sin(\phi), \quad z = R \cos(\theta)$$
- **Perspective Camera Transform**:
  $$z_2 = z_1 \cos(\text{rotX}) + y \sin(\text{rotX}), \quad \text{scale} = \frac{\text{FOV}}{z_2}$$
  $$\text{px} = \text{cx} + x_1 \cdot \text{scale}, \quad \text{py} = \text{cy} + y_2 \cdot \text{scale}$$
- **Subtle Parallax**: Mouse offset tilts the sphere slightly:
  $$\text{targetRotY} = \left(\frac{\text{clientX}}{W} - 0.5\right) \times 0.18, \quad \text{targetRotX} = \left(\frac{\text{clientY}}{H} - 0.5\right) \times 0.12$$
- **Wheel Pulse Resonance**: Scrolling pulses the sphere radius dynamically (`pulseScale = 1 + sin(time) * 0.015 + wheelPulse`).

---

## 4. Tactile Interaction Model

### 4.1 Card Manipulation & Dragging
- Cards support direct pointer interaction from **anywhere in the depth tunnel**:
  1. Pointer down on card captures pointer: `e.currentTarget.setPointerCapture(e.pointerId)`.
  2. Pointer moves: Card lifts out of the tunnel depth towards the front viewing plane ($z = 50\text{px}$) with dynamic rotation proportional to drag velocity (`rotZ = baseRotZ + deltaX * 0.06`).
  3. **Acoustic Feedback**:
     - Grab / Pick up: Plays low tactile slip sound (`drag-start`).
     - Movement across canvas: Throttled textured air glide (`drag-move`).

### 4.2 Drag to Center to View (Drop Zone Reticle)
- A dashed circular/rounded reticle appears in the dead center of the screen when dragging:
  ```javascript
  const distToCenter = Math.hypot(clientX - innerWidth / 2, clientY - innerHeight / 2);
  const isOverCenter = distToCenter < 210;
  ```
- **Magnetic Lock**:
  - When the card enters the circle ($< 210\text{px}$), the reticle illuminates orange (`rgba(249, 115, 22, 0.9)`), scales up ($1.06\times$), and triggers the magnetic suction sound (`drag-center`).
  - Releasing inside the reticle snaps the card into the center viewing focus mode (`focus`).

### 4.3 Fling / Throw Discard
- If user drags horizontally with high velocity ($\Delta x > 110\text{px}$ or $|v| > 10$):
  - Card flies into the abyss: `translate3d(flyX, flyY, -700px) rotateZ(rotZ) rotateY(direction * 55deg) scale(0.6)`
  - Tunnel automatically steps forward to the next card (`targetZ += itemSpacingZ`).
  - Triggers rapid airy woosh sound (`fling`).

### 4.4 Background Card Click-to-Front
- Clicking any card situated further back in the depth tunnel smoothly calculates the exact distance $\Delta Z = -pos.z$ and executes a smooth cubic ease-out curve over 1100ms:
  $$\text{ease}(t) = 1 - (1 - t)^3$$
  Triggers reverberant tunnel rush sound (`depth`).

### 4.5 Cruise Mode (Auto-Play)
- An ambient auto-drive mode that cruises through the gallery at `targetZ += 2.4` per frame.
- Automatically pauses when the user interacts and resumes after 3000ms of inactivity.
- **Card Arrival Sound**: When a new card reaches closest focus ($z \approx 0$), a soft arrival breeze plays (`cruise-arrive`).

---

## 5. Acoustic & Sound Architecture

### 5.1 Low-Latency Web Audio API Architecture
To eliminate browser autoplay blocking and playback latency:
1. **Immediate In-Memory Prefetching**: Audio files are fetched as raw `ArrayBuffer`s into a RAM cache immediately on script execution.
2. **Global Gesture Capture**: Listeners on window capture early events with `{ capture: true }`:
   `['pointerdown', 'pointerup', 'pointermove', 'click', 'touchstart', 'touchend', 'keydown', 'mousedown', 'wheel']`.
   The `AudioContext` is resumed before child components can stop propagation.
3. **Sound Palette**:
   - `user-drag-1.mp3`: Subtle tactile air drag start/slip
   - `user-drag-2.mp3`: Gentle textured air glide
   - `user-drag-3.wav`: Smooth organic pull / air suction
   - `wind-swoosh-1.mp3`: Fast airy whoosh
   - `wind-swoosh-2.mp3`: Deep tunnel reverberation
   - `wind-swoosh-3.mp3`: Ghostly breeze
   - `wind-swoosh-4.mp3`: Swirling resonant air
   - `wind-swoosh-5.mp3`: Quick transition swoosh
4. **DSP Processing**:
   - Every audio source passes through a `BiquadFilterNode` configured as a low-pass filter at $2000\text{Hz} - 2600\text{Hz}$ to eliminate harsh electronic hiss and emphasize warm, mellow air textures.
   - Subtle randomized pitch shifting ($\pm 6\%$) prevents ear fatigue.
   - Fallback pink/brownian noise synthesis if network fails.

---

## 6. UI Components & Layout Hierarchy

```
<PosterChallengePage>
├── <canvas> (Background 3D Hemispherical Wireframe Dome, z-0)
├── Ambient Backdrop Overlay (Soft dark vignette, z-5)
├── Header Bar (z-40)
│   ├── Left: Back Button (Pill button with ArrowLeft)
│   ├── Center: Current Day Indicator ("Day 11 / 30")
│   └── Right: Controls
│       ├── Cruise Toggle Button (Play/Pause, "Cruise: ON/OFF")
│       └── Details Modal Trigger Button (Info icon)
├── 3D Viewport Container (perspective: 1100px, z-10)
│   └── 3D World (transform-style: preserve-3d)
│       └── [Cards Loop (30 items)]
│           └── Card Item (415px square, rounded-3xl, border-white/20)
│               ├── 1:1 Artwork Image (Full sharp, never blurred)
│               ├── Drag to View / Front Hint Pill
│               └── Hover View Button (Dead center with Eye icon)
├── Drag Drop Zone Reticle (Dashed square/circle, z-30, appears on drag)
│   ├── Eye Icon circle
│   └── Text: "DROP TO VIEW" / "Release card in center to view"
├── In-Scene Focused Card Overlay (z-50)
│   ├── Close Button (Circular button floating top-right of focused card)
│   ├── Transparent backdrop dismiss area
│   └── Bottom Details (Pill badge: "Day • Art Style", Title in bold 32px)
├── Bottom Navigation Hint (z-20)
│   └── "SCROLL TO ADVANCE · DRAG TO CENTER TO VIEW · FLING TO DISCARD"
└── Project Details Modal Overlay (z-50)
    └── Modal Card (#0a0a0f, rounded-3xl, glassmorphic border)
        ├── Status Pill (Orange pulsing beacon: "Project Brief • Rapid Sprint")
        ├── Master Statement (Bold editorial typography with orange serif accents)
        ├── Close Button (Top-right X icon)
        └── Metadata Footer ("Tool: Adobe Photoshop • Limit: < 2 Hours • Pacing: 30 Days")
```

---

## 7. Typography & Editorial Tone

- **Interface Headings & Badges**: Monospace font (`font-mono`), uppercase, wide letter tracking (`tracking-wider`, `tracking-widest`).
- **Project Hero Statement**: High-contrast editorial style:
  - Sans-serif Bold 42px for dominant statements.
  - Serif Italic Accent (orange) for emphasis words:
    *"This is a **poster challenge** done using **Photoshop** under **2 hours** coming with idea, concept and design **onspot.**"*
- **Color Codes**:
  - Background: `#050507` (Deep Obsidian Void)
  - Card Surfaces: `#000000` / `#0A0A0F`
  - Accent Primary: `#F97316` (Vibrant Orange)
  - Subtle Borders: `rgba(255, 255, 255, 0.15)` to `0.25`
  - Text Primary: `#FFFFFF`
  - Text Dim: `rgba(255, 255, 255, 0.40)` to `0.60`
