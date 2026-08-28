```typescript
// ============================================================
// CARD PACK SHOP
// DRAFT 1.1
// Simple MakeCode Arcade version
// ============================================================

// ------------------------------------------------------------
// GAME VARIABLES
// ------------------------------------------------------------

let money = 100
let packsOpened = 0
let cardsOwned = 0
let collectionValue = 0

let currentSet = 0

let collectionNames: string[] = []
let collectionRarities: string[] = []
let collectionValues: number[] = []
let collectionSpecific: boolean[] = []

let collectionPosition = 0

let inCollection = false
let openingPack = false

// ------------------------------------------------------------
// SETS
// ------------------------------------------------------------

let setNames: string[] = [
    "ASCENDED HEROES",
    "CHAOS RISING",
    "PERFECT ORDER",
    "PITCH BLACK"
]

let packPrices: number[] = [
    10,
    12,
    15,
    18
]

// ------------------------------------------------------------
// ORIGINAL CARD NAMES
// ------------------------------------------------------------

let cards0: string[] = [
    "Voltiger",
    "Aquafox",
    "Flarewing",
    "Mossaur",
    "Stormclaw",
    "Thunder Rex",
    "Ocean Drake",
    "Solar Lion",
    "Hero Voltiger",
    "Voltiger EX"
]

let cards1: string[] = [
    "Flamefang",
    "Aqua Titan",
    "Leafclaw",
    "Thunderpaw",
    "Rockhorn",
    "Inferno Rex",
    "Chaos Drake",
    "Raging Lion",
    "Chaos Fang EX",
    "Mega Chaos Rex"
]

let cards2: string[] = [
    "Orderfox",
    "Starclaw",
    "Aquadon",
    "Flare Rex",
    "Leafwing",
    "Cosmic Drake",
    "Royal Titan",
    "Celestial Lion",
    "Perfect Order EX",
    "Mega Order Rex"
]

let cards3: string[] = [
    "Shadowfang",
    "Nightfox",
    "Voidwing",
    "Darkclaw",
    "Riftpaw",
    "Shadow Drake",
    "Abyss Rex",
    "Phantom Lion",
    "Rift Titan EX",
    "Mega Hyperion"
]

// ------------------------------------------------------------
// RARITIES
// ------------------------------------------------------------

let COMMON = "COMMON"
let UNCOMMON = "UNCOMMON"
let RARE = "RARE"
let ULTRA = "ULTRA RARE"
let IR = "ILLUSTRATION RARE"
let SIR = "SPECIAL ILLUSTRATION"
let MHR = "MEGA HYPER RARE"

// ------------------------------------------------------------
// START GAME
// ------------------------------------------------------------

scene.setBackgroundColor(9)

game.splash(
    "CARD PACK SHOP",
    "COLLECT • TRADE • SELL"
)

showHome()

// ============================================================
// HOME SCREEN
// ============================================================

function showHome() {
    inCollection = false
    openingPack = false

    scene.setBackgroundColor(9)

    game.showLongText(
        "CARD PACK SHOP\n\n" +
        "CASH: $" + money + "\n\n" +
        "SET:\n" + setNames[currentSet] + "\n\n" +
        "PACK: $" + packPrices[currentSet] + "\n\n" +
        "A = OPEN PACK\n" +
        "LEFT / RIGHT = SET\n" +
        "B = COLLECTION\n" +
        "MENU = ODDS & STATS",
        DialogLayout.Full
    )
}

// ============================================================
// CHANGE SET
// ============================================================

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (openingPack || inCollection) {
        return
    }

    currentSet = currentSet - 1

    if (currentSet < 0) {
        currentSet = 3
    }

    showSet()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (openingPack || inCollection) {
        return
    }

    currentSet = currentSet + 1

    if (currentSet > 3) {
        currentSet = 0
    }

    showSet()
})

function showSet() {
    game.splash(
        setNames[currentSet],
        "PACK PRICE: $" + packPrices[currentSet]
    )
}

// ============================================================
// OPEN PACK
// ============================================================

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inCollection || openingPack) {
        return
    }

    if (money < packPrices[currentSet]) {
        game.splash(
            "NOT ENOUGH CASH",
            "Need $" + packPrices[currentSet]
        )
        return
    }

    money = money - packPrices[currentSet]

    packsOpened = packsOpened + 1

    openPack()
})

// ============================================================
// BOOSTER PACK PIXEL ART
// ============================================================

function createBooster(): Sprite {
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

// ============================================================
// PACK CRINKLE
// ============================================================

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
    pause(80)

    pack.y = 55
    pause(50)

    pack.y = 65
    pause(50)

    pack.y = 60
}

// ============================================================
// PACK TEAR
// ============================================================

function tearPack(pack: Sprite) {
    music.playTone(440, 70)
    pause(70)

    music.playTone(550, 70)
    pause(70)

    music.playTone(660, 70)
    pause(70)

    music.playTone(880, 120)

    pack.destroy()
}

// ============================================================
// OPENING SEQUENCE
// ============================================================

function openPack() {
    openingPack = true

    scene.setBackgroundColor(1)

    game.splash(
        setNames[currentSet],
        "GET READY!"
    )

    let pack = createBooster()

    pause(500)

    game.splash(
        "CRINKLE...",
        "CRINKLE..."
    )

    crinkle(pack)

    pause(200)

    game.splash(
        "RIP!",
        "PACK OPEN!"
    )

    tearPack(pack)

    pause(400)

    for (let cardNumber = 1; cardNumber <= 5; cardNumber++) {
        revealCard(cardNumber)
        pause(400)
    }

    openingPack = false

    game.splash(
        "PACK COMPLETE!",
        "CARDS: " + cardsOwned
    )

    showHome()
}

// ============================================================
// ONE-IN-X ROLL
// ============================================================

function oneIn(denominator: number): boolean {
    return randint(1, denominator) == 1
}

// ============================================================
// SIR ANY RATE
// ============================================================

function sirAnyRate(): number {
    if (currentSet == 0) {
        return 70
    }

    if (currentSet == 1) {
        return 83
    }

    if (currentSet == 2) {
        return 81
    }

    return randint(80, 125)
}

// ============================================================
// SIR SPECIFIC RATE
// ============================================================

function sirSpecificRate(): number {
    if (currentSet == 0) {
        return 1533
    }

    if (currentSet == 1) {
        return 496
    }

    if (currentSet == 2) {
        return 487
    }

    return randint(480, 750)
}

// ============================================================
// MHR ANY RATE
// ============================================================

function mhrAnyRate(): number {
    if (currentSet == 0) {
        return 540
    }

    if (currentSet == 1) {
        return 956
    }

    if (currentSet == 2) {
        return 1786
    }

    return randint(1260, 1370)
}

// ============================================================
// MHR SPECIFIC RATE
// ============================================================

function mhrSpecificRate(): number {
    if (currentSet == 0) {
        return 1080
    }

    if (currentSet == 1) {
        return 956
    }

    if (currentSet == 2) {
        return 1786
    }

    return randint(1260, 1370)
}

// ============================================================
// DETERMINE RARITY
//
// Specific is treated as a subset of the corresponding
// "Any" rarity. This prevents double-counting.
//
// Example:
// Ascended Heroes SIR Any = 1/70
// Ascended Heroes SIR Specific = 1/1533
//
// First we determine whether the card is an SIR.
// Then we determine whether that SIR is the specific chase.
// ============================================================

function determineRarity(): string {
    let sirRate = sirAnyRate()
    let mhrRate = mhrAnyRate()

    // MHR
    if (oneIn(mhrRate)) {
        return MHR
    }

    // SIR
    if (oneIn(sirRate)) {
        return SIR
    }

    // Other cards
    let roll = randint(1, 100)

    if (roll <= 5) {
        return ULTRA
    }

    if (roll <= 15) {
        return IR
    }

    if (roll <= 35) {
        return RARE
    }

    if (roll <= 65) {
        return UNCOMMON
    }

    return COMMON
}

// ============================================================
// DETERMINE SPECIFIC CHASE
//
// Because "Specific" is part of "Any", we calculate the
// conditional chance after an Any hit.
//
// Example:
// 1/70 SIR Any
// 1/1533 SIR Specific
//
// Conditional chance ≈ 70 / 1533.
// ============================================================

function isSpecific(rarity: string): boolean {
    if (rarity == SIR) {
        let anyRate = sirAnyRate()
        let specificRate = sirSpecificRate()

        // 1 in (specific / any)
        let conditionalRate = Math.floor(
            specificRate / anyRate
        )

        if (conditionalRate < 1) {
            conditionalRate = 1
        }

        return oneIn(conditionalRate)
    }

    if (rarity == MHR) {
        let anyRate = mhrAnyRate()
        let specificRate = mhrSpecificRate()

        let conditionalRate = Math.floor(
            specificRate / anyRate
        )

        if (conditionalRate < 1) {
            conditionalRate = 1
        }

        return oneIn(conditionalRate)
    }

    return false
}

// ============================================================
// GET CARD NAME
// ============================================================

function getCardName(
    rarity: string,
    specific: boolean
): string {

    let result = ""

    if (currentSet == 0) {
        if (rarity == MHR && specific) {
            result = cards0[9]
        } else if (rarity == MHR) {
            result = cards0[8]
        } else if (rarity == SIR && specific) {
            result = cards0[8]
        } else if (rarity == SIR) {
            result = cards0[randint(6, 8)]
        } else if (rarity == IR) {
            result = cards0[randint(5, 8)]
        } else if (rarity == ULTRA) {
            result = cards0[randint(5, 7)]
        } else if (rarity == RARE) {
            result = cards0[randint(3, 7)]
        } else if (rarity == UNCOMMON) {
            result = cards0[randint(1, 5)]
        } else {
            result = cards0[randint(0, 4)]
        }
    }

    if (currentSet == 1) {
        if (rarity == MHR && specific) {
            result = cards1[9]
        } else if (rarity == MHR) {
            result = cards1[8]
        } else if (rarity == SIR && specific) {
            result = cards1[8]
        } else if (rarity == SIR) {
            result = cards1[randint(6, 8)]
        } else if (rarity == IR) {
            result = cards1[randint(5, 8)]
        } else if (rarity == ULTRA) {
            result = cards1[randint(5, 7)]
        } else if (rarity == RARE) {
            result = cards1[randint(3, 7)]
        } else if (rarity == UNCOMMON) {
            result = cards1[randint(1, 5)]
        } else {
            result = cards1[randint(0, 4)]
        }
    }

    if (currentSet == 2) {
        if (rarity == MHR && specific) {
            result = cards2[9]
        } else if (rarity == MHR) {
            result = cards2[8]
        } else if (rarity == SIR && specific) {
            result = cards2[8]
        } else if (rarity == SIR) {
            result = cards2[randint(6, 8)]
        } else if (rarity == IR) {
            result = cards2[randint(5, 8)]
        } else if (rarity == ULTRA) {
            result = cards2[randint(5, 7)]
        } else if (rarity == RARE) {
            result = cards2[randint(3, 7)]
        } else if (rarity == UNCOMMON) {
            result = cards2[randint(1, 5)]
        } else {
            result = cards2[randint(0, 4)]
        }
    }

    if (currentSet == 3) {
        if (rarity == MHR && specific) {
            result = cards3[9]
        } else if (rarity == MHR) {
            result = cards3[8]
        } else if (rarity == SIR && specific) {
            result = cards3[8]
        } else if (rarity == SIR) {
            result = cards3[randint(6, 8)]
        } else if (rarity == IR) {
            result = cards3[randint(5, 8)]
        } else if (rarity == ULTRA) {
            result = cards3[randint(5, 7)]
        } else if (rarity == RARE) {
            result = cards3[randint(3, 7)]
        } else if (rarity == UNCOMMON) {
            result = cards3[randint(1, 5)]
        } else {
            result = cards3[randint(0, 4)]
        }
    }

    return result
}

// ============================================================
// CARD VALUE
// ============================================================

function getCardValue(
    rarity: string,
    specific: boolean
): number {

    if (rarity == COMMON) {
        return randint(1, 3)
    }

    if (rarity == UNCOMMON) {
        return randint(3, 7)
    }

    if (rarity == RARE) {
        return randint(8, 18)
    }

    if (rarity == ULTRA) {
        return randint(20, 45)
    }

    if (rarity == IR) {
        return randint(35, 80)
    }

    if (rarity == SIR) {
        if (specific) {
            return randint(150, 300)
        }

        return randint(80, 150)
    }

    if (rarity == MHR) {
        if (specific) {
            return randint(400, 800)
        }

        return randint(200, 400)
    }

    return 1
}

// ============================================================
// REVEAL CARD
// ============================================================

function revealCard(number: number) {
    let rarity = determineRarity()
    let specific = isSpecific(rarity)
    let name = getCardName(rarity, specific)
    let value = getCardValue(rarity, specific)

    collectionNames.push(name)
    collectionRarities.push(rarity)
    collectionValues.push(value)
    collectionSpecific.push(specific)

    cardsOwned = cardsOwned + 1
    collectionValue = collectionValue + value

    showCard(
        number,
        name,
        rarity,
        value,
        specific
    )
}

// ============================================================
// CARD DISPLAY
// ============================================================

function showCard(
    number: number,
    name: string,
    rarity: string,
    value: number,
    specific: boolean
) {

    let background = 1

    if (rarity == COMMON) {
        background = 1
    }

    if (rarity == UNCOMMON) {
        background = 11
    }

    if (rarity == RARE) {
        background = 9
    }

    if (rarity == ULTRA) {
        background = 5
    }

    if (rarity == IR) {
        background = 7
    }

    if (rarity == SIR) {
        background = 13
    }

    if (rarity == MHR) {
        background = 2
    }

    scene.setBackgroundColor(background)

    if (rarity == IR ||
        rarity == SIR ||
        rarity == MHR) {

        music.playTone(392, 80)
        pause(70)

        music.playTone(523, 80)
        pause(70)

        music.playTone(659, 100)
    }

    if (rarity == MHR) {
        music.playTone(784, 150)
        pause(100)
        music.playTone(988, 200)
    }

    let message = ""

    if (specific) {
        message =
            "CARD " + number + " / 5\n\n" +
            name + "\n\n" +
            rarity + "\n\n" +
            "VALUE: $" + value +
            "\n\n*** CHASE HIT! ***"
    } else {
        message =
            "CARD " + number + " / 5\n\n" +
            name + "\n\n" +
            rarity + "\n\n" +
            "VALUE: $" + value
    }

    game.showLongText(
        message,
        DialogLayout.Full
    )
}

// ============================================================
// COLLECTION
// ============================================================

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (openingPack) {
        return
    }

    if (inCollection) {
        inCollection = false
        showHome()
        return
    }

    openCollection()
})

function openCollection() {

    if (collectionNames.length == 0) {
        game.splash(
            "COLLECTION EMPTY",
            "Open a pack first!"
        )
        return
    }

    inCollection = true
    collectionPosition = collectionNames.length - 1

    showCollectionCard()
}

// ============================================================
// COLLECTION CARD
// ============================================================

function showCollectionCard() {

    let name = collectionNames[collectionPosition]
    let rarity = collectionRarities[collectionPosition]
    let value = collectionValues[collectionPosition]

    let message = ""

    if (collectionSpecific[collectionPosition]) {
        message =
            "COLLECTION\n\n" +
            name + "\n\n" +
            rarity + "\n\n" +
            "VALUE: $" + value +
            "\n\n*** CHASE CARD ***\n\n" +
            "UP/DOWN = BROWSE\n" +
            "A = SELL\n" +
            "B = BACK"
    } else {
        message =
            "COLLECTION\n\n" +
            name + "\n\n" +
            rarity + "\n\n" +
            "VALUE: $" + value +
            "\n\n" +
            "UP/DOWN = BROWSE\n" +
            "A = SELL\n" +
            "B = BACK"
    }

    game.showLongText(
        message,
        DialogLayout.Full
    )
}

// ============================================================
// COLLECTION UP
// ============================================================

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!inCollection) {
        return
    }

    collectionPosition = collectionPosition + 1

    if (collectionPosition >= collectionNames.length) {
        collectionPosition = 0
    }

    showCollectionCard()
})

// ============================================================
// COLLECTION DOWN
// ============================================================

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!inCollection) {
        return
    }

    collectionPosition = collectionPosition - 1

    if (collectionPosition < 0) {
        collectionPosition = collectionNames.length - 1
    }

    showCollectionCard()
})

// ============================================================
// SELL SELECTED CARD
// ============================================================

function sellSelectedCard() {

    if (collectionNames.length == 0) {
        return
    }

    let name = collectionNames[collectionPosition]
    let value = collectionValues[collectionPosition]

    let answer = game.ask(
        "SELL " + name +
        " FOR $" + value + "?"
    )

    if (answer) {

        money = money + value
        collectionValue = collectionValue - value
        cardsOwned = cardsOwned - 1

        collectionNames.removeAt(collectionPosition)
        collectionRarities.removeAt(collectionPosition)
        collectionValues.removeAt(collectionPosition)
        collectionSpecific.removeAt(collectionPosition)

        if (collectionNames.length == 0) {
            inCollection = false

            game.splash(
                "COLLECTION EMPTY",
                "CASH: $" + money
            )

            showHome()
            return
        }

        if (collectionPosition >= collectionNames.length) {
            collectionPosition = collectionNames.length - 1
        }

        game.splash(
            "SOLD!",
            "CASH: $" + money
        )

        showCollectionCard()
    }
}

// ============================================================
// A IN COLLECTION = SELL
// ============================================================

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!inCollection) {
        return
    }

    sellSelectedCard()
})

// ============================================================
// MENU = ODDS + STATS
// ============================================================

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (openingPack || inCollection) {
        return
    }

    showStats()
})

function showStats() {

    let odds = ""

    if (currentSet == 0) {
        odds =
            "SIR ANY: 1/70\n" +
            "SIR SPECIFIC: 1/1533\n" +
            "MHR ANY: 1/540\n" +
            "MHR SPECIFIC: 1/1080"
    }

    if (currentSet == 1) {
        odds =
            "SIR ANY: 1/83\n" +
            "SIR SPECIFIC: 1/496\n" +
            "MHR ANY: 1/956\n" +
            "MHR SPECIFIC: 1/956"
    }

    if (currentSet == 2) {
        odds =
            "SIR ANY: 1/81\n" +
            "SIR SPECIFIC: 1/487\n" +
            "MHR ANY: 1/1786\n" +
            "MHR SPECIFIC: 1/1786"
    }

    if (currentSet == 3) {
        odds =
            "SIR ANY: ~1/80-125\n" +
            "SIR SPECIFIC: ~1/480-750\n" +
            "MHR ANY: ~1/1260-1370\n" +
            "MHR SPECIFIC: ~1/1260-1370"
    }

    game.showLongText(
        "SHOP STATS\n\n" +
        "CASH: $" + money + "\n" +
        "PACKS: " + packsOpened + "\n" +
        "CARDS: " + cardsOwned + "\n" +
        "COLLECTION: $" + collectionValue +
        "\n\n" +
        setNames[currentSet] +
        "\nPACK: $" + packPrices[currentSet] +
        "\n\n" +
        odds,
        DialogLayout.Full
    )
}
```
