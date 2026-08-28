```typescript
let money = 100
let packs = 0
let setNumber = 0
let busy = false

let setName = "ASCENDED HEROES"
let packPrice = 10

scene.setBackgroundColor(9)

game.splash("CARD PACK SHOP", "DRAFT 1.2")

showHome()

function showHome() {
    busy = false

    if (setNumber == 0) {
        setName = "ASCENDED HEROES"
        packPrice = 10
    }

    if (setNumber == 1) {
        setName = "CHAOS RISING"
        packPrice = 12
    }

    if (setNumber == 2) {
        setName = "PERFECT ORDER"
        packPrice = 15
    }

    if (setNumber == 3) {
        setName = "PITCH BLACK"
        packPrice = 18
    }

    game.showLongText(
        "CARD PACK SHOP\n\n" +
        setName +
        "\n\nPACK: $" + packPrice +
        "\nCASH: $" + money +
        "\n\nA = OPEN PACK\n" +
        "LEFT / RIGHT = CHANGE SET\n" +
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

    if (money < packPrice) {
        game.splash("NOT ENOUGH CASH", "You need $" + packPrice)
        return
    }

    money = money - packPrice
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
            "SIR ANY: 1 in 70\n" +
            "SIR SPECIFIC: 1 in 1,533\n" +
            "MHR ANY: 1 in 540\n" +
            "MHR SPECIFIC: 1 in 1,080"
    }

    if (setNumber == 1) {
        text =
            "CHAOS RISING\n\n" +
            "SIR ANY: 1 in 83\n" +
            "SIR SPECIFIC: 1 in 496\n" +
            "MHR ANY: 1 in 956\n" +
            "MHR SPECIFIC: 1 in 956"
    }

    if (setNumber == 2) {
        text =
            "PERFECT ORDER\n\n" +
            "SIR ANY: 1 in 81\n" +
            "SIR SPECIFIC: 1 in 487\n" +
            "MHR ANY: 1 in 1,786\n" +
            "MHR SPECIFIC: 1 in 1,786"
    }

    if (setNumber == 3) {
        text =
            "PITCH BLACK\n\n" +
            "SIR ANY: ~1 in 80-125\n" +
            "SIR SPECIFIC: ~1 in 480-750\n" +
            "MHR ANY: ~1 in 1,260-1,370\n" +
            "MHR SPECIFIC: ~1 in 1,260-1,370"
    }

    game.showLongText(text, DialogLayout.Full)
}

function makePack(): Sprite {
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
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)

    pack.setPosition(80, 60)

    return pack
}

function crinkle(pack: Sprite) {
    music.playTone(220, 60)
    pack.x = 75
    pause(60)

    music.playTone(280, 60)
    pack.x = 85
    pause(60)

    music.playTone(220, 60)
    pack.x = 75
    pause(60)

    music.playTone(330, 60)
    pack.x = 85
    pause(60)

    music.playTone(260, 60)
    pack.x = 80
}

function openPack() {
    busy = true

    scene.setBackgroundColor(1)

    game.splash(setName, "OPENING PACK!")

    let pack = makePack()

    pause(500)

    game.splash("CRINKLE!", "CRINKLE!")

    crinkle(pack)

    pause(300)

    game.splash("RIP!", "PACK OPEN!")

    music.playTone(440, 70)
    pause(70)
    music.playTone(550, 70)
    pause(70)
    music.playTone(660, 70)
    pause(70)
    music.playTone(880, 120)

    pack.destroy()

    pause(300)

    revealCard(1)
    revealCard(2)
    revealCard(3)
    revealCard(4)
    revealCard(5)

    game.splash(
        "PACK COMPLETE!",
        "Packs opened: " + packs
    )

    showHome()
}

function revealCard(number: number) {
    let roll = randint(1, 100)
    let rarity = "COMMON"

    if (roll <= 5) {
        rarity = "ULTRA RARE"
    }

    if (roll > 5 && roll <= 15) {
        rarity = "ILLUSTRATION RARE"
    }

    if (roll > 15 && roll <= 35) {
        rarity = "RARE"
    }

    if (roll > 35 && roll <= 65) {
        rarity = "UNCOMMON"
    }

    if (setNumber == 0 && randint(1, 70) == 1) {
        rarity = "SPECIAL ILLUSTRATION"
    }

    if (setNumber == 0 && randint(1, 540) == 1) {
        rarity = "MEGA HYPER RARE"
    }

    if (setNumber == 1 && randint(1, 83) == 1) {
        rarity = "SPECIAL ILLUSTRATION"
    }

    if (setNumber == 1 && randint(1, 956) == 1) {
        rarity = "MEGA HYPER RARE"
    }

    if (setNumber == 2 && randint(1, 81) == 1) {
        rarity = "SPECIAL ILLUSTRATION"
    }

    if (setNumber == 2 && randint(1, 1786) == 1) {
        rarity = "MEGA HYPER RARE"
    }

    if (setNumber == 3 && randint(1, randint(80, 125)) == 1) {
        rarity = "SPECIAL ILLUSTRATION"
    }

    if (setNumber == 3 && randint(1, randint(1260, 1370)) == 1) {
        rarity = "MEGA HYPER RARE"
    }

    scene.setBackgroundColor(1)

    if (rarity == "SPECIAL ILLUSTRATION") {
        scene.setBackgroundColor(13)
        music.playTone(523, 100)
        pause(80)
        music.playTone(659, 100)
        pause(80)
        music.playTone(784, 150)
    }

    if (rarity == "MEGA HYPER RARE") {
        scene.setBackgroundColor(2)
        music.playTone(523, 100)
        pause(80)
        music.playTone(659, 100)
        pause(80)
        music.playTone(784, 100)
        pause(80)
        music.playTone(988, 200)
    }

    game.showLongText(
        "CARD " + number + " / 5\n\n" +
        rarity,
        DialogLayout.Full
    )
}
```
