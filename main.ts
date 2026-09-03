let money = 100
let packs = 0
let setNumber = 0
let busy = false

let setName = "ASCENDED HEROES"
let packPrice = 10

// COLLECTION DATABASE
let collectionSets: string[] = []
let collectionRarities: string[] = []
let collectionValues: number[] = []

let collectionPage = 0
let screenMode = 0
// 0 = home
// 1 = collection

scene.setBackgroundColor(9)

game.splash("CARD PACK SHOP", "DRAFT 1.3")

updateSet()
showHome()


// --------------------------------------------------
// SET INFORMATION
// --------------------------------------------------

function updateSet() {
    if (setNumber == 0) {
        setName = "ASCENDED HEROES"
        packPrice = 10
    } else if (setNumber == 1) {
        setName = "CHAOS RISING"
        packPrice = 12
    } else if (setNumber == 2) {
        setName = "PERFECT ORDER"
        packPrice = 15
    } else {
        setName = "PITCH BLACK"
        packPrice = 18
    }
}


// --------------------------------------------------
// HOME SCREEN
// --------------------------------------------------

function showHome() {
    busy = false
    screenMode = 0
    updateSet()
}

game.onPaint(function () {

    if (screenMode == 0) {
        screen.fill(9)

        screen.print("CARD PACK SHOP", 34, 8, 1, image.font8)

        screen.drawLine(8, 20, 151, 20, 1)

        screen.print(setName, 10, 29, 1, image.font5)

        screen.print("PACK PRICE", 10, 43, 1, image.font5)
        screen.print("$" + packPrice, 112, 43, 1, image.font5)

        screen.print("CASH", 10, 53, 1, image.font5)
        screen.print("$" + money, 112, 53, 1, image.font5)

        screen.print("PACKS OPENED", 10, 63, 1, image.font5)
        screen.print("" + packs, 112, 63, 1, image.font5)

        screen.print("CARDS OWNED", 10, 73, 1, image.font5)
        screen.print("" + collectionSets.length, 112, 73, 1, image.font5)

        screen.print("COLLECTION", 10, 83, 1, image.font5)
        screen.print("$" + getCollectionValue(), 112, 83, 1, image.font5)

        screen.drawLine(8, 94, 151, 94, 1)

        screen.print("A  OPEN PACK", 10, 100, 1, image.font5)
        screen.print("B  COLLECTION", 10, 108, 1, image.font5)
        screen.print("< > CHANGE SET", 10, 116, 1, image.font5)
    }

    if (screenMode == 1) {
        drawCollection()
    }
})


// --------------------------------------------------
// CONTROLS
// --------------------------------------------------

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    if (screenMode == 1) {
        return
    }

    setNumber -= 1

    if (setNumber < 0) {
        setNumber = 3
    }

    updateSet()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    if (screenMode == 1) {
        return
    }

    setNumber += 1

    if (setNumber > 3) {
        setNumber = 0
    }

    updateSet()
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    if (screenMode == 1) {
        screenMode = 0
        return
    }

    if (money < packPrice) {
        game.splash(
            "NOT ENOUGH CASH",
            "Need $" + packPrice
        )
        return
    }

    money -= packPrice
    packs += 1

    openPack()
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    if (screenMode == 0) {
        collectionPage = 0
        screenMode = 1
    } else {
        screenMode = 0
    }
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (screenMode == 1) {
        collectionPage -= 1

        if (collectionPage < 0) {
            collectionPage = 0
        }
    }
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (screenMode == 1) {
        let maxPage = Math.idiv(collectionSets.length - 1, 6)

        if (collectionPage < maxPage) {
            collectionPage += 1
        }
    }
})

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    if (screenMode == 1) {
        screenMode = 0
        return
    }

    showRates()
})


// --------------------------------------------------
// COLLECTION
// --------------------------------------------------

function getCollectionValue(): number {
    let total = 0

    for (let value of collectionValues) {
        total += value
    }

    return total
}

function addCardToCollection(rarity: string, value: number) {
    collectionSets.push(setName)
    collectionRarities.push(rarity)
    collectionValues.push(value)
}

function drawCollection() {
    screen.fill(1)

    screen.print("MY COLLECTION", 36, 5, 7, image.font8)

    screen.print(
        "CARDS: " + collectionSets.length +
        "   VALUE: $" + getCollectionValue(),
        8,
        18,
        7,
        image.font5
    )

    screen.drawLine(5, 27, 154, 27, 7)

    if (collectionSets.length == 0) {
        screen.print("NO CARDS YET!", 45, 53, 7, image.font5)
        screen.print("OPEN SOME PACKS.", 35, 65, 7, image.font5)
        screen.print("B = BACK", 52, 105, 7, image.font5)
        return
    }

    let cardsPerPage = 6
    let start = collectionPage * cardsPerPage
    let end = start + cardsPerPage

    if (end > collectionSets.length) {
        end = collectionSets.length
    }

    let y = 33

    for (let i = start; i < end; i++) {

        let number = i + 1

        screen.print(
            number + ". " + shortSetName(collectionSets[i]),
            5,
            y,
            7,
            image.font5
        )

        screen.print(
            shortRarity(collectionRarities[i]),
            65,
            y,
            7,
            image.font5
        )

        screen.print(
            "$" + collectionValues[i],
            135,
            y,
            7,
            image.font5
        )

        y += 12
    }

    let maxPage = Math.idiv(collectionSets.length - 1, cardsPerPage)

    screen.print(
        "PAGE " + (collectionPage + 1) +
        "/" + (maxPage + 1),
        5,
        111,
        7,
        image.font5
    )

    screen.print(
        "UP/DOWN  B=BACK",
        71,
        111,
        7,
        image.font5
    )
}

