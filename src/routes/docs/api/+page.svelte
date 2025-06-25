<script>
    let pageName = ""
    let pageContent = ""
    let code = ""

    function changePage(page) {
        switch (page) {
            case "registerBlockType":
                pageName = `registerBlockType`
                pageContent = `This function registers a new type of block, which can be later on used to add blocks to your game.`
                code = `registerBlockType("block", () => [
        sprite("block"),
        pos(0, 0) // This is required (but it does not matter what position it is)
      ])`
                break
            case "addBlock":
                pageName = `addBlock`
                pageContent = `This function adds a new block to the world at a specific position.`
                code = `
  // Without tag
  addBlock('exampleBlock', x, y, z);

  // With tag                
  addBlock('exampleBlock', x, y, z, { 
    tags: ['tag1']
  });`
                break
            case "moveAllWithTag":
                pageName = `moveAllWithTag`
                pageContent = `Moves all blocks with a specific tag to a new position.`
                code = `moveAllWithTag('tag1', x, y, z);`
                break
            case "set3DGroundLevel":
                pageName = `set3DGroundLevel`
                pageContent = `Sets the ground level in the 3D world so that the player does not fall beyond this point.`
                code = `set3DGroundLevel(integer); // Default: 0`
                break
            case "set3DGravity":
                pageName = `set3DGravity`
                pageContent = `Sets the gravity in the world.`
                code = `set3DGravity(integer); // Default: 0.5`
                break
            case "set3DJumpStrength":
                pageName = `set3DJumpStrength`
                pageContent = `Sets the jump strength of the player.`
                code = `set3DJumpStrength(integer); // Default: 15`
                break
            case "getCameraDirections":
                pageName = `getCameraDirections`
                pageContent = `Gets the current directions of the camera.`
                code = `const directions = getCameraDirections();

  console.log(directions.cameraYDirection + " " + directions.cameraXDirection)`
                break
            case "moveCamera":
                pageName = `moveCamera`
                pageContent = `Moves the camera in the world.`
                code = `moveCamera('forward', speed);
  moveCamera('backward', speed);
  moveCamera('left', speed);
  moveCamera('right', speed);`
                break
            case "rotateCamera":
                pageName = `rotateCamera`
                pageContent = `Rotates the camera along a specified axis.`
                code = `rotateCamera('y', speed);
  rotateCamera('x', speed);`
                break
            case "addInteractionBox":
                pageName = `addInteractionBox`
                pageContent = `Adds an interaction box to the world.`
                code = `addInteractionBox(10, 5, 5, 3, 3, 3, true, { onClick: () => console.log('Clicked!') });`
                break
            case "deleteAllCollisionBoxesWithTag":
                pageName = `deleteAllCollisionBoxesWithTag`
                pageContent = `Deletes all collision boxes with a specific tag.`
                code = `deleteAllCollisionBoxesWithTag('dangerousZone');`
                break
            case "initBillboard":
                pageName = `initBillboard`
                pageContent = `Initializes the main game loop.`
                code = `initBillboard();`
                break
            case "jumpCamera":
                pageName = `jumpCamera`
                pageContent = `Makes the camera jump.`
                code = `jumpCamera();`
                break
            case "setCameraPos":
                pageName = `setCameraPos`
                pageContent = `Sets the camera’s position in the world.`
                code = `setCameraPos(0, 10, 0);`
                break
            case "handleClickRaycast":
                pageName = `handleClickRaycast`
                pageContent = `Handles click events (raycasting).`
                code = `handleClickRaycast();`
                break
            case "getCameraPos":
                pageName = "getCameraPos"
                pageContent = "Returns the current x, y and z positions of the camera"
                code = "getCameraPos()"
                break
            default:
                pageName = "Error"
                pageContent = "Page not found."
                code = ""
        }
    }

    // Initialize the first page
    changePage("initBillboard");
</script>

<div class="drawer lg:drawer-open">
  <!-- Drawer Toggle -->
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  
  <!-- Page Content -->
  <div class="drawer-content flex flex-col p-8 bg-[#222831] text-[#EEEEEE]">
    <!-- Page main content here -->
    <div class="space-y-6">
        <h1 class="text-3xl font-bold">{pageName}</h1>
        <p class="mt-2 text-lg text-[#EEEEEE]">{pageContent}</p>

        <div class="mockup-code w-full rounded-lg p-4 mt-4" style="background-color: #393E46;">
            <pre class="overflow-x-auto p-4 rounded-lg" style="background-color: #222831;"><code class="text-sm">{code}</code></pre>
        </div>
    </div>
  </div>

  <!-- Sidebar -->
  <div class="drawer-side bg-[#393E46] text-[#EEEEEE]">
    <label for="my-drawer-2" aria-label="Close Sidebar" class="drawer-overlay"></label>
    <ul class="menu min-h-full w-80 p-6 space-y-4">
      <h1 class="text-3xl font-bold text-center">Billboard.js Docs</h1>
      <h2 class="mt-6 text-xl font-semibold text-[#EEEEEE]">API:</h2>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "initBillboard")}>initBillboard</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "registerBlockType")}>registerBlockType</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "addBlock")}>addBlock</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "moveAllWithTag")}>moveAllWithTag</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "set3DGroundLevel")}>set3DGroundLevel</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "set3DGravity")}>set3DGravity</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "set3DJumpStrength")}>set3DJumpStrength</a></li>
            <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "getCameraPos")}>getCameraPos</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "getCameraDirections")}>getCameraDirections</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "moveCamera")}>moveCamera</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "rotateCamera")}>rotateCamera</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "addInteractionBox")}>addInteractionBox</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "deleteAllCollisionBoxesWithTag")}>deleteAllCollisionBoxesWithTag</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "jumpCamera")}>jumpCamera</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "setCameraPos")}>setCameraPos</a></li>
      <li><a class="text-lg hover:bg-[#00ADB5] hover:text-[#222831] rounded-lg py-2 px-4 cursor-pointer" on:click={changePage.bind(null, "handleClickRaycast")}>handleClickRaycast</a></li>
    </ul>
  </div>
</div>




<style>
    @import "tailwindcss";
    @plugin "daisyui";
</style>
