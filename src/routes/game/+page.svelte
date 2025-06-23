<script>
    import kaplay from "kaplay";
    import { onMount } from "svelte";
    import { addBlock, addInteractionBox, initBillboard, moveCamera, rotateCamera, jumpCamera, set3DJumpStrength, set3DGravity, set3DGroundLevel, registerBlockType, moveAllWithTag, deleteAllCollisionBoxesWithTag, getCameraDirections, handleClickRaycast, setCameraPos } from "./billboard";
    import { text } from "@sveltejs/kit";

    // TODO:
    // Detect click

    onMount(() => {
        kaplay();
        initBillboard()

        
        let moveSpeed = 5

        onKeyDown("w", () => {
            moveCamera("forward", moveSpeed)
        });
        
        onKeyDown("s", () => {
            moveCamera("backward", moveSpeed)
        });

        onKeyDown("a", () => {
            moveCamera("left", moveSpeed)
        });

        onKeyDown("d", () => {
            moveCamera("right", moveSpeed)
        });


        onKeyPress("space", () => {
            jumpCamera()
        });

        onClick(() => {
            if (isCursorLocked()) {
                handleClickRaycast();
            }
            setCursorLocked(true)
        });

        document.addEventListener("mousemove", (e) => {
            if (document.pointerLockElement) {
                rotateCamera("y", e.movementX * 0.001)
                rotateCamera("x", e.movementY * 0.001)
            }
        });


        registerBlockType("block", () => [
            sprite("steel"),
            pos(0, 0),
            anchor("center"),
            "block"
        ])
        registerBlockType("wall", () => [
            sprite("wall"),
            pos(0, 0),
            anchor("center"),
            "block"
        ])
        registerBlockType("hand", () => [
            sprite("hand"),
            pos(0, 0),
            anchor("center"),
            "hand"
        ])
        registerBlockType("button", () => [
            sprite("button"),
            pos(0, 0),
            anchor("center"),
            "button"
        ])
        registerBlockType("table", () => [
            sprite("table"),
            pos(0, 0),
            anchor("center"),
            "block"
        ])

        loadSprite("steel", "steel.png")
        loadSprite("wall", "/game/wall.png")
        loadSprite("button", "/game/button.png")
        loadSound("click", "/game/click.wav")
        loadSprite("table", "/game/table.png")

        loadSprite("text1", "/game/text1.png")
        loadSprite("text2", "/game/text2.png")
        loadSprite("text3", "/game/text3.png")
        loadSprite("text4", "/game/text4.png")
        loadSprite("text5", "/game/text5.png")
        loadSprite("text6", "/game/text6.png")
        loadSprite("text7", "/game/text7.png")
        loadSprite("text8", "/game/text8.png")
        loadSprite("text9", "/game/text9.png")
        loadSprite("text10", "/game/text10.png")
        loadSprite("hand", "/game/hand.png")

        add([
            rect(10000, 10000),
            color(128, 128, 128)
        ])

        set3DJumpStrength(0)

        const currentText = add([
            sprite("text1"),
            scale(0.5),
            pos(0, 0),
            z(10001)
        ])

        // 1
        addBlock("block", 0, 0, 500)
        addBlock("button", -100, 0, 500)
        addInteractionBox(-100, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                currentText.sprite = "text2"
            },
            tags: ["interaction"]
        })

        // 2
        addBlock("block", 600, 0, 500, {
            tags: "move"
        } )
        addBlock("button", 500, 0, 500)
        addInteractionBox(500, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                currentText.sprite = "text3"
            },
            tags: ["interaction"]
        })
        let blockMoveCount = 0
        onUpdate(() => {
            if (blockMoveCount < 100 || blockMoveCount > 200) {
                moveAllWithTag("move", 600 + blockMoveCount, 0, 500)
                blockMoveCount += 1
            }
            if (blockMoveCount >= 100) {
                moveAllWithTag("move", 700 - (blockMoveCount - 100), 0, 500)
                blockMoveCount += 1
            }

            if (blockMoveCount >= 200) {
                moveAllWithTag("move", 600, 0, 500)
                blockMoveCount = 0
            }
        })

        // 3
        addInteractionBox(1200, 0, 500, 100, 100, 100, true, {
            tags: ["interaction"]
        })
        addBlock("button", 1100, 0, 500)
        addInteractionBox(1100, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                currentText.sprite = "text4"
            },
            tags: ["interaction"]
        })

        // 4
        addInteractionBox(1400, 0, 500, 100, 100, 100, true, {
            onCollide: () => {
                debug.log("Hello World! :)")
            },
            tags: ["interaction"]
        })
        addBlock("button", 1300, 0, 500)
        addInteractionBox(1300, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                currentText.sprite = "text5"
            },
            tags: ["interaction"]
        })

        // 5
        addInteractionBox(1600, 0, 500, 100, 100, 100, true, {
            onClick: () => {
                debug.log("You clicked the yellow collision box! :)")
            },
            tags: ["interaction"]
        })
        addBlock("button", 1500, 0, 500)
        addInteractionBox(1500, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                currentText.sprite = "text6"
            },
            tags: ["interaction"]
        })

        // 6
        addBlock("block", 2000, 0, 500)
        addInteractionBox(2000, 0, 500, 100, 100, 100, false, {
            tags: ["interaction"]
        })
        addBlock("button", 1900, 0, 500)
        addInteractionBox(1900, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                currentText.sprite = "text7"
            },
            tags: ["interaction"]
        })

        // 7
        for (let i = 0; i <= 10; i++) {
            addBlock("block", 2600, 100 - (i * 50), 500)
        }
        for (let i = 0; i <= 10; i++) {
            addBlock("block", 2650, 100 - (i * 50), 500)
        }
        addBlock("button", 2500, 0, 500)
        addInteractionBox(2600, -250, 500, 120, 600, 100, false, {
            tags: ["interaction"]
        })
        addInteractionBox(2500, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                currentText.sprite = "text8"
                set3DJumpStrength(30)
            },
            tags: ["interaction"]
        })
        let topOfTowerDelay = 0
        let hasCollidedWithTopTower = false
        onUpdate(() => {
            if (topOfTowerDelay >= 1 && !hasCollidedWithTopTower) {
                debug.log("You made it! Changing jump strength to default.")
                set3DJumpStrength(15)
                hasCollidedWithTopTower = true;
            }
            if (topOfTowerDelay > 0) {
                topOfTowerDelay -= 1
            }
        })
        addInteractionBox(2600, -550, 500, 120, 100, 100, false, {
            onCollide: () => {
                topOfTowerDelay = 1
            },
            tags: ["interaction"]
        })

        // 8
        addBlock("hand", 3000, 0, 500)
        addBlock("button", 2800, 0, 500)
        addInteractionBox(2800, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                currentText.sprite = "text9"
            },
            tags: ["interaction"]
        })
        addInteractionBox(3000, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                destroyAll("hand")
                const hand = add([
                    sprite("hand"),
                    pos(800, 960),
                    scale(4),
                    rotate(-100),
                    z(10000000)

                ])
            },
            tags: ["interaction"]
        })

        // 9
        addBlock("button", 3300, 0, 500)
        addInteractionBox(3300, 0, 500, 100, 100, 100, false, {
            onClick: () => {
                play("click")
                destroyAll("block")
                destroyAll("button")
                currentText.sprite = "text10"
                deleteAllCollisionBoxesWithTag("interaction")
                setCameraPos(0, 0, 200)
                createHouse()
            }
        })

        function createHouse() {
            for (let i = 0; i <= 10; i++) {
                addBlock("wall", -200, 0, 0 + (i * 50))
            }
            for (let i = 0; i <= 10; i++) {
                addBlock("wall", 200, 0, 0 + (i * 50))
            }

            for (let i = 0; i <= 10; i++) {
                addBlock("wall", -200 + (i * 50), 0, 0)
            }
            for (let i = 0; i <= 10; i++) {
                addBlock("wall", -200 + (i * 50), 0, 500)
            }

            addInteractionBox(-250, 0, 300, 100, 200, 550, false)
            addInteractionBox(250, 0, 300, 100, 200, 550, false)
            addInteractionBox(-100, 0, 500, 500, 200, 100, false)
            addInteractionBox(-100, 0, 0, 500, 200, 100, false)


            addBlock("table", 0, 40, 350)
            addInteractionBox(0, 0, 350, 50, 100, 50, false)
        }

    });
</script>