function shortSetName(name: string): string {
    if (name == "ASCENDED HEROES") {
        return "AH"
    }

    if (name == "CHAOS RISING") {
        return "CR"
    }

    if (name == "PERFECT ORDER") {
        return "PO"
    }

    return "PB"
}

function shortRarity(rarity: string): string {
    if (rarity == "COMMON") {
        return "COMMON"
    }

    if (rarity == "UNCOMMON") {
        return "UNCOMMON"
    }

    if (rarity == "RARE") {
        return "RARE"
    }

    if (rarity == "ILLUSTRATION RARE") {
        return "ILLUST."
    }

    if (rarity == "ULTRA RARE") {
        return "ULTRA"
    }

    if (rarity == "SPECIAL ILLUSTRATION") {
        return "SIR"
    }

    if (rarity == "MEGA HYPER RARE") {
        return "MHR"
    }

    return rarity
}


// --------------------------------------------------
// HIT RATES
// --------------------------------------------------

function showRates() {
    let text = ""

    if (setNumber == 0) {
        text =
            "ASCENDED HEROES\n\n" +
            "SIR ANY: 1 in 70\n" +
            "SIR SPECIFIC: 1 in 1,533\n" +
            "MHR ANY: 1 in 540\n" +
            "MHR SPECIFIC: 1 in 1,080"

    } else if (setNumber == 1) {
        text =
            "CHAOS RISING\n\n" +
            "SIR ANY: 1 in 83\n" +
            "SIR SPECIFIC: 1 in 496\n" +
            "MHR ANY: 1 in 956\n" +
            "MHR SPECIFIC: 1 in 956"

    } else if (setNumber == 2) {
        text =
            "PERFECT ORDER\n\n" +
            "SIR ANY: 1 in 81\n" +
            "SIR SPECIFIC: 1 in 487\n" +
            "MHR ANY: 1 in 1,786\n" +
            "MHR SPECIFIC: 1 in 1,786"

    } else {
        text =
            "PITCH BLACK\n\n" +
            "SIR ANY: ~1 in 80-125\n" +
            "SIR SPECIFIC: ~1 in 480-750\n" +
            "MHR ANY: ~1 in 1,260-1,370\n" +
            "MHR SPECIFIC: ~1 in 1,260-1,370"
    }

    game.showLongText(text, DialogLayout.Center)
}


// --------------------------------------------------
// PACK SPRITE
// --------------------------------------------------

function makePack(): Sprite {
    let pack = sprites.create(img`
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
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


// --------------------------------------------------
// OPEN PACK
// --------------------------------------------------

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
        "Cards owned: " + collectionSets.length
    )

    showHome()
}


// --------------------------------------------------
// CARD REVEAL
// --------------------------------------------------

function revealCard(number: number) {
    let roll = randint(1, 100)
    let rarity = "COMMON"

    if (roll <= 5) {
        rarity = "ULTRA RARE"

    } else if (roll <= 15) {
        rarity = "ILLUSTRATION RARE"

    } else if (roll <= 35) {
        rarity = "RARE"

    } else if (roll <= 65) {
        rarity = "UNCOMMON"
    }

    let sirHit = false
    let mhrHit = false

    if (setNumber == 0) {
        sirHit = randint(1, 70) == 1
        mhrHit = randint(1, 540) == 1

    } else if (setNumber == 1) {
        sirHit = randint(1, 83) == 1
        mhrHit = randint(1, 956) == 1

    } else if (setNumber == 2) {
        sirHit = randint(1, 81) == 1
        mhrHit = randint(1, 1786) == 1

    } else {
        let sirOdds = randint(80, 125)
        let mhrOdds = randint(1260, 1370)

        sirHit = randint(1, sirOdds) == 1
        mhrHit = randint(1, mhrOdds) == 1
    }

    if (sirHit) {
        rarity = "SPECIAL ILLUSTRATION"
    }

    if (mhrHit) {
        rarity = "MEGA HYPER RARE"
    }


    // CARD VALUE
    let cardValue = 1

    if (rarity == "COMMON") {
        cardValue = 1

    } else if (rarity == "UNCOMMON") {
        cardValue = 2

    } else if (rarity == "RARE") {
        cardValue = 5

    } else if (rarity == "ILLUSTRATION RARE") {
        cardValue = 15

    } else if (rarity == "ULTRA RARE") {
        cardValue = 30

    } else if (rarity == "SPECIAL ILLUSTRATION") {
        cardValue = 75

    } else if (rarity == "MEGA HYPER RARE") {
        cardValue = 250
    }


    // SAVE THIS CARD FOREVER IN COLLECTION
    addCardToCollection(rarity, cardValue)


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
        rarity +
        "\n\nVALUE $" + cardValue,
        DialogLayout.Center
    )
}
