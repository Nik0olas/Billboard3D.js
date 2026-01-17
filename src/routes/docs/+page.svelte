<script>
  import Prism from "prismjs";
  import "prismjs/themes/prism-tomorrow.css"; // or any other theme you like
  import "prismjs/components/prism-javascript"; // highlight JS syntax
  import { onMount } from "svelte";

  let pageName = "";
  let pageContent = "";
  let code = "";

  onMount(() => {
    // Load initial page based on URL hash
    const hash = window.location.hash?.replace("#", "") || "start";
    changePage(hash);

    // Listen for hash changes (e.g. user clicks sidebar link or uses back/forward)
    window.addEventListener("hashchange", () => {
      const newHash = window.location.hash.replace("#", "");
      changePage(newHash);
    });
    code = Prism.highlight(code, Prism.languages.javascript, "javascript");
  });

  function changePage(page) {
    switch (page) {
      case "start":
        pageName = `Starting the project`;
        pageContent = `Welcome! In this documentation, you'll learn how to use the Billboard3D.js plugin with Kaplay.js. These docs cover the Billboard3D.js API, NOT the Kaplay.js API (but some aspects may appear). To learn more about Kaplay.js you can go to their official website https://kaplayjs.com/`;
        code = `
// Code examples will be shown here
// Go to https://kaplayjs.com/ to learn more about the Kaplay.js API`;
        break;
      case "install":
        pageName = "Instalation";
        pageContent =
          "To add the plugin to your Kaplay project, simply include our CDN link. Alternatively, you can manually add the code by copying it directly from the CDN.";
        code = `
import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import { billboard3djs } from "https://billboard3djs.nik.best/billboard.min.js";

kaplay();
billboard3djs(); // Make sure to start Billboard3D.js`;
        break;
      case "blocks":
        pageName = "Blocks";
        pageContent = `Blocks are visual sprites you can place anywhere in your 3D world. By default, they are purely decorative and have no built-in properties or behaviors. (Later in the docs, we'll cover how to use interaction boxes to add features like collisions.) \nBefore placing a block, you must first load the sprite using loadSprite from Kaplay, and then register it with registerBlock. See the examples below:`;
        code = `
import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import { billboard3djs } from "https://billboard3djs.nik.best/billboard.min.js";

kaplay();
billboard3djs();

// Step 1: Load your sprites
loadSprite("steel", "steel.png");

// Step 2: Register the block type
registerBlockType("BlockName", () => [
  sprite("steel"), // The name must match the one used in loadSprite
  pos(0, 0),        // Required! This sets a base position (Billboard3D.js uses its own positioning system)
  anchor("center")  // Optional: Set anchor point
]);

// Step 3: Add the block into the 3D world
addBlock("BlockName", -100, 0, 200);

// Optionally, you can add a **Billboard3DJS tag** to the block or scale the block.
// This is *not* the same as a Kaplay tag, it's used specifically by Billboard3D.js
addBlock("BlockName", 100, 0, 200, {
  tags: ["Billboard3DJSBlockTag"],
  scale: 2
});

// To move blocks with a specific BillboardJS tag,
// use the moveAllWithTag function.
// This immediately teleports matching blocks to the given position.
moveAllWithTag("Billboard3DJSBlockTag", 100, -200, 200);`;
        break;
      case "movement":
        pageName = `Movement`;
        pageContent = `In this section, you'll learn how to set up basic player movement and camera controls for your 3D world including walking with WASD, rotating the camera with the mouse, and jumping with gravity.

Before you begin, make sure you've added at least a few blocks to your scene otherwise, it'll be hard to tell if anything's moving!`;
        code = `
import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import { billboard3djs } from "https://billboard3djs.nik.best/billboard.min.js";

kaplay()
billboard3djs()

// Make sure to add some blocks first so you can see yourself move!

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


set3DGroundLevel(0) // Sets the floor level (default: 0)
set3DGravity(0.5) // Sets the gravity strength (default: 0.5)

onKeyPress("space", () => {
    jumpCamera(); // Makes the camera jump when it's on the ground
})`;
        break;
      case "interactionbox":
        pageName = "Interaction Box";
        pageContent = `Interaction boxes let you add interactivity to your 3D world. Whether it's creating a wall to stop player movement, detecting when a player enters a specific area, or responding to clicks. Interaction boxes are essential.

By combining them with blocks, you can bring your world to life and make your game truly functional.`;
        code = `
import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import { billboard3djs } from "https://billboard3djs.nik.best/billboard.min.js";

kaplay()
billboard3djs()

// This creates a red interaction box. 
// Interaction boxes can have custom sizes
// When no options are set it will become a solid block. This means a player can't walk through it
addInteractionBox(0, 0, 200, 100, 100, 100, true), // x, y, z, sizeX, sizeY, sizeZ, visible

// Interaction boxes can also have tags!
addInteractionBox(-200, 0, 200, 100, 100, 100, true, {
    tags: ["interaction"]
})

// Adding a onCollide function creates a blue interaction box.
// Unlike the red interaction box it is not solid so you can walk through it.
// This runs a function whenever the player is colliding with the interaction box.
// Keep in mind that this function runs every frame that the player is colliding.
addInteractionBox(200, 0, 200, 100, 100, 100, true, {
    onCollide: () => {
        debug.log("You have collided with this interaction box.")
    }
})

// Adding a onClick function creates a yellow interaction box.
// This one is also not solid so you can walk through it.
// This runs a function whenever the player clicks on the interaction box.

// You also need to add a handleClickRaycast.
// When mouse is locked it will click whatever interaction block is in the middle of the players screen.
// If mouse is not locked it will go from wherever the mouse is
onClick(() => {
    handleClickRaycast() // This makes sure that clicks work
})

addInteractionBox(400, 0, 200, 100, 100, 100, true, {
    onClick: () => {
        debug.log("You have clicked this interaction box.")
    }
})

// You can combine both a onCollide and onClick together which makes a purple interaction box.
addInteractionBox(600, 0, 200, 100, 100, 100, true, {
    onCollide: () => {
        debug.log("You have collided with this interaction box.")
    },
    onClick: () => {
        debug.log("You have clicked this interaction box.")
    }
})
    
// To delete interaction boxes you can use deleteAllCollisionBoxesWithTag function
deleteAllCollisionBoxesWithTag("interaction")`;
        break;
      case "ui":
        pageName = "UI";
        pageContent =
          "To add UI to your game simply add them like you would in Kaplay.js with the add(). Keep in mind that the closest block to you has a Z layer of 10000 (The farther away blocks are the smaller Z layer they get), which means if you want the UI to always be on top you have to have a Z layer of 10001 or higher.";
        code = `
import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import { billboard3djs } from "https://billboard3djs.nik.best/billboard.min.js";

kaplay()
billboard3djs()

loadSprite("hand", "hand.png")

const hand = add([
    sprite("hand"),
    pos(center()),
    anchor(bot),
    z(10001) // Make sure to have a Z layer of 10001 or higher
])`;
        break;
      case "thatsit":
        pageName = "That's it! 🥳";
        pageContent =
          "Combining the Billboard3D.js API with the Kaplay.js API you can make a powerful 3D(-like) game!";
        code = "";
        break;
      default:
        pageName = "Error";
        pageContent = "Page not found.";
        code = "";
    }
  }

  function setPage(page) {
    window.location.hash = page;
    window.scrollTo(0, 0);
    window.location.reload();
  }
