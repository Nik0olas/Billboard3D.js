<script>
  import { onMount } from 'svelte';

  let shouldPlay = false
</script>

<main class="min-h-screen bg-[#222831] text-[#EEEEEE]">
  <section class="container mx-auto px-4 py-16">
  <div class="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-12">
    <!-- Left Content -->
    <div class="flex-1">
      <h1 class="text-5xl font-bold mb-6">Billboard3D.js</h1>
      <p class="text-2xl font-bold max-w-xl mx-auto md:mx-0 mb-8">
        A 3D(-like) plugin for Kaplay.js
      </p>
      <div class="flex justify-center md:justify-start gap-4">
        <a href="/docs" class="btn" style="background-color: #00ADB5; color: #EEEEEE; border: none;">Get Started</a>
        <a href="/docs" class="btn" style="background-color: #393E46; color: #EEEEEE; border: none;">Documentation</a>
        <a href="https://github.com/Nik0olas/Billboard3D.js"
          class="btn"
          style="background-color: #393E46; color: #EEEEEE; border: none; display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; text-decoration: none; border-radius: 6px;"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code on GitHub">
          <img src="github-mark-white.svg" alt="GitHub Logo" style="height: 1em; width: 1em;">
          Source Code
        </a>
      </div>
    </div>

    <!-- Right GIF -->
    <div class="flex-1 flex justify-center">
      <img src="video.gif" alt="Billboard3D preview" class="max-w-full h-auto rounded-lg shadow-lg">
    </div>
  </div>
</section>


  <section class="py-16" style="background-color: #393E46; color: #EEEEEE;" id="features">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12">Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="card shadow-xl" style="background-color: #222831; color: #EEEEEE;">
          <div class="card-body">
            <h3 class="card-title">Easy Integration</h3>
            <p>Full intergration with Kaplay.js API</p>
          </div>
        </div>
        <div class="card shadow-xl" style="background-color: #222831; color: #EEEEEE;">
          <div class="card-body">
            <h3 class="card-title">Billboard system</h3>
            <p>Billboard3D.js uses a billboard system (Where all sprites face twoards you) which makes it easy and fun to create 3D games</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container mx-auto px-4 py-16" id="get-started">
    <h2 class="text-4xl font-bold text-center mb-8">Example Game</h2>
    {#if shouldPlay}
        <iframe src="/game" frameborder="0" class="mx-auto" width="1200px" height="800px"></iframe>
    {:else}
        <button class="btn mx-auto flex" on:click={shouldPlay = true}>Play</button>
    {/if}
  </section>

  <footer class="py-6 text-center text-sm" style="background-color: #222831; color: #EEEEEE;">
    <p>&copy; 2025 Billboard.js. Built with Svelte, TailwindCSS, and DaisyUI.</p>
  </footer>
</main>

<style>
  @import "tailwindcss";
  @plugin "daisyui";
</style>
