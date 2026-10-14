import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Eye, 
  X,
  Info,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react';
import { posterChallengeList } from '../data/portfolioData';
import { playWindSwoosh, preloadWindSounds } from '../utils/sound';

export const PosterChallengePage = ({ 
  onBack, 
  soundEnabled 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const easeZRef = useRef(null);

  const [items] = useState(() => [...posterChallengeList]);

  // In-scene focus state
  const [focusedId, setFocusedId] = useState(null);
  const [closingCardId, setClosingCardId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const lastInteractionRef = useRef(Date.now());
  const lastWheelSoundRef = useRef(0);
  const lastFrontCardIdRef = useRef(null);
  const lastDragMoveSoundRef = useRef(0);
  const wasOverCenterRef = useRef(false);

  // Preload authentic wind swoosh audio buffers on mount
  useEffect(() => {
    preloadWindSounds();
  }, []);

  // Thrown cards animating into the abyss
  const [thrownCardIds, setThrownCardIds] = useState(new Set());
  const [throwAnimations, setThrowAnimations] = useState({});

  // 3D Navigation Physics Refs
  const physics = useRef({
    scrollZ: 0,
    targetZ: 0,
    panX: 0,
    targetPanX: 0,
    isCanvasDragging: false,
    dragStartX: 0,
    dragStartPanX: 0,
    dragStartY: 0,
    dragStartScrollZ: 0,
  });

  // Card Dragging State (Ref for 60fps RAF loop + single state for drop zone UI)
  const [draggingCardId, setDraggingCardId] = useState(null);
  const dragRef = useRef({
    isDragging: false,
    cardId: null,
    cardIndex: 0,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    velocity: 0,
    baseX: 0,
    baseY: 0,
    baseZ: 0,
    baseRotY: 0,
    baseRotZ: 0,
    isOverCenter: false
  });
  const dropZoneRef = useRef(null);

  const cardCoordsRef = useRef({});

  const totalPosters = items.length;
  const itemSpacingZ = 680;
  const totalSpanZ = totalPosters * itemSpacingZ;

  // Staggered layout offsets for one-point perspective variety
  const layoutOffsets = useMemo(() => {
    return items.map((_, index) => {
      const pattern = index % 6;
      let x = 0;
      let y = 0;
      let rotY = 0;
      let rotZ = 0;

      switch (pattern) {
        case 0:
          x = -320;
          y = -40;
          rotY = 7;
          rotZ = -1.2;
          break;
        case 1:
          x = 290;
          y = 35;
          rotY = -7;
          rotZ = 1.0;
          break;
        case 2:
          x = -160;
          y = 50;
          rotY = 4;
          rotZ = 0.6;
          break;
        case 3:
          x = 340;
          y = -45;
          rotY = -8;
          rotZ = -1.0;
          break;
        case 4:
          x = -290;
          y = 20;
          rotY = 6;
          rotZ = 0.8;
          break;
        case 5:
          x = 180;
          y = -30;
          rotY = -5;
          rotZ = -0.5;
          break;
        default:
          x = (index % 2 === 0 ? -1 : 1) * 260;
          y = 0;
          rotY = 0;
          rotZ = 0;
      }
      return { x, y, rotY, rotZ };
    });
  }, [items]);

  const [activePosterIndex, setActivePosterIndex] = useState(0);

  const registerInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

  const closeFocus = useCallback(() => {
    if (!focusedId) return;
    playWindSwoosh('soft', { volume: 0.25, soundEnabled });
    const prevId = focusedId;
    setClosingCardId(prevId);
    setFocusedId(null);
    setTimeout(() => {
      setClosingCardId(null);
    }, 750);
  }, [focusedId, soundEnabled]);

  const openFocus = useCallback((cardId) => {
    playWindSwoosh('focus', { volume: 0.35, soundEnabled });
    registerInteraction();
    const currentPos = cardCoordsRef.current[cardId];
    if (currentPos) {
      physics.current.targetZ = physics.current.scrollZ - currentPos.z;
    }
    setFocusedId(cardId);
  }, [registerInteraction, soundEnabled]);

  const goToNextPoster = useCallback(() => {
    if (!focusedId) return;
    const currIdx = items.findIndex(c => c.id === focusedId);
    const nextIdx = (currIdx + 1) % items.length;
    const nextCard = items[nextIdx];
    if (nextCard) {
      openFocus(nextCard.id);
    }
  }, [focusedId, items, openFocus]);

  const goToPrevPoster = useCallback(() => {
    if (!focusedId) return;
    const currIdx = items.findIndex(c => c.id === focusedId);
    const prevIdx = (currIdx - 1 + items.length) % items.length;
    const prevCard = items[prevIdx];
    if (prevCard) {
      openFocus(prevCard.id);
    }
  }, [focusedId, items, openFocus]);

  // Delay details display until the card has eased into the center
  useEffect(() => {
    if (focusedId) {
      setShowDetails(false);
      const timer = setTimeout(() => {
        setShowDetails(true);
      }, 850);
      return () => clearTimeout(timer);
    } else {
      setShowDetails(false);
    }
  }, [focusedId]);

  // Set html zoom to 1 while in full-screen 3D canvas so Agentation cursor tracking
  // is 100% pixel-accurate, and canvas spans 100% edge-to-edge with zero black borders
  useEffect(() => {
    const prevZoom = document.documentElement.style.zoom;
    document.documentElement.style.zoom = '1';

    return () => {
      document.documentElement.style.zoom = prevZoom || '';
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 1. 3D Front-Hemisphere Mesh Dome (Calm, slow, gentle rotation)
  // ─────────────────────────────────────────────────────────────
  const sphereMouseRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetRotX: 0,
    targetRotY: 0,
    currentRotX: 0.2,
    currentRotY: 0,
    wheelPulse: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId = null;

    let renderWidth = window.innerWidth;
    let renderHeight = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      renderWidth = window.innerWidth;
      renderHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(renderWidth * dpr);
      canvas.height = Math.ceil(renderHeight * dpr);
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e) => {
      const sm = sphereMouseRef.current;
      sm.mouseX = e.clientX;
      sm.mouseY = e.clientY;
      // Very gentle, subtle mouse parallax (down from 0.75 / 0.5)
      sm.targetRotY = ((e.clientX / renderWidth) - 0.5) * 0.18;
      sm.targetRotX = ((e.clientY / renderHeight) - 0.5) * 0.12;
    };

    const handleWheelPulse = (e) => {
      sphereMouseRef.current.wheelPulse = Math.min(0.06, sphereMouseRef.current.wheelPulse + Math.abs(e.deltaY) * 0.0001);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handleMouseMove);
    window.addEventListener('wheel', handleWheelPulse, { passive: true });

    let baseTime = 0;
    const latRings = 16;
    const lonRays = 28;

    const render = () => {
      baseTime += 0.0012; // Very slow, calm ambient drift
      const sm = sphereMouseRef.current;

      sm.wheelPulse *= 0.94;

      sm.currentRotY += (sm.targetRotY + Math.sin(baseTime * 0.1) * 0.012 - sm.currentRotY) * 0.02;
      sm.currentRotX += (sm.targetRotX + Math.cos(baseTime * 0.08) * 0.008 - sm.currentRotX) * 0.02;

      const panRotY = physics.current.panX * 0.0002;
      const finalRotY = sm.currentRotY + panRotY;
      const finalRotX = sm.currentRotX;

      const pulseScale = 1 + Math.sin(baseTime * 0.8) * 0.015 + sm.wheelPulse;
      const sphereRadius = Math.hypot(renderWidth, renderHeight) * 0.88 * pulseScale;

      ctx.clearRect(0, 0, renderWidth, renderHeight);

      // Sphere center shifted a little to the left
      const cx = renderWidth * 0.44;
      const cy = renderHeight / 2;
      const fov = Math.max(renderWidth, renderHeight) * 0.72;

      const projectHemisphere = (x, y, z) => {
        const cosY = Math.cos(finalRotY);
        const sinY = Math.sin(finalRotY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        const cosX = Math.cos(finalRotX);
        const sinX = Math.sin(finalRotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        if (z2 <= 15) return null;

        const scale = fov / z2;
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          pz: z2,
          scale
        };
      };

      // 1. Draw Meridian Longitude Rays
      for (let i = 0; i < lonRays; i++) {
        const phi = (i / lonRays) * Math.PI * 2;
        ctx.beginPath();
        let isDrawing = false;

        for (let j = 0; j <= 40; j++) {
          const theta = (j / 40) * (Math.PI * 0.492);
          const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
          const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
          const z = sphereRadius * Math.cos(theta);

          const pt = projectHemisphere(x, y, z);
          if (!pt) {
            isDrawing = false;
            continue;
          }

          if (!isDrawing) {
            ctx.moveTo(pt.px, pt.py);
            isDrawing = true;
          } else {
            ctx.lineTo(pt.px, pt.py);
          }
        }
        ctx.strokeStyle = 'rgba(255, 130, 50, 0.17)';
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // 2. Draw Concentric Latitude Rings
      for (let i = 1; i <= latRings; i++) {
        const theta = (i / (latRings + 0.5)) * (Math.PI * 0.492);
        const ringRadius = sphereRadius * Math.sin(theta);
        const z = sphereRadius * Math.cos(theta);

        ctx.beginPath();
        let isDrawing = false;
        let firstPt = null;

        for (let j = 0; j <= 56; j++) {
          const phi = (j / 56) * Math.PI * 2;
          const x = ringRadius * Math.cos(phi);
          const y = ringRadius * Math.sin(phi);

          const pt = projectHemisphere(x, y, z);
          if (!pt) {
            isDrawing = false;
            continue;
          }

          if (!firstPt) firstPt = pt;

          if (!isDrawing) {
            ctx.moveTo(pt.px, pt.py);
            isDrawing = true;
          } else {
            ctx.lineTo(pt.px, pt.py);
          }
        }

        if (firstPt && isDrawing) {
          ctx.lineTo(firstPt.px, firstPt.py);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.13)';
        ctx.lineWidth = 1.0;
        ctx.stroke();

        if (i % 2 === 0) {
          for (let k = 0; k < lonRays; k += 2) {
            const phi = (k / lonRays) * Math.PI * 2;
            const x = ringRadius * Math.cos(phi);
            const y = ringRadius * Math.sin(phi);
            const pt = projectHemisphere(x, y, z);

            if (pt) {
              const nodeAlpha = Math.max(0.1, Math.min(0.42, (pt.pz / sphereRadius) * 0.45));
              ctx.beginPath();
              ctx.arc(pt.px, pt.py, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 145, 60, ${nodeAlpha.toFixed(3)})`;
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('wheel', handleWheelPulse);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 2. 3D Simulated Perspective Tunnel Loop
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const cardElements = containerRef.current?.querySelectorAll('[data-poster-card]');
    if (!cardElements || cardElements.length === 0) return;

    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      const p = physics.current;
      const now = Date.now();
      const drag = dragRef.current;

      // Swift, noticeable auto-cruise speed
      if (!focusedId && isAutoPlay && now - lastInteractionRef.current > 3000 && !p.isCanvasDragging && !drag.isDragging) {
        p.targetZ += 2.4;
      }

      if (!easeZRef.current) {
        p.scrollZ += (p.targetZ - p.scrollZ) * 0.08;
      }
      p.panX += (p.targetPanX - p.panX) * 0.08;

      // Update Center Drop Zone indicator during dragging
      if (dropZoneRef.current && drag.isDragging) {
        const distToCenter = Math.hypot(drag.currentX - window.innerWidth / 2, drag.currentY - window.innerHeight / 2);
        const isOverCenter = distToCenter < 210;
        drag.isOverCenter = isOverCenter;

        const indicator = dropZoneRef.current.querySelector('[data-drop-indicator]');
        const dropIcon = dropZoneRef.current.querySelector('[data-drop-icon]');
        const dropTitle = dropZoneRef.current.querySelector('[data-drop-title]');
        if (indicator) {
          if (isOverCenter) {
            indicator.style.borderColor = 'rgba(249, 115, 22, 0.9)';
            indicator.style.backgroundColor = 'rgba(249, 115, 22, 0.16)';
            indicator.style.transform = 'scale(1.06)';
            indicator.style.boxShadow = '0 0 35px rgba(249, 115, 22, 0.35)';
            if (dropIcon) {
              dropIcon.style.borderColor = 'rgba(249, 115, 22, 0.8)';
              dropIcon.style.backgroundColor = 'rgba(249, 115, 22, 0.25)';
              dropIcon.style.color = '#F97316';
            }
            if (dropTitle) {
              dropTitle.style.color = '#F97316';
            }
          } else {
            indicator.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            indicator.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
            indicator.style.transform = 'scale(1.0)';
            indicator.style.boxShadow = 'none';
            if (dropIcon) {
              dropIcon.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              dropIcon.style.backgroundColor = 'rgba(255, 255, 255, 0.10)';
              dropIcon.style.color = 'rgba(255, 255, 255, 0.80)';
            }
            if (dropTitle) {
              dropTitle.style.color = 'rgba(255, 255, 255, 0.90)';
            }
          }
        }

        // Play subtle magnetic drag-center lock sound when dragging card enters the center reticle
        if (isOverCenter && !wasOverCenterRef.current) {
          playWindSwoosh('drag-center', { soundEnabled });
        }
        wasOverCenterRef.current = isOverCenter;
      }

      let closestIdx = 0;
      let minDistance = Infinity;

      cardElements.forEach((el) => {
        const indexStr = el.getAttribute('data-index');
        if (indexStr === null) return;
        const index = parseInt(indexStr, 10);
        const cardIdStr = el.getAttribute('data-id');
        const cardId = parseInt(cardIdStr, 10);

        let rawZ = (index * itemSpacingZ - p.scrollZ) % totalSpanZ;
        if (rawZ < -totalSpanZ / 2) rawZ += totalSpanZ;
        if (rawZ > totalSpanZ / 2) rawZ -= totalSpanZ;

        const distFromCamera = Math.abs(rawZ);
        if (distFromCamera < minDistance) {
          minDistance = distFromCamera;
          closestIdx = index;
        }

        const offset = layoutOffsets[index];
        const finalX = offset.x + p.panX * 0.6;
        const finalY = offset.y;
        const finalZ = rawZ;

        cardCoordsRef.current[cardId] = {
          x: finalX,
          y: finalY,
          z: finalZ,
          rotY: offset.rotY,
          rotZ: offset.rotZ
        };

        // If card was thrown into the abyss
        if (thrownCardIds.has(cardId)) {
          const throwData = throwAnimations[cardId];
          if (throwData) {
            el.style.display = 'flex';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            el.style.transform = `translate3d(${throwData.flyX}px, ${throwData.flyY}px, -700px) rotateZ(${throwData.rotZ}deg) rotateX(${throwData.rotX}deg) rotateY(${throwData.direction * 55}deg) scale(0.6)`;
          }
          return;
        }

        // If card is focused: realism ease into center with ZERO blur
        if (focusedId === cardId) {
          el.style.display = 'flex';
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
          el.style.filter = 'none';
          el.style.transform = `translate3d(0px, -20px, 150px) scale(1.15) rotateY(0deg) rotateZ(0deg)`;
          el.style.zIndex = '100';
          return;
        }

        // When closing focus, smoothly ease the card back into its tunnel coordinate
        if (closingCardId === cardId) {
          el.style.display = 'flex';
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
          el.style.filter = 'none';
          el.style.transform = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateY(${offset.rotY + p.panX * 0.015}deg) rotateZ(${offset.rotZ}deg)`;
          el.style.zIndex = '100';
          return;
        }

        // When a card is focused, all OTHER cards in the tunnel get softly blurred behind
        if (focusedId && focusedId !== cardId) {
          el.style.display = 'flex';
          el.style.opacity = '0.15';
          el.style.filter = 'blur(14px) brightness(0.3)';
          el.style.pointerEvents = 'none';
          el.style.transform = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateY(${offset.rotY + p.panX * 0.015}deg) rotateZ(${offset.rotZ}deg)`;
          el.style.zIndex = '10';
          return;
        }

        // If card is being held/dragged (from front OR anywhere in the background):
        if (drag.isDragging && drag.cardId === cardId) {
          const dragDist = Math.hypot(drag.deltaX, drag.deltaY);
          const liftFactor = Math.min(1, dragDist / 65);
          // Elevate towards front plane (z = 50) as it is dragged
          const currentZ = drag.baseZ + (50 - drag.baseZ) * liftFactor;

          const rotZ = drag.baseRotZ + drag.deltaX * 0.06;
          const rotY = drag.baseRotY + drag.deltaX * 0.03;
          const scale = drag.isOverCenter ? 1.08 : (1 + liftFactor * 0.04);

          el.style.display = 'flex';
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
          el.style.filter = 'none';
          el.style.transform = `translate3d(${drag.baseX + drag.deltaX}px, ${drag.baseY + drag.deltaY * 0.7}px, ${currentZ}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
          el.style.zIndex = '1000';
          return;
        }

        // Near / Far visibility in default stream mode
        let opacity = 1;
        if (finalZ > 180) {
          opacity = Math.max(0, 1 - (finalZ - 180) / 120);
        } else if (finalZ < -2400) {
          opacity = Math.max(0, 1 - (-finalZ - 2400) / 700);
        }

        if (finalZ > 300 || finalZ < -3100) {
          el.style.display = 'none';
        } else {
          el.style.display = 'flex';
          el.style.opacity = opacity.toFixed(3);
          el.style.pointerEvents = opacity < 0.2 ? 'none' : 'auto';
          el.style.filter = 'none';
          el.style.transform = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateY(${offset.rotY + p.panX * 0.015}deg) rotateZ(${offset.rotZ}deg)`;
          el.style.zIndex = String(Math.floor(2000 + finalZ));
        }
      });

      // When cruise mode brings a new card to the front, play a mellow arrival breeze sound
      if (lastFrontCardIdRef.current === null) {
        lastFrontCardIdRef.current = closestIdx;
      } else if (lastFrontCardIdRef.current !== closestIdx) {
        lastFrontCardIdRef.current = closestIdx;
        if (isAutoPlay && !focusedId && !drag.isDragging && !p.isCanvasDragging) {
          playWindSwoosh('cruise-arrive', { soundEnabled });
        }
      }

      setActivePosterIndex(closestIdx);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (easeZRef.current) cancelAnimationFrame(easeZRef.current);
    };
  }, [focusedId, closingCardId, isAutoPlay, itemSpacingZ, layoutOffsets, totalSpanZ, thrownCardIds, throwAnimations, soundEnabled]);

  // ─────────────────────────────────────────────────────────────
  // 3. Fling / Throw Cardboard Logic (Left or Right)
  // ─────────────────────────────────────────────────────────────
  const triggerThrow = useCallback((cardId, direction = 1) => {
    playWindSwoosh('fling', { volume: 0.35, soundEnabled });

    const throwSeed = {
      cardId,
      direction: direction > 0 ? 1 : -1,
      rotX: Math.random() * 40 - 20,
      rotZ: direction * (45 + Math.random() * 25),
      flyX: direction * (window.innerWidth * 0.9 + 250),
      flyY: Math.random() * 200 - 100
    };

    setThrowAnimations(prev => ({ ...prev, [cardId]: throwSeed }));
    setThrownCardIds(prev => new Set([...prev, cardId]));

    physics.current.targetZ += itemSpacingZ;

    setTimeout(() => {
      setThrownCardIds(prev => {
        const next = new Set(prev);
        next.delete(cardId);
        return next;
      });
      setThrowAnimations(prev => {
        const next = { ...prev };
        delete next[cardId];
        return next;
      });
    }, 550);

    if (focusedId === cardId) {
      setFocusedId(null);
    }
  }, [focusedId, itemSpacingZ, soundEnabled]);

  // Realistic smooth 1100ms ease-to-front animation when clicking ANY card in the background
  const bringCardToFront = useCallback((cardId) => {
    playWindSwoosh('depth', { volume: 0.32, soundEnabled });
    registerInteraction();

    if (easeZRef.current) cancelAnimationFrame(easeZRef.current);

    const startZ = physics.current.scrollZ;
    // Current rendered Z position relative to camera (front is around 0)
    const currentPos = cardCoordsRef.current[cardId];
    if (!currentPos) return;

    // To bring a card at currentPos.z to z = 0, scrollZ must advance by -currentPos.z
    // Since currentPos.z < 0 (further back in screen), deltaZ = -currentPos.z > 0 (scroll forward)
    const deltaZ = -currentPos.z;
    const targetZ = startZ + deltaZ;
    const startTime = performance.now();
    const duration = 1100;

    const easeStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic deceleration (easeOutCubic)
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = startZ + deltaZ * ease;
      physics.current.scrollZ = currentVal;
      physics.current.targetZ = targetZ;

      if (progress < 1) {
        easeZRef.current = requestAnimationFrame(easeStep);
      } else {
        easeZRef.current = null;
      }
    };

    easeZRef.current = requestAnimationFrame(easeStep);
  }, [registerInteraction, soundEnabled]);

  // ─────────────────────────────────────────────────────────────
  // 4. Input Listeners
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e) => {
      if (focusedId) return;
      e.preventDefault();
      registerInteraction();
      physics.current.targetZ += e.deltaY * 1.5;

      // Mellow wind flutter when cruising through tunnel (volume 0.18)
      const now = Date.now();
      if (now - lastWheelSoundRef.current > 450 && Math.abs(e.deltaY) > 15) {
        lastWheelSoundRef.current = now;
        playWindSwoosh('soft', { volume: 0.18, soundEnabled });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) container.removeEventListener('wheel', handleWheel);
    };
  }, [focusedId, registerInteraction, soundEnabled]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (focusedId) {
        if (e.key === 'Escape') {
          closeFocus();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          goToNextPoster();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          goToPrevPoster();
        }
        return;
      }
      if (showProjectInfo) {
        if (e.key === 'Escape') setShowProjectInfo(false);
        return;
      }

      registerInteraction();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        physics.current.targetZ += 380;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        physics.current.targetZ -= 380;
      } else if (e.key === ' ') {
        setIsAutoPlay(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedId, showProjectInfo, registerInteraction, closeFocus, goToNextPoster, goToPrevPoster]);

  const handleCanvasPointerDown = (e) => {
    if (focusedId || showProjectInfo || dragRef.current.isDragging) return;
    // Don't start canvas drag if the user clicked on a poster card, button, or header
    if (e.target.closest('button, header, [data-poster-card]')) return;

    registerInteraction();
    const p = physics.current;
    p.isCanvasDragging = true;
    p.dragStartX = e.clientX;
    p.dragStartPanX = p.targetPanX;
    p.dragStartY = e.clientY;
    p.dragStartScrollZ = p.targetZ;
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (drag.isDragging) {
      registerInteraction();
      const deltaX = e.clientX - drag.startX;
      const deltaY = e.clientY - drag.startY;
      const prevDeltaX = drag.deltaX;
      drag.currentX = e.clientX;
      drag.currentY = e.clientY;
      drag.deltaX = deltaX;
      drag.deltaY = deltaY;
      drag.velocity = deltaX - prevDeltaX;

      // Subtle textured air glide while dragging towards the center
      const now = Date.now();
      const moveDistance = Math.hypot(deltaX, deltaY);
      if (moveDistance > 35 && now - lastDragMoveSoundRef.current > 420) {
        lastDragMoveSoundRef.current = now;
        playWindSwoosh('drag-move', { soundEnabled });
      }
      return;
    }

    const p = physics.current;
    if (!p.isCanvasDragging || focusedId) return;
    registerInteraction();
    const deltaX = e.clientX - p.dragStartX;
    const deltaY = e.clientY - p.dragStartY;
    p.targetPanX = p.dragStartPanX + deltaX * 1.1;
    p.targetZ = p.dragStartScrollZ - deltaY * 1.8;
  };

  const handlePointerUp = () => {
    const drag = dragRef.current;
    if (drag.isDragging) {
      const { deltaX, deltaY, velocity, cardId, cardIndex, baseZ, currentX, currentY } = drag;
      const totalMove = Math.hypot(deltaX, deltaY);
      const distToCenter = Math.hypot(currentX - window.innerWidth / 2, currentY - window.innerHeight / 2);

      // 1. DRAG TO CENTER TO VIEW: If card is dropped within center viewing zone
      if (distToCenter < 210 && totalMove > 15) {
        openFocus(cardId);
      }
      // 2. Fling / Throw horizontally into the abyss
      else if (Math.abs(deltaX) > 110 || Math.abs(velocity) > 10) {
        const direction = deltaX > 0 || velocity > 0 ? 1 : -1;
        triggerThrow(cardId, direction);
      }
      // 3. Click without dragging: on background card -> bring smoothly to front
      else if (totalMove < 10) {
        if (baseZ < -80 || cardIndex !== activePosterIndex) {
          bringCardToFront(cardId);
        }
      }

      // Reset drag ref & state
      drag.isDragging = false;
      drag.cardId = null;
      drag.isOverCenter = false;
      setDraggingCardId(null);
    }

    physics.current.isCanvasDragging = false;
  };

  const activeCard = items[activePosterIndex] || items[0];
  const focusedCard = items.find(c => c.id === focusedId);
  const displayCard = focusedCard || activeCard;

  return (
    <div 
      ref={containerRef}
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`fixed inset-0 w-full h-full bg-[#050507] text-white overflow-hidden select-none font-sans touch-none ${
        draggingCardId ? 'cursor-grabbing' : physics.current.isCanvasDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      
      {/* ── 3D Front-Hemisphere Mesh Dome Canvas (Visible in Background, Crisp 60fps) ── */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-90"
      />

      {/* ── Ambient Background Tint Layer (Positioned behind cards at z-5) ── */}
      <div 
        onClick={() => closeFocus()}
        className={`absolute inset-0 z-5 bg-black/60 transition-opacity duration-600 ${
          focusedId ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Minimalist Top Navigation ── */}
      <header 
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute top-0 left-0 right-0 z-40 px-4 sm:px-10 py-4 sm:py-5 flex items-center justify-between pointer-events-auto"
      >
        <button
          onClick={() => {
            playWindSwoosh('soft', { volume: 0.25, soundEnabled });
            onBack();
          }}
          className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 backdrop-blur-md transition-all duration-200"
        >
          <ArrowLeft size={14} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Exit</span>
        </button>

        {/* Center Title & Day indicator (Mathematically centered on screen) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md z-10 pointer-events-auto whitespace-nowrap shadow-sm">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
          <span className="hidden md:inline text-xs font-mono tracking-widest uppercase font-bold text-white/90">
            30-Day Poster Sprint
          </span>
          <span className="md:hidden text-[11px] font-mono tracking-wider uppercase font-bold text-white/90">
            Sprint
          </span>
          <span className="text-white/40 text-xs font-mono">•</span>
          <span className="text-[11px] sm:text-xs font-mono text-orange-400 font-bold">
            {displayCard ? displayCard.day : 'Day 01'} / 30
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              playWindSwoosh('soft', { volume: 0.25, soundEnabled });
              setIsAutoPlay(prev => !prev);
            }}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-white transition-colors cursor-pointer"
            title={isAutoPlay ? 'Pause auto-cruise' : 'Resume auto-cruise'}
          >
            {isAutoPlay ? (
              <>
                <Pause size={12} weight="fill" className="text-orange-400" />
                <span className="hidden md:inline">Cruise: ON</span>
              </>
            ) : (
              <>
                <Play size={12} weight="fill" className="text-white/60" />
                <span className="hidden md:inline">Cruise: OFF</span>
              </>
            )}
          </button>

          {/* Details Modal Trigger Icon Button */}
          <button
            onClick={() => {
              playWindSwoosh('focus', { volume: 0.28, soundEnabled });
              setShowProjectInfo(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Project Details & Story"
          >
            <Info size={14} weight="bold" className="text-orange-400" />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>
      </header>

      {/* ── 3D SIMULATED ONE-POINT PERSPECTIVE TUNNEL (z-10, in front of blur layer) ── */}
      <div 
        className="w-full h-full relative flex items-center justify-center overflow-hidden z-10"
        style={{
          perspective: '1100px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div 
          className="w-full h-full relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((poster, index) => {
            const imagePath = `/posters/${encodeURIComponent(poster.filename)}`;
            const isThrowing = thrownCardIds.has(poster.id);
            const isFocused = focusedId === poster.id;
            const isClosing = closingCardId === poster.id;

            return (
              <div
                key={poster.id}
                data-poster-card
                data-index={index}
                data-id={poster.id}
                onPointerDown={(e) => {
                  if (focusedId) return;
                  if (e.button !== 0) return;
                  e.stopPropagation();

                  const currentPos = cardCoordsRef.current[poster.id] || { x: 0, y: 0, z: 0, rotY: 0, rotZ: 0 };

                  dragRef.current = {
                    isDragging: true,
                    cardId: poster.id,
                    cardIndex: index,
                    startX: e.clientX,
                    startY: e.clientY,
                    currentX: e.clientX,
                    currentY: e.clientY,
                    deltaX: 0,
                    deltaY: 0,
                    velocity: 0,
                    baseX: currentPos.x,
                    baseY: currentPos.y,
                    baseZ: currentPos.z,
                    baseRotY: currentPos.rotY,
                    baseRotZ: currentPos.rotZ,
                    isOverCenter: false
                  };

                  try {
                    e.currentTarget.setPointerCapture(e.pointerId);
                  } catch (err) {
                    // Ignore if unsupported
                  }

                  setDraggingCardId(poster.id);
                  playWindSwoosh('drag-start', { soundEnabled });
                }}
                className={`absolute w-[280px] xs:w-[325px] sm:w-[370px] md:w-[415px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20 select-none group flex flex-col will-change-transform ${
                  isThrowing 
                    ? 'transition-transform duration-500 ease-in' 
                    : isFocused 
                    ? 'transition-[transform,box-shadow,border-color] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_35px_100px_rgba(0,0,0,0.98)] border-white/40' 
                    : isClosing
                    ? 'transition-[transform,box-shadow,border-color] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
                    : draggingCardId === poster.id 
                    ? 'transition-none cursor-grabbing shadow-[0_30px_90px_rgba(249,115,22,0.35)] border-orange-500' 
                    : 'transition-none cursor-grab active:cursor-grabbing hover:border-orange-500/60'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* 1:1 Native Artwork Container (Ultra-Sharp, Never Blurred) */}
                <div className="w-full h-full relative overflow-hidden bg-zinc-950 flex items-center justify-center">
                  <img
                    src={imagePath}
                    alt={poster.title}
                    draggable={false}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />

                  {/* Behind Card Cue */}
                  {index !== activePosterIndex && !focusedId && (
                    <div 
                      className="absolute inset-0 bg-black/25 hover:bg-black/5 transition-colors flex items-center justify-center cursor-grab active:cursor-grabbing z-20 pointer-events-none"
                    >
                      <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg pointer-events-none">
                        <span>Drag to View · Click to Front</span>
                      </span>
                    </div>
                  )}

                  {/* View Button in DEAD CENTER of the Foreground Card */}
                  {index === activePosterIndex && !focusedId && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto z-20">
                      <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          openFocus(poster.id);
                        }}
                        className="px-5 py-2.5 rounded-full bg-black/80 hover:bg-orange-500 text-white text-xs font-mono font-bold flex items-center gap-2 border border-white/25 hover:border-orange-500 shadow-2xl backdrop-blur-md transition-all duration-200 transform group-hover:scale-105 active:scale-95"
                      >
                        <Eye size={15} weight="bold" />
                        <span>View</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Drag to Center Drop Zone Reticle ── */}
      <div 
        ref={dropZoneRef}
        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-opacity duration-300 ${
          draggingCardId && !focusedId ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          data-drop-indicator
          className="w-[280px] xs:w-[325px] sm:w-[370px] md:w-[415px] aspect-square rounded-2xl sm:rounded-3xl border-2 border-dashed border-white/25 bg-white/[0.03] backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 transition-all duration-200 pointer-events-none"
        >
          <div 
            data-drop-icon
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 border border-white/15 transition-all duration-200"
          >
            <Eye size={22} weight="bold" />
          </div>
          <div className="text-center">
            <span 
              data-drop-title
              className="text-xs font-mono tracking-widest uppercase font-bold text-white/90 block transition-colors duration-200"
            >
              Drop to View
            </span>
            <span className="text-[10px] font-mono text-white/40 tracking-wider">
              Release card in center to view
            </span>
          </div>
        </div>
      </div>

      {/* ── IN-SCENE FOCUS OVERLAY & DETAILS ── */}
      {focusedCard && (
        <div 
          onClick={(e) => {
            // Clicking anywhere outside interactive children closes focus
            if (e.target === e.currentTarget || e.target.getAttribute('data-backdrop-close') === 'true') {
              closeFocus();
            }
          }}
          className="absolute inset-0 z-50 flex flex-col justify-between items-center py-6 sm:py-8 pointer-events-auto select-none"
        >
          {/* Close button and Navigation buttons positioned around the focused image container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Exactly matches focused card's 3D rendered box (md: 415px * 1.15 = 478px, -20px offset) */}
            <div className="relative w-[322px] xs:w-[374px] sm:w-[425px] md:w-[478px] aspect-square flex items-center justify-center pointer-events-none -translate-y-5">
              
              {/* Previous Poster Button (Left) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevPoster();
                }}
                className="absolute -left-4 sm:-left-16 md:-left-20 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md cursor-pointer pointer-events-auto transform hover:scale-105 active:scale-95"
                title="Previous Poster (Left Arrow)"
              >
                <CaretLeft size={20} weight="bold" />
              </button>

              {/* Next Poster Button (Right) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextPoster();
                }}
                className="absolute -right-4 sm:-right-16 md:-right-20 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md cursor-pointer pointer-events-auto transform hover:scale-105 active:scale-95"
                title="Next Poster (Right Arrow)"
              >
                <CaretRight size={20} weight="bold" />
              </button>

              {/* Close Button positioned top-right NEXT TO the focused image container with a clean gap */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFocus();
                }}
                className="absolute right-0 -top-14 sm:-right-20 md:-right-24 sm:-top-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md cursor-pointer pointer-events-auto transform hover:scale-105 active:scale-95"
                title="Close (Esc or Click Outside)"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>

          {/* Clickable transparent backdrop area surrounding the central image */}
          <div 
            data-backdrop-close="true"
            onClick={() => {
              closeFocus();
            }}
            className="flex-1 w-full flex items-center justify-center cursor-pointer"
          />

          {/* Details pulled down near the bottom with clean spacing */}
          {showDetails && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl mx-auto px-6 text-center space-y-1.5 relative z-40 pointer-events-auto animate-slide-up"
            >
              {/* Day & Type of Art Style Badge with dimmed down Day tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
                <span className="text-white/40">{focusedCard.day}</span>
                <span className="text-white/25">•</span>
                <span className="text-orange-400/90 font-medium">Art Style: {focusedCard.artStyle || `${focusedCard.tag} Modernism`}</span>
              </div>

              {/* Poster Title - 32px bold font-sans */}
              <h2 className="text-2xl sm:text-[32px] font-bold font-sans tracking-tight text-white drop-shadow-md">
                {focusedCard.title}
              </h2>
            </div>
          )}
        </div>
      )}

      {/* ── MINIMAL BOTTOM HINT ── */}
      {!focusedId && !showProjectInfo && (
        <footer className="absolute bottom-5 left-0 right-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <p className="text-[11px] font-mono tracking-widest text-white/40 uppercase drop-shadow-sm">
            SCROLL TO ADVANCE · DRAG TO CENTER TO VIEW · FLING TO DISCARD
          </p>
        </footer>
      )}

      {/* ── PROJECT DETAILS MODAL OVERLAY (Bold Portfolio Hero Typography) ── */}
      {showProjectInfo && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget || e.target.getAttribute('data-backdrop-info') === 'true') {
              playWindSwoosh('soft', { volume: 0.25, soundEnabled });
              setShowProjectInfo(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md transition-all duration-300 pointer-events-auto select-none"
        >
          {/* Card Container in Center of Canvas */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full p-8 sm:p-11 md:p-12 rounded-3xl bg-[#0a0a0f]/95 border border-white/15 shadow-[0_35px_120px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-left overflow-hidden group"
          >
            {/* Subtle ambient orange glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button at top-right */}
            <button
              onClick={() => {
                playWindSwoosh('soft', { volume: 0.25, soundEnabled });
                setShowProjectInfo(false);
              }}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-lg backdrop-blur-md cursor-pointer transform hover:scale-105 active:scale-95 z-20"
              title="Close (Esc or Click Outside)"
            >
              <X size={17} weight="bold" />
            </button>

            {/* Availability / Sprint Status Pill */}
            <div className="flex items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold tracking-wider uppercase text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-orange-400">Project Brief</span>
                <span className="text-white/30">•</span>
                <span className="text-white/70">Rapid Sprint</span>
              </div>
            </div>

            {/* Master Statement in Bold Portfolio Hero Style */}
            <div className="space-y-1 select-none">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-sans font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.14]">
                This is a{' '}
                <span className="font-serif italic font-normal text-orange-500 dark:text-orange-400">
                  poster challenge
                </span>{' '}
                done using{' '}
                <span className="text-white">Photoshop</span>{' '}
                under{' '}
                <span className="font-serif italic font-normal text-orange-500 dark:text-orange-400">
                  2 hours
                </span>{' '}
                coming with idea, concept and design{' '}
                <span className="font-serif italic font-normal text-orange-500 dark:text-orange-400 underline decoration-orange-500/40 underline-offset-4">
                  onspot.
                </span>
              </h2>
            </div>

            {/* Metadata Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/50">
              <div className="flex items-center gap-3.5">
                <span><strong className="text-white font-bold">Tool:</strong> Adobe Photoshop</span>
                <span>•</span>
                <span><strong className="text-white font-bold">Limit:</strong> &lt; 2 Hours</span>
                <span>•</span>
                <span><strong className="text-white font-bold">Pacing:</strong> 30 Days</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PosterChallengePage;
