<script>
import kaplay from "kaplay";
import { 
    initBillboard,
    registerBlockType,
    addBlock,
    moveAllWithTag,
    moveCamera,
    rotateCamera,
    set3DGroundLevel,
    set3DGravity,
    set3DJumpStrength,
    jumpCamera
} from "../game/billboard";
import { onMount } from "svelte";

onMount(() => {
    kaplay()
    initBillboard()

    add([
            rect(width(), height()),
            color(128, 128, 128)
        ])

    loadSprite("enemy", "playa1.png")
    loadSprite("shotgun", "sht2a0.png")
    loadSprite("steel", "steel.png")

    registerBlockType("steel", () => [
        sprite("steel"),
        pos(0, 0),
        anchor("center")
    ])

    registerBlockType("enemy", () => [
        sprite("enemy"),
        pos(0, 0),
        anchor("center")
    ])

    const shotgun = add([
        sprite("shotgun"),
        pos(width() / 2, height()),
        anchor("bot"),
        scale(5),
        z(10001)
    ])

    addBlock("enemy", 0, 0, 200, {
        scale: 2
    })
    addBlock("steel", 200, 30, 200)

    

    // Step 1: Speed
// While optional, it's recommended to define a speed for smoother control
let speed = 3


// Step 2: Add ground movement
// We'll use WASD keys, but you can use any keybindings you prefer        
onKeyDown("w", () => {
    moveCamera('forward', speed);
})
onKeyDown("s", () => {
    moveCamera('backward', speed);
})
onKeyDown("a", () => {
    moveCamera('left', speed);
})
onKeyDown("d", () => {
    moveCamera('right', speed);
})

// Step 3: Camera rotation
// We'll lock the mouse so the camera can rotate freely
onClick(() => {
    setCursorLocked(true) // Locks the cursor when the user clicks
})

// The default camera rotation speed is very fast, so we set a lower value for better control
let mouseSpeed = 0.001

// Move the camera based on mouse movement, only when the cursor is locked
document.addEventListener("mousemove", (e) => {
    if (isCursorLocked()) {
        rotateCamera("y", e.movementX * mouseSpeed)
        rotateCamera("x", e.movementY * mouseSpeed)
    }
});

// Step 4: Jumping & Gravity
// Here we define the floor level, gravity, and jump behavior
// Keep in mind that collision happen at camera level


set3DGroundLevel(-40) // Sets the floor level (default: 0)
set3DGravity(0.5) // Sets the gravity strength (default: 0.5)

onKeyPress("space", () => {
    jumpCamera(); // Makes the camera jump when it's on the ground
})

})
</script>