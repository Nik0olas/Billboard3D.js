let cameraX = -1
let cameraY = 0
let cameraZ = 0
const distanceToScreen = 300

let cameraYDirecton = 0
let cameraXDirection = 0
let rotatedX = 0
let rotatedZ = 0

// Array to hold all blocks
const blocks = []
const collisionBoxes = []
const collisionBoxVisuals = []

// Gravity
let velY = 0 // vertical velocity
let gravity = 0.5 // positive gravity pulls down
let jumpStrength = -15 // jump impulse velocity
let onGround = false // whether player is on ground
let defaultGroundY = 0

let blockIdCounter = 0
let collisionBoxIdCounter = 0

const blockTypes = {}

export function registerBlockType(typeName, createFn) {
  blockTypes[typeName] = createFn
}

export function addBlock(type, x, y, z, options = {}) {
  let obj

  if (blockTypes[type]) {
    obj = add(blockTypes[type]())
  } else {
    debug.error(`Block type "${type}" not registered.`)
    return
  }

  const block = {
    id: blockIdCounter++,
    type,
    tags: options.tags || [],
    obj,
    x,
    y,
    z,
    data: options.data || {},
    scale: options.scale || 1,
  }

  blocks.push(block)
  return block
}

function getBlockById(id) {
  return blocks.find((b) => b.id === id)
}

function getBlocksByTag(tag) {
  return blocks.filter((b) => b.tags.includes(tag))
}

export function moveBlockToId(id, x, y, z, speed = 1) {
  const block = getBlockById(id)
  if (block) moveBlockTo(block, x, y, z, speed)
}

export function moveAllWithTag(tag, x, y, z, speed = 1) {
  const tagged = getBlocksByTag(tag)
  for (const block of tagged) {
    moveBlockTo(block, x, y, z)
  }
}

function moveBlockTo(block, x, y, z) {
  block.x = x
  block.y = y
  block.z = z
}

export function set3DGroundLevel(value) {
  defaultGroundY = value
}

export function set3DGravity(value) {
  gravity = value
}

export function set3DJumpStrength(value) {
  jumpStrength = value - value * 2
}

export function getCameraDirections() {
  return { cameraXDirection, cameraYDirecton }
}

export function moveCamera(dir, moveSpeed) {
  switch (dir) {
    case "forward":
      tryMoveCamera(
        Math.sin(cameraYDirecton) * moveSpeed,
        0,
        Math.cos(cameraYDirecton) * moveSpeed,
      )
      break
    case "backward":
      tryMoveCamera(
        -Math.sin(cameraYDirecton) * moveSpeed,
        0,
        -Math.cos(cameraYDirecton) * moveSpeed,
      )
      break
    case "left":
      tryMoveCamera(
        -Math.cos(cameraYDirecton) * moveSpeed,
        0,
        Math.sin(cameraYDirecton) * moveSpeed,
      )
      break
    case "right":
      tryMoveCamera(
        Math.cos(cameraYDirecton) * moveSpeed,
        0,
        -Math.sin(cameraYDirecton) * moveSpeed,
      )
      break
  }
}

export function rotateCamera(dir, speed) {
  if (dir == "y") {
    cameraYDirecton += speed
  }
  if (dir == "x") {
    cameraXDirection -= speed

    const maxPitch = Math.PI / 2 - 0.01
    const minPitch = -Math.PI / 2 + 0.01
    cameraXDirection = Math.max(minPitch, Math.min(maxPitch, cameraXDirection))
  }
}

export function getCameraPos() {
    return {
        x: cameraX,
        y: cameraY,
        z: cameraZ
    }
}

