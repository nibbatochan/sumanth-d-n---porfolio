// Ultra-Large 118x42 Columbidae 3D Flying Dove with Interactive Gun Aim & Projectile Miss Mechanics

export class RealisticAsciiDove {
  constructor(width = 118, height = 42) {
    this.width = width;
    this.height = height;
    this.time = 0;
    this.mouseX = 0.5;
    this.mouseY = 0.5;
    this.targetMouseX = 0.5;
    this.targetMouseY = 0.5;

    this.isLooping = false;
    this.loopProgress = 0;

    // Evasive Dodge state
    this.isDodging = false;
    this.dodgeProgress = 0;
    this.dodgeDirection = 1;

    // Projectile tracking
    this.projectiles = [];

    // Ambient floating breeze particles
    this.breeze = [];
    for (let i = 0; i < 20; i++) {
      this.breeze.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        speed: 0.8 + Math.random() * 1.8,
        char: ['~', '·', '°', '-'][Math.floor(Math.random() * 4)]
      });
    }

    this.chars = " .·:=+*#%@";
  }

  setMouse(x, y) {
    this.targetMouseX = Math.max(0, Math.min(1, x));
    this.targetMouseY = Math.max(0, Math.min(1, y));
  }

  triggerLoop() {
    if (!this.isLooping && !this.isDodging) {
      this.isLooping = true;
      this.loopProgress = 0;
    }
  }

  shootProjectile(originX = 0.5, originY = 0.5) {
    // Projectile originates from click location and shoots past the dove into depth
    const normX = (originX - 0.5) * 2.2;
    const normY = (originY - 0.5) * 1.4;

    // The projectile aims near the bird but narrowly misses (misses to upper-right or lower-left)
    const missOffsetX = (Math.random() > 0.5 ? 0.35 : -0.35);
    const missOffsetY = (Math.random() > 0.5 ? 0.28 : -0.28);

    this.projectiles.push({
      x: normX,
      y: normY,
      z: 0.6,
      vx: (missOffsetX - normX) * 0.12,
      vy: (missOffsetY - normY) * 0.12,
      vz: 0.28,
      age: 0,
      life: 28
    });

    // Startle the bird: swift evasive banking roll to dodge the bullet!
    this.isDodging = true;
    this.dodgeProgress = 0;
    this.dodgeDirection = missOffsetX > 0 ? -1 : 1;
  }

  nextFrame() {
    this.time += 0.056;

    this.mouseX += (this.targetMouseX - this.mouseX) * 0.12;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.12;

    let loopOffsetX = 0;
    let loopOffsetY = 0;
    let loopOffsetZ = 0;
    let loopPitch = 0;
    let loopRoll = 0;

    // 1. Loop-the-loop stunt
    if (this.isLooping) {
      this.loopProgress += 0.036;
      const angle = this.loopProgress * Math.PI * 2;
      
      loopOffsetY = -Math.sin(angle) * 0.68;
      loopOffsetZ = -(1 - Math.cos(angle)) * 0.58;
      loopOffsetX = Math.sin(angle) * 0.38;
      loopPitch = -angle;
      loopRoll = Math.sin(angle) * 0.46;

      if (this.loopProgress >= 1.0) {
        this.isLooping = false;
        this.loopProgress = 0;
      }
    }

    // 2. Evasive Dodge Reaction when shot at (Quick swerve & recovery)
    let dodgeOffsetX = 0;
    let dodgeOffsetY = 0;
    let dodgeRoll = 0;
    if (this.isDodging) {
      this.dodgeProgress += 0.055;
      const dPhase = Math.sin(this.dodgeProgress * Math.PI);
      dodgeOffsetX = this.dodgeDirection * dPhase * 0.45;
      dodgeOffsetY = -dPhase * 0.22;
      dodgeRoll = this.dodgeDirection * dPhase * 0.75;

      if (this.dodgeProgress >= 1.0) {
        this.isDodging = false;
        this.dodgeProgress = 0;
      }
    }

    // Dynamic flight translation
    const flightTransX = (this.mouseX - 0.5) * 1.45 + loopOffsetX + dodgeOffsetX;
    const flightTransY = (this.mouseY - 0.5) * 0.82 + loopOffsetY + dodgeOffsetY;

    const flapCycle = Math.sin(this.time * 5.2);
    const flapAngle = flapCycle * 0.64;
    const wingTipLag = Math.sin(this.time * 5.2 - 0.35) * 0.26;

    const bankZ = (this.mouseX - 0.5) * 0.60 + loopRoll + dodgeRoll;
    const pitchX = (this.mouseY - 0.5) * 0.38 - (flapCycle * 0.03) + loopPitch;
    const yawY = (this.mouseX - 0.5) * 0.45;
    const bobY = Math.sin(this.time * 5.2) * 0.05;

    const b = new Array(this.width * this.height).fill(' ');
    const zBuf = new Array(this.width * this.height).fill(-999);

    const cx = this.width / 2 - 6;
    const cy = this.height / 2;

    const points = [];

    const line3D = (p1, p2, type, steps = 16) => {
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        points.push({
          x: p1.x + (p2.x - p1.x) * t,
          y: p1.y + (p2.y - p1.y) * t,
          z: p1.z + (p2.z - p1.z) * t,
          type
        });
      }
    };

    const quad3D = (p1, p2, p3, p4, type, su = 13, sv = 9) => {
      for (let u = 0; u <= su; u++) {
        const tu = u / su;
        const ax = p1.x + (p2.x - p1.x) * tu;
        const ay = p1.y + (p2.y - p1.y) * tu;
        const az = p1.z + (p2.z - p1.z) * tu;

        const bx = p4.x + (p3.x - p4.x) * tu;
        const by = p4.y + (p3.y - p4.y) * tu;
        const bz = p4.z + (p3.z - p4.z) * tu;

        for (let v = 0; v <= sv; v++) {
          const tv = v / sv;
          points.push({
            x: ax + (bx - ax) * tv,
            y: ay + (by - ay) * tv,
            z: az + (bz - az) * tv,
            type
          });
        }
      }
    };

    // --- 1. DETAILED DOVE HEAD & EXTENDED BEAK ---
    const headCenter = { x: 0.24, y: -0.06 + bobY, z: 0.45 };
    const beakBase = { x: 0.38, y: -0.05 + bobY, z: 0.52 };
    const beakTip = { x: 0.54, y: -0.03 + bobY, z: 0.58 };
    const beakLower = { x: 0.48, y: 0.00 + bobY, z: 0.54 };
    const eyePoint = { x: 0.27, y: -0.09 + bobY, z: 0.49 };

    for (let u = -0.14; u <= 0.14; u += 0.024) {
      for (let v = -0.14; v <= 0.14; v += 0.024) {
        for (let w = -0.14; w <= 0.14; w += 0.024) {
          if (u * u + v * v + w * w <= 0.020) {
            points.push({
              x: headCenter.x + u,
              y: headCenter.y + v,
              z: headCenter.z + w,
              type: 'head'
            });
          }
        }
      }
    }
    line3D(headCenter, beakBase, 'beak', 10);
    line3D(beakBase, beakTip, 'beak', 12);
    line3D(beakBase, beakLower, 'beak', 10);
    line3D(beakLower, beakTip, 'beak', 10);
    points.push({ ...eyePoint, type: 'eye' });

    // --- 2. PLUMP DOVE BREAST & BODY ---
    for (let bz = -0.38; bz <= 0.35; bz += 0.032) {
      for (let bx = -0.24; bx <= 0.20; bx += 0.032) {
        for (let by = 0.00; by <= 0.42; by += 0.032) {
          const chestDist = ((bx + 0.04) * (bx + 0.04)) / 0.054 + ((by - (0.19 + bobY)) * (by - (0.19 + bobY))) / 0.048 + (bz * bz) / 0.16;
          if (chestDist <= 1.0) {
            points.push({ x: bx, y: by, z: bz, type: 'body' });
          }
        }
      }
    }

    // --- 3. EXPANSIVE FOREGROUND WING (Left) ---
    const lShoulder = { x: 0.02, y: 0.08 + bobY, z: 0.12 };
    const lElbow = {
      x: -0.52,
      y: 0.08 + bobY - Math.sin(flapAngle) * 0.62,
      z: 0.04
    };
    const lWingTip = {
      x: -1.28,
      y: 0.08 + bobY - Math.sin(flapAngle) * 1.35 - wingTipLag * 0.38,
      z: -0.40
    };
    const lTrailingRoot = { x: -0.22, y: 0.24 + bobY, z: -0.24 };
    const lTrailingMid = { x: -0.70, y: 0.20 + bobY - Math.sin(flapAngle) * 0.44, z: -0.30 };

    quad3D(lShoulder, lElbow, lTrailingMid, lTrailingRoot, 'wing-inner', 12, 9);
    quad3D(lElbow, lWingTip, { x: lWingTip.x + 0.20, y: lWingTip.y + 0.20, z: lWingTip.z - 0.22 }, lTrailingMid, 'wing-outer', 14, 10);

    for (let f = 0; f < 8; f++) {
      const ft = f / 7;
      const fStart = {
        x: lElbow.x + (lTrailingMid.x - lElbow.x) * ft,
        y: lElbow.y + (lTrailingMid.y - lElbow.y) * ft,
        z: lElbow.z + (lTrailingMid.z - lElbow.z) * ft
      };
      const fEnd = {
        x: lWingTip.x + (0.35 * ft),
        y: lWingTip.y + (0.28 * ft),
        z: lWingTip.z - (0.32 * ft)
      };
      line3D(fStart, fEnd, 'feather-rib', 16);
    }

    // --- 4. EXPANSIVE BACKGROUND WING (Right) ---
    const rShoulder = { x: -0.08, y: 0.04 + bobY, z: 0.04 };
    const rElbow = {
      x: 0.32,
      y: 0.04 + bobY - Math.sin(flapAngle * 0.9 + 0.2) * 0.58,
      z: -0.04
    };
    const rWingTip = {
      x: 0.90,
      y: 0.04 + bobY - Math.sin(flapAngle * 0.9 + 0.2) * 1.24,
      z: -0.36
    };
    const rTrailingRoot = { x: 0.04, y: 0.16 + bobY, z: -0.16 };
    const rTrailingMid = { x: 0.48, y: 0.12 + bobY - Math.sin(flapAngle * 0.9 + 0.2) * 0.38, z: -0.26 };

    quad3D(rShoulder, rElbow, rTrailingMid, rTrailingRoot, 'back-wing', 10, 8);
    quad3D(rElbow, rWingTip, { x: rWingTip.x - 0.20, y: rWingTip.y + 0.16, z: rWingTip.z - 0.20 }, rTrailingMid, 'back-wing', 12, 9);

    // --- 5. FANNED DOVE TAIL ---
    const tailBase = { x: -0.26, y: 0.24 + bobY, z: -0.30 };
    const tailLeft = { x: -0.60, y: 0.40 + bobY, z: -0.78 };
    const tailRight = { x: -0.02, y: 0.38 + bobY, z: -0.80 };

    quad3D(tailBase, { x: -0.15, y: 0.24 + bobY, z: -0.30 }, tailRight, tailLeft, 'tail', 10, 8);

    // --- 6. 3D ROTATION & PROJECTION ---
    const cosY = Math.cos(0.20 + yawY), sinY = Math.sin(0.20 + yawY);
    const cosP = Math.cos(-0.08 + pitchX), sinP = Math.sin(-0.08 + pitchX);
    const cosR = Math.cos(-0.08 + bankZ), sinR = Math.sin(-0.08 + bankZ);

    for (let p of points) {
      const posX = p.x + flightTransX;
      const posY = p.y + flightTransY;
      const posZ = p.z + loopOffsetZ;

      let x1 = posX * cosY + posZ * sinY;
      let y1 = posY;
      let z1 = -posX * sinY + posZ * cosY;

      let x2 = x1;
      let y2 = y1 * cosP - z1 * sinP;
      let z2 = y1 * sinP + z1 * cosP;

      let x3 = x2 * cosR - y2 * sinR;
      let y3 = x2 * sinR + y2 * cosR;
      let z3 = z2 + 2.85;

      const fov = 37;
      let px = Math.floor(cx + (x3 / z3) * fov * 2.1);
      let py = Math.floor(cy + (y3 / z3) * fov * 1.04);

      if (px >= 0 && px < this.width && py >= 0 && py < this.height) {
        const idx = px + py * this.width;
        if (z3 < zBuf[idx] || zBuf[idx] === -999) {
          zBuf[idx] = z3;

          if (p.type === 'eye') {
            b[idx] = '@';
          } else if (p.type === 'beak') {
            b[idx] = '>';
          } else if (p.type === 'feather-rib') {
            b[idx] = (px % 2 === 0) ? '/' : '|';
          } else if (p.type === 'wing-outer') {
            b[idx] = (px % 2 === 0) ? '=' : '#';
          } else if (p.type === 'wing-inner' || p.type === 'back-wing') {
            b[idx] = (px % 2 === 0) ? '%' : '#';
          } else if (p.type === 'tail') {
            b[idx] = '=';
          } else {
            const light = (p.z * 0.45) - (y3 * 0.35) + (x3 * 0.3) + 0.48;
            const charIdx = Math.min(
              this.chars.length - 1,
              Math.max(0, Math.floor(light * (this.chars.length - 1)))
            );
            b[idx] = this.chars[charIdx];
          }
        }
      }
    }

    // --- 7. PROJECTILE TRACERS (Shoots forward and misses the bird) ---
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.x += proj.vx;
      proj.y += proj.vy;
      proj.z += proj.vz;
      proj.age++;

      const fov = 37;
      let projPx = Math.floor(cx + (proj.x / proj.z) * fov * 2.1);
      let projPy = Math.floor(cy + (proj.y / proj.z) * fov * 1.04);

      // Draw fast streak trail: "━", "═", "ᐳ", "*"
      const trailChars = ['*', '═', 'ᐳ', '·'];
      for (let t = 0; t < 3; t++) {
        const tx = projPx - Math.floor(proj.vx * t * 8);
        const ty = projPy - Math.floor(proj.vy * t * 8);
        if (tx >= 0 && tx < this.width && ty >= 0 && ty < this.height) {
          const idx = tx + ty * this.width;
          b[idx] = trailChars[t % trailChars.length];
        }
      }

      if (proj.age > proj.life || proj.z > 6.0) {
        this.projectiles.splice(i, 1);
      }
    }

    // --- 8. BREEZE PARTICLES ---
    for (let bp of this.breeze) {
      bp.x -= bp.speed;
      if (bp.x < 0) {
        bp.x = this.width - 1;
        bp.y = Math.random() * this.height;
      }
      const px = Math.floor(bp.x);
      const py = Math.floor(bp.y);
      const idx = px + py * this.width;
      if (px >= 0 && px < this.width && py >= 0 && py < this.height && b[idx] === ' ') {
        b[idx] = bp.char;
      }
    }

    let output = '';
    for (let k = 0; k < this.width * this.height; k++) {
      output += (k % this.width === 0 && k !== 0 ? '\n' : '') + b[k];
    }
    return output;
  }
}
