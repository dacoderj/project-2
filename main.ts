```typescript
let money = 100
let packs = 0
let setNumber = 0
let busy = false

scene.setBackgroundColor(9)

game.splash("CARD PACK SHOP", "DRAFT 1.3")

showHome()

function showHome() {
    busy = false

    let setName = "ASCENDED HEROES"
    let price = 10

    if (setNumber == 1) {
        setName = "CHAOS RISING"
        price = 12
    }

    if (setNumber == 2) {
        setName = "PERFECT ORDER"
        price = 15
    }

    if (setNumber == 3) {
        setName = "PITCH BLACK"
        price = 18
    }

    game.showLongText(
        "CARD PACK SHOP\n\n" +
        setName +
        "\n\nPACK: $" + price +
        "\nCASH: $" + money +
        "\n\nA = OPEN PACK\n" +
        "LEFT / RIGHT = SET\n" +
        "MENU = HIT RATES",
        DialogLayout.Full
    )
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    setNumber = setNumber - 1

    if (setNumber < 0) {
        setNumber = 3
    }

    showHome()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    setNumber = setNumber + 1

    if (setNumber > 3) {
        setNumber = 0
    }

    showHome()
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    let price = 10

    if (setNumber == 1) {
        price = 12
    }

    if (setNumber == 2) {
        price = 15
    }

    if (setNumber == 3) {
        price = 18
    }

    if (money < price) {
        game.splash("NOT ENOUGH CASH")
        return
    }

    money = money - price
    packs = packs + 1

    openPack()
})

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    showRates()
})

function showRates() {
    let text = ""

    if (setNumber == 0) {
        text =
            "ASCENDED HEROES\n\n" +
            "SIR ANY 1/70\n" +
            "SIR SPECIFIC 1/1533\n" +
            "MHR ANY 1/540\n" +
            "MHR SPECIFIC 1/1080"
    }

    if (setNumber == 1) {
        text =
            "CHAOS RISING\n\n" +
            "SIR ANY 1/83\n" +
            "SIR SPECIFIC 1/496\n" +
            "MHR ANY 1/956\n" +
            "MHR SPECIFIC 1/956"
    }

    if (setNumber == 2) {
        text =
            "PERFECT ORDER\n\n" +
            "SIR ANY 1/81\n" +
            "SIR SPECIFIC 1/487\n" +
            "MHR ANY 1/1786\n" +
            "MHR SPECIFIC 1/1786"
    }

    if (setNumber == 3) {
        text =
            "PITCH BLACK\n\n" +
            "SIR ANY ~1/80-125\n" +
            "SIR SPECIFIC ~1/480-750\n" +
            "MHR ANY ~1/1260-1370\n" +
            "MHR SPECIFIC ~1/1260-1370"
    }

    game.showLongText(text, DialogLayout.Full)
}

function openPack() {
    busy = true

    scene.setBackgroundColor(1)

    game.splash("GET READY!", "OPENING PACK")

    let pack = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . 2 2 2 2 2 2 2 2 2 2 . . .
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 4 4 5 5 5 5 5 5 4 4 2 . .
        . . 2 4 5 5 5 5 5 5 5 5 4 2 . .
        . . 2 4 5 5 7 7 7 7 5 5 4 2 . .
        . . 2 4 5 7 7 7 7 7 7 5 4 2 . .
        . . 2 4 5 7 7 7 7 7 7 5 4 2 . .
        . . 2 4 5 5 7 7 7 7 5 5 4 2 . .
        . . 2 4 5 5 5 5 5 5 5 5 4 2 . .
        . . 2 4 4 5 5 5 5 5 5 4 4 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)

    pack.setPosition(80, 60)

    pause(500)

    game.splash("CRINKLE!", "CRINKLE!")

    music.playTone(220, 60)
    pack.x = 74
    pause(70)

    music.playTone(300, 60)
    pack.x = 86
    pause(70)

    music.playTone(220, 60)
    pack.x = 74
    pause(70)

    music.playTone(350, 60)
    pack.x = 86
    pause(70)

    music.playTone(260, 60)
    pack.x = 80

    pause(300)

    game.splash("RIP!", "PACK OPEN!")

    music.playTone(440, 70)
    pause(70)
    music.playTone(550, 70)
    pause(70)
    music.playTone(660, 70)
    pause(70)
    music.playTone(880, 150)

    pack.destroy()

    pause(300)

    revealCard(1)
    revealCard(2)
    revealCard(3)
    revealCard(4)
    revealCard(5)

    game.splash(
        "PACK COMPLETE",
        "OPENED: " + packs
    )

    showHome()
}

function revealCard(number) {
    let rarity = "COMMON"

    if (setNumber == 0) {
        if (randint(1, 70) == 1) {
            rarity = "SPECIAL ILLUSTRATION"
        } else if (randint(1, 540) == 1) {
            rarity = "MEGA HYPER RARE"
        } else {
            rarity = normalRarity()
        }
    }

    if (setNumber == 1) {
        if (randint(1, 83) == 1) {
            rarity = "SPECIAL ILLUSTRATION"
        } else if (randint(1, 956) == 1) {
            rarity = "MEGA HYPER RARE"
        } else {
            rarity = normalRarity()
        }
    }

    if (setNumber == 2) {
        if (randint(1, 81) == 1) {
            rarity = "SPECIAL ILLUSTRATION"
        } else if (randint(1, 1786) == 1) {
            rarity = "MEGA HYPER RARE"
        } else {
            rarity = normalRarity()
        }
    }

    if (setNumber == 3) {
        if (randint(1, randint(80, 125)) == 1) {
            rarity = "SPECIAL ILLUSTRATION"
        } else if (randint(1, randint(1260, 1370)) == 1) {
            rarity = "MEGA HYPER RARE"
        } else {
            rarity = normalRarity()
        }
    }

    if (rarity == "SPECIAL ILLUSTRATION") {
        scene.setBackgroundColor(13)

        music.playTone(523, 100)
        pause(80)
        music.playTone(659, 100)
        pause(80)
        music.playTone(784, 150)
    } else if (rarity == "MEGA HYPER RARE") {
        scene.setBackgroundColor(2)

        music.playTone(523, 100)
        pause(80)
        music.playTone(659, 100)
        pause(80)
        music.playTone(784, 100)
        pause(80)
        music.playTone(988, 200)
    } else {
        scene.setBackgroundColor(1)
    }

    game.showLongText(
        "CARD " + number + " / 5\n\n" +
        rarity,
        DialogLayout.Full
    )
}

function normalRarity() {
    let roll = randint(1, 100)

    if (roll <= 5) {
        return "ULTRA RARE"
    }

    if (roll <= 15) {
        return "ILLUSTRATION RARE"
    }

    if (roll <= 35) {
        return "RARE"
    }

    if (roll <= 65) {
        return "UNCOMMON"
    }

    return "COMMON"
}
```