export function addInteractionBox(
  x,
  y,
  z,
  sizeX,
  sizeY,
  sizeZ,
  visible = false,
  options = {},
) {
  const collisionBox = {
    id: collisionBoxIdCounter++,
    x,
    y,
    z,
    sizeX,
    sizeY,
    sizeZ,
    tags: options.tags || [],
    onCollide: options.onCollide || null,
    onClick: options.onClick || null,
  }

  collisionBoxes.push(collisionBox)

  if (visible) {
    const volume = sizeX * sizeY * sizeZ
    const smallCubeSize = Math.max(10, Math.cbrt(volume) / 2)

    const minX = x - sizeX / 2
    const minY = y - sizeY / 2
    const minZ = z - sizeZ / 2

    const hasClick = typeof options.onClick === "function"
    const hasCollide = typeof options.onCollide === "function"

    const colorToUse =
      hasClick && hasCollide
        ? color(128, 0, 128, 100) // purple
        : hasClick
          ? color(255, 255, 0, 100) // yellow
          : hasCollide
            ? color(0, 0, 255, 100) // blue
            : color(255, 0, 0, 100) // red (default)

     for (let cx = minX; cx < minX + sizeX; cx += smallCubeSize) {
      for (let cy = minY; cy < minY + sizeY; cy += smallCubeSize) {
        for (let cz = minZ; cz < minZ + sizeZ; cz += smallCubeSize) {
          const obj = add([
            rect(smallCubeSize, smallCubeSize),
            pos(0, 0),
            colorToUse,
            anchor("center"),
            area({ width: smallCubeSize, height: smallCubeSize }),
            opacity(0.5),
          ])
          collisionBoxVisuals.push({
            obj,
            x: cx + smallCubeSize / 2,
            y: cy + smallCubeSize / 2,
            z: cz + smallCubeSize / 2,
            smallCubeSize,
            collisionBoxId: collisionBox.id,
          })
        }
      }
    }
  }

  return collisionBox
}

function getCollisionBoxById(id) {
  return collisionBoxes.find((box) => box.id === id)
}

function getCollisionBoxesByTag(tag) {
  return collisionBoxes.filter((box) => box.tags.includes(tag))
}

export function deleteAllCollisionBoxesWithTag(tag) {
  // Find all boxes with the tag
  const boxesToDelete = collisionBoxes.filter((box) => box.tags.includes(tag))
  const idsToDelete = new Set(boxesToDelete.map((box) => box.id))

  // Remove boxes from collisionBoxes
  for (let i = collisionBoxes.length - 1; i >= 0; i--) {
    if (idsToDelete.has(collisionBoxes[i].id)) {
      collisionBoxes.splice(i, 1)
    }
  }

  // Remove visuals associated with those boxes
  for (let i = collisionBoxVisuals.length - 1; i >= 0; i--) {
    if (idsToDelete.has(collisionBoxVisuals[i].collisionBoxId)) {
      collisionBoxVisuals[i].obj.destroy()
      collisionBoxVisuals.splice(i, 1)
    }
  }
}