</script>

<div class="drawer lg:drawer-open bg-[#222831] text-[#EEEEEE]">
  <!-- Drawer Toggle -->
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

  <!-- Page Content -->
  <div class="drawer-content flex flex-col p-8">
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-[#EEEEEE]">{pageName}</h1>
      <p class="mt-2 text-lg text-[#EEEEEE] whitespace-pre-line">
        {pageContent}
      </p>

      <div class="mockup-code w-full bg-[#393E46] rounded-lg p-4 mt-4">
        <pre class="overflow-x-auto p-4 bg-[#393E46] rounded-lg text-[#EEEEEE]">
<code class="language-javascript">{@html code}</code></pre>
      </div>
    </div>
  </div>

  <!-- Sidebar -->
  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="Close Sidebar" class="drawer-overlay"
    ></label>
    <ul class="menu bg-[#393E46] text-[#EEEEEE] min-h-full w-80 p-6 space-y-4">
      <h1 class="text-3xl font-bold text-center">Billboard3D.js Docs</h1>
      <h2 class="mt-6 text-xl font-semibold">API:</h2>
      <li>
        <a
          class="text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] rounded-lg py-2 px-4"
          on:click={() => window.location.replace("/docs/api")}>View API</a
        >
      </li>

      <h2 class="mt-6 text-xl font-semibold">Guides:</h2>
      <li>
        <a
          class="text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] rounded-lg py-2 px-4"
          on:click={() => setPage("start")}>Starting the project</a
        >
      </li>
      <li>
        <a
          class="text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] rounded-lg py-2 px-4"
          on:click={() => setPage("install")}>Installation</a
        >
      </li>
      <li>
        <a
          class="text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] rounded-lg py-2 px-4"
          on:click={() => setPage("blocks")}>Blocks</a
        >
      </li>
      <li>
        <a
          class="text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] rounded-lg py-2 px-4"
          on:click={() => setPage("movement")}>Movement</a
        >
      </li>
      <li>
        <a
          class="text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] rounded-lg py-2 px-4"
          on:click={() => setPage("interactionbox")}>Interaction Box</a
        >
      </li>
      <li>
        <a
          class="text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] rounded-lg py-2 px-4"
          on:click={() => setPage("ui")}>UI</a
        >
      </li>
      <li>
        <a
          class="text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] rounded-lg py-2 px-4"
          on:click={() => setPage("thatsit")}>That's it!</a
        >
      </li>
    </ul>
  </div>
</div>

<style>
  @import "tailwindcss";
  @plugin "daisyui";
</style>