export function billboard3djs() {
  onUpdate(() => {
    velY += gravity

    // Attempt to move vertically
    let movedVertically = tryMoveCamera(0, velY, 0)

    // Ground collision check with collision boxes
    if (!movedVertically) {
      if (velY > 0) {
        // Falling and hit ground or block from below
        onGround = true
      }
      velY = 0
    } else {
      onGround = false
    }

    // Ground boundary check
    if (cameraY > defaultGroundY) {
      cameraY = defaultGroundY
      velY = 0
      onGround = true
    }

    const screenCenterX = width() / 2
    const screenCenterY = height() / 2
    const maxRenderDistance = 1000
    sortAllBlocks()

    for (const block of blocks) {
      const localX = block.x - cameraX
      const localY = block.y - cameraY
      const localZ = block.z - cameraZ

      const rotated = rotatePoint(
        localX,
        localY,
        localZ,
        -cameraYDirecton,
        -cameraXDirection,
      )

      let dz = rotated.z
      if (dz <= 0) {
        block.obj.hidden = true
        continue
      } else {
        block.obj.hidden = false
      }

      const perspectiveScale = distanceToScreen / dz
      const finalScale = perspectiveScale * (block.scale || 1)

      block.obj.pos.x = screenCenterX + rotated.x * perspectiveScale
      block.obj.pos.y = screenCenterY + rotated.y * perspectiveScale
      block.obj.scale = finalScale
    }

    const screenWidth = width()
    const screenHeight = height()
    const buffer = 50
    for (const boxVis of collisionBoxVisuals) {
      // Relative position to camera
      const relX = boxVis.x - cameraX
      const relY = boxVis.y - cameraY
      const relZ = boxVis.z - cameraZ

      // Horizontal rotation (yaw) around Y axis
      const horizRot = rotationMatrix(relX, relZ, -cameraYDirecton)
      const afterYawX = horizRot.rotatedX
      const afterYawZ = horizRot.rotatedZ

      // Vertical rotation (pitch) around X axis
      const sinPitch = Math.sin(-cameraXDirection)
      const cosPitch = Math.cos(-cameraXDirection)

      const afterPitchY = relY * cosPitch - afterYawZ * sinPitch
      const afterPitchZ = relY * sinPitch + afterYawZ * cosPitch

      const dx = afterYawX
      const dy = afterPitchY
      let dz = afterPitchZ

      if (dz < 1) dz = 1

      const scale = distanceToScreen / dz

      const screenX = screenCenterX + dx * scale
      const screenY = screenCenterY + dy * scale

      // Culling off-screen
      if (
        dz < 1 ||
        screenX < -buffer ||
        screenX > screenWidth + buffer ||
        screenY < -buffer ||
        screenY > screenHeight + buffer
      ) {
        boxVis.obj.hidden = true
        continue
      }

      boxVis.obj.hidden = false
      boxVis.obj.pos.x = screenX
      boxVis.obj.pos.y = screenY
      boxVis.obj.width = boxVis.smallCubeSize * scale
      boxVis.obj.height = boxVis.smallCubeSize * scale
      boxVis.obj.z = 10000
    }
  })

  window.registerBlockType = registerBlockType
  window.addBlock = addBlock
  window.moveBlockToId = moveBlockToId
  window.moveAllWithTag = moveAllWithTag
  window.set3DGroundLevel = set3DGroundLevel
  window.set3DGravity = set3DGravity
  window.set3DJumpStrength = set3DJumpStrength
  window.getCameraDirections = getCameraDirections
  window.moveCamera = moveCamera
  window.rotateCamera = rotateCamera
  window.getCameraPos = getCameraPos
  window.addInteractionBox = addInteractionBox
  window.deleteAllCollisionBoxesWithTag = deleteAllCollisionBoxesWithTag
  window.jumpCamera = jumpCamera
  window.handleClickRaycast = handleClickRaycast
  window.setCameraPos = setCameraPos


}

export function jumpCamera() {
  if (onGround) {
    velY = jumpStrength
    onGround = false
  }
}

function rotationMatrix(x, z, direction) {
  const rotatedX = z * Math.sin(direction) + x * Math.cos(direction)
  const rotatedZ = z * Math.cos(direction) - x * Math.sin(direction)

  return { rotatedX, rotatedZ }
}
function rotationMatrixUpAndDown(y, z, direction) {
  const rotatedY = y * Math.cos(direction) - z * Math.sin(direction)
  const rotatedZ = y * Math.sin(direction) + z * Math.cos(direction)
  return { rotatedY, rotatedZ }
}

function sortAllBlocks() {
  blocks.sort((a, b) => {
    const distA = Math.sqrt(
      (a.x - cameraX) ** 2 + (a.y - cameraY) ** 2 + (a.z - cameraZ) ** 2,
    )
    const distB = Math.sqrt(
      (b.x - cameraX) ** 2 + (b.y - cameraY) ** 2 + (b.z - cameraZ) ** 2,
    )
    return distA - distB
  })

  let baseZIndex = 10000
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].obj.z = 10000 - i
  }
}

function isCollidingWithCollisionBox(camX, camY, camZ, box) {
  return (
    camX > box.x - box.sizeX / 2 &&
    camX < box.x + box.sizeX / 2 &&
    camY > box.y - box.sizeY / 2 &&
    camY < box.y + box.sizeY / 2 &&
    camZ > box.z - box.sizeZ / 2 &&
    camZ < box.z + box.sizeZ / 2
  )
}

function tryMoveCamera(dx, dy, dz) {
  const newX = cameraX + dx
  const newY = cameraY + dy
  const newZ = cameraZ + dz

  let blocked = false

  for (const box of collisionBoxes) {
    if (isCollidingWithCollisionBox(newX, newY, newZ, box)) {
      if (typeof box.onCollide === "function") {
        // Call the handler, but don’t block
        box.onCollide({
          cameraX,
          cameraY,
          cameraZ,
          box,
          attemptedX: newX,
          attemptedY: newY,
          attemptedZ: newZ,
        })
      } else if (!box.onClick) {
        // Only block if neither handler exists
        blocked = true
      }
    }
  }

  if (blocked) return false

  // No blockers, apply movement
  cameraX = newX
  cameraY = newY
  cameraZ = newZ
  return true
}

function rotatePoint(x, y, z, yaw, pitch) {
  // Yaw (around Y-axis)
  const cosYaw = Math.cos(yaw)
  const sinYaw = Math.sin(yaw)
  let x1 = x * cosYaw + z * sinYaw
  let y1 = y
  let z1 = -x * sinYaw + z * cosYaw

  // Pitch (around X-axis)
  const cosPitch = Math.cos(pitch)
  const sinPitch = Math.sin(pitch)
  let x2 = x1
  let y2 = y1 * cosPitch - z1 * sinPitch
  let z2 = y1 * sinPitch + z1 * cosPitch

  return { x: x2, y: y2, z: z2 }
}

export function handleClickRaycast() {
  let rayOrigin
  let rayDir

  if (isCursorLocked()) {
    // Use camera direction
    rayOrigin = { x: cameraX, y: cameraY, z: cameraZ }
    rayDir = {
      x: Math.sin(cameraYDirecton) * Math.cos(cameraXDirection),
      y: -Math.sin(cameraXDirection),
      z: Math.cos(cameraYDirecton) * Math.cos(cameraXDirection),
    }
  } else {
    // Use mouse position as source of ray
    const mouseX = mousePos().x
    const mouseY = mousePos().y

    const screenCenterX = 640
    const screenCenterY = 400

    // Convert screen space to camera-relative space
    const relX = (mouseX - screenCenterX) / distanceToScreen
    const relY = (mouseY - screenCenterY) / distanceToScreen
    const relZ = 1

    // Apply inverse camera rotation to convert to world direction
    const rotated = rotatePoint(
      relX,
      relY,
      relZ,
      cameraYDirecton,
      cameraXDirection,
    )

    rayOrigin = { x: cameraX, y: cameraY, z: cameraZ }
    rayDir = normalizeVector(rotated)
  }

  let closestBox = null
  let closestDistance = Infinity

  for (const box of collisionBoxes) {
    if (typeof box.onClick !== "function") continue

    const hit = rayIntersectsBox(rayOrigin, rayDir, box)
    if (hit && hit.distance < closestDistance) {
      closestDistance = hit.distance
      closestBox = box
    }
  }

  if (closestBox) {
    if (closestBox.onClick.length === 0) {
      closestBox.onClick()
    } else {
      closestBox.onClick({
        cameraX,
        cameraY,
        cameraZ,
        box: closestBox,
      })
    }
  }
}

function normalizeVector(vec) {
  const length = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z)
  return {
    x: vec.x / length,
    y: vec.y / length,
    z: vec.z / length,
  }
}

function rayIntersectsBox(origin, dir, box) {
  const min = {
    x: box.x - box.sizeX / 2,
    y: box.y - box.sizeY / 2,
    z: box.z - box.sizeZ / 2,
  }
  const max = {
    x: box.x + box.sizeX / 2,
    y: box.y + box.sizeY / 2,
    z: box.z + box.sizeZ / 2,
  }

  let tMin = -Infinity
  let tMax = Infinity

  for (const axis of ["x", "y", "z"]) {
    if (Math.abs(dir[axis]) < 0.0001) {
      if (origin[axis] < min[axis] || origin[axis] > max[axis]) return null
    } else {
      const t1 = (min[axis] - origin[axis]) / dir[axis]
      const t2 = (max[axis] - origin[axis]) / dir[axis]
      const tNear = Math.min(t1, t2)
      const tFar = Math.max(t1, t2)
      tMin = Math.max(tMin, tNear)
      tMax = Math.min(tMax, tFar)
      if (tMin > tMax || tMax < 0) return null
    }
  }

  return { distance: tMin }
}

export function setCameraPos(x, y, z) {
  cameraX = x
  cameraY = y
  cameraZ = z
}
