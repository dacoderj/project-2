```typescript
namespace SpriteKind {
    export const Booster = SpriteKind.create()
    export const Card = SpriteKind.create()
    export const Sparkle = SpriteKind.create()
}

// ============================================================
// CARD PACK SHOP
// DRAFT 1
// ============================================================

let money = 100
let packsOpened = 0
let cardsOwned = 0
let collectionValue = 0

let currentSet = 0
let gameScreen = 0
let collectionCursor = 0

let collection: string[] = []
let collectionValues: number[] = []
let collectionRarities: string[] = []
let collectionSpecific: boolean[] = []

let lastCardName = ""
let lastCardRarity = ""
let lastCardValue = 0
let lastCardSpecific = false

// ============================================================
// SETS
// ============================================================

let setNames = [
    "ASCENDED HEROES",
    "CHAOS RISING",
    "PERFECT ORDER",
    "PITCH BLACK"
]

let packPrices = [
    10,
    12,
    15,
    18
]

// ============================================================
// ORIGINAL CARD NAMES
// ============================================================

let setCards = [
    [
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
    ],
    [
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
    ],
    [
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
    ],
    [
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
]

// ============================================================
// RARITIES
// ============================================================

let COMMON = "COMMON"
let UNCOMMON = "UNCOMMON"
let RARE = "RARE"
let ULTRA = "ULTRA RARE"
let IR = "ILLUSTRATION RARE"
let SIR = "SPECIAL ILLUSTRATION"
let MHR = "MEGA HYPER RARE"

// ============================================================
// START
// ============================================================

scene.setBackgroundColor(9)

game.splash(
    "CARD PACK SHOP",
    "OPEN • COLLECT • SELL"
)

showHome()

// ============================================================
// HOME
// ============================================================

function showHome() {
    gameScreen = 0
    scene.setBackgroundColor(9)

    game.showLongText(
        "CARD PACK SHOP\n\n" +
        "CASH: $" + money +
        "\n\n" +
        "SET: " + setNames[currentSet] +
        "\nPACK: $" + packPrices[currentSet] +
        "\n\n" +
        "A = OPEN PACK\n" +
        "LEFT/RIGHT = SET\n" +
        "B = COLLECTION\n" +
        "MENU = SHOP / ODDS",
        DialogLayout.Full
    )
}

// ============================================================
// OPEN PACK
// ============================================================

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen != 0) {
        return
    }

    if (money < packPrices[currentSet]) {

        game.splash(
            "NOT ENOUGH CASH!",
            "Need $" + packPrices[currentSet]
        )

        return
    }

    money -= packPrices[currentSet]

    packsOpened += 1

    openPack()
})

// ============================================================
// CHANGE SET
// ============================================================

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen != 0) {
        return
    }

    currentSet -= 1

    if (currentSet < 0) {
        currentSet = setNames.length - 1
    }

    showSet()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen != 0) {
        return
    }

    currentSet += 1

    if (currentSet >= setNames.length) {
        currentSet = 0
    }

    showSet()
})

function showSet() {

    game.splash(
        setNames[currentSet],
        "PACK $" + packPrices[currentSet]
    )
}

// ============================================================
// BOOSTER PACK PIXEL ART
// ============================================================

function makeBooster(): Sprite {

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
        . . 2 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Booster)

    pack.setPosition(80, 60)

    return pack
}

// ============================================================
// CRINKLE
// ============================================================

function crinkle(pack: Sprite) {

    music.playTone(220, 60)

    pack.x -= 5
    pause(60)

    music.playTone(280, 60)

    pack.x += 10
    pause(60)

    music.playTone(220, 60)

    pack.x -= 10
    pause(60)

    music.playTone(330, 60)

    pack.x += 10
    pause(60)

    music.playTone(260, 60)

    pack.x -= 5
    pause(60)

    // Vertical crinkle
    pack.y -= 4
    pause(60)

    pack.y += 8
    pause(60)

    pack.y -= 4

    pause(100)
}

// ============================================================
// TEAR
// ============================================================

function tearPack(pack: Sprite) {

    music.playTone(440, 70)
    pause(70)

    music.playTone(550, 70)
    pause(70)

    music.playTone(660, 70)
    pause(70)

    music.playTone(880, 100)

    pack.destroy()

    // Sparkles
    for (let i = 0; i < 10; i++) {

        let sparkle = sprites.create(img`
            . . 5 . .
            . 5 5 5 .
            5 5 5 5 5
            . 5 5 5 .
            . . 5 . .
        `, SpriteKind.Sparkle)

        sparkle.setPosition(
            randint(25, 135),
            randint(25, 95)
        )

        sparkle.lifespan = 500
    }
}

// ============================================================
// OPEN PACK
// ============================================================

function openPack() {

    gameScreen = 1

    scene.setBackgroundColor(1)

    game.splash(
        setNames[currentSet],
        "GET READY!"
    )

    let pack = makeBooster()

    pause(500)

    game.splash(
        "CRINKLE!",
        "Shake the pack..."
    )

    crinkle(pack)

    pause(200)

    game.splash(
        "RIP!",
        "OPENING!"
    )

    tearPack(pack)

    pause(500)

    game.splash(
        "5 CARDS!",
        "GOOD LUCK!"
    )

    // Reveal cards
    for (let i = 0; i < 5; i++) {

        revealCard(i + 1)

        pause(500)
    }

    gameScreen = 0

    game.splash(
        "PACK COMPLETE!",
        "CASH: $" + money
    )

    showHome()
}

// ============================================================
// RARITY SYSTEM
//
// We use a 1,000,000 roll.
//
// Specific SIR/MHR are carved out of the "Any" category,
// so they are NOT double-counted.
// ============================================================

function determineRarity(): string {

    let roll = randint(1, 1000000)

    // ------------------------------------------
    // MHR
    // ------------------------------------------

    let mhrSpecificRate = 0
    let mhrAnyRate = 0

    if (currentSet == 0) {
        mhrSpecificRate = 926
        mhrAnyRate = 1852
    }

    if (currentSet == 1) {
        mhrSpecificRate = 1046
        mhrAnyRate = 1046
    }

    if (currentSet == 2) {
        mhrSpecificRate = 560
        mhrAnyRate = 560
    }

    if (currentSet == 3) {
        let denominator = randint(1260, 1370)

        mhrSpecificRate = Math.idiv(1000000, denominator)
        mhrAnyRate = mhrSpecificRate
    }

    if (roll <= mhrSpecificRate) {
        lastCardSpecific = true
        return MHR
    }

    if (roll <= mhrAnyRate) {
        lastCardSpecific = false
        return MHR
    }

    // ------------------------------------------
    // SIR
    // ------------------------------------------

    let sirSpecificRate = 0
    let sirAnyRate = 0

    if (currentSet == 0) {
        sirSpecificRate = 652
        sirAnyRate = 14285
    }

    if (currentSet == 1) {
        sirSpecificRate = 2016
        sirAnyRate = 12048
    }

    if (currentSet == 2) {
        sirSpecificRate = 2053
        sirAnyRate = 12345
    }

    if (currentSet == 3) {

        let denominator = randint(480, 750)

        sirSpecificRate =
            Math.idiv(1000000, denominator)

        let anyDenominator =
            randint(80, 125)

        sirAnyRate =
            Math.idiv(1000000, anyDenominator)
    }

    if (roll <= sirSpecificRate) {
        lastCardSpecific = true
        return SIR
    }

    if (roll <= sirAnyRate) {
        lastCardSpecific = false
        return SIR
    }

    // ------------------------------------------
    // OTHER RARITIES
    // ------------------------------------------

    let commonRoll = randint(1, 100)

    if (commonRoll <= 5) {
        return ULTRA
    }

    if (commonRoll <= 15) {
        return IR
    }

    if (commonRoll <= 35) {
        return RARE
    }

    if (commonRoll <= 65) {
        return UNCOMMON
    }

    return COMMON
}

// ============================================================
// CARD REVEAL
// ============================================================

function revealCard(number: number) {

    lastCardSpecific = false

    let rarity = determineRarity()

    let name = chooseCard(
        rarity,
        lastCardSpecific
    )

    let value = getValue(
        rarity,
        lastCardSpecific
    )

    lastCardName = name
    lastCardRarity = rarity
    lastCardValue = value

    collection.push(name)
    collectionValues.push(value)
    collectionRarities.push(rarity)
    collectionSpecific.push(lastCardSpecific)

    cardsOwned += 1
    collectionValue += value

    displayCard(
        name,
        rarity,
        value,
        lastCardSpecific,
        number
    )
}

// ============================================================
// CHOOSE CARD
// ============================================================

function chooseCard(
    rarity: string,
    specific: boolean
): string {

    let cards = setCards[currentSet]

    if (rarity == MHR && specific) {
        return cards[9]
    }

    if (rarity == MHR) {
        return cards[8]
    }

    if (rarity == SIR && specific) {
        return cards[8]
    }

    if (rarity == SIR) {
        return cards[randint(6, 8)]
    }

    if (rarity == IR) {
        return cards[randint(5, 8)]
    }

    if (rarity == ULTRA) {
        return cards[randint(5, 7)]
    }

    if (rarity == RARE) {
        return cards[randint(3, 7)]
    }

    if (rarity == UNCOMMON) {
        return cards[randint(1, 5)]
    }

    return cards[randint(0, 4)]
}

// ============================================================
// CARD VALUES
// ============================================================

function getValue(
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
// CARD REVEAL SCREEN
// ============================================================

function displayCard(
    name: string,
    rarity: string,
    value: number,
    specific: boolean,
    number: number
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

    // ------------------------------------------
    // Rare card animation
    // ------------------------------------------

    if (rarity == IR ||
        rarity == SIR ||
        rarity == MHR) {

        for (let i = 0; i < 3; i++) {

            music.playTone(
                392 + i * 120,
                100
            )

            pause(80)
        }
    }

    // ------------------------------------------
    // MHR special effect
    // ------------------------------------------

    if (rarity == MHR) {

        for (let i = 0; i < 12; i++) {

            let sparkle = sprites.create(img`
                . . 5 . .
                . 5 5 5 .
                5 5 5 5 5
                . 5 5 5 .
                . . 5 . .
            `, SpriteKind.Sparkle)

            sparkle.setPosition(
                randint(15, 145),
                randint(15, 105)
            )

            sparkle.lifespan = 700
        }

        music.playMelody(
            "C5 E5 G5 C6",
            180
        )
    }

    // ------------------------------------------
    // Chase message
    // ------------------------------------------

    let extra = ""

    if (specific) {
        extra = "\n\n*** CHASE HIT! ***"
    }

    game.showLongText(
        "CARD " +
        number +
        " / 5\n\n" +
        name +
        "\n\n" +
        rarity +
        "\n\nVALUE: $" +
        value +
        extra,
        DialogLayout.Full
    )
}

// ============================================================
// COLLECTION
// ============================================================

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen != 0) {
        return
    }

    openCollection()
})

function openCollection() {

    if (collection.length == 0) {

        game.splash(
            "COLLECTION EMPTY",
            "Open a pack!"
        )

        return
    }

    gameScreen = 2
    collectionCursor = collection.length - 1

    showCollectionCard()
}

// ============================================================
// SHOW SELECTED COLLECTION CARD
// ============================================================

function showCollectionCard() {

    scene.setBackgroundColor(9)

    let name = collection[collectionCursor]
    let rarity = collectionRarities[collectionCursor]
    let value = collectionValues[collectionCursor]

    let chaseText = ""

    if (collectionSpecific[collectionCursor]) {
        chaseText = "\n*** CHASE CARD ***"
    }

    game.showLongText(
        "COLLECTION\n\n" +
        name +
        "\n\n" +
        rarity +
        "\nVALUE: $" +
        value +
        chaseText +
        "\n\n" +
        "UP/DOWN = BROWSE\n" +
        "A = SELL\n" +
        "B = BACK",
        DialogLayout.Full
    )
}

// ============================================================
// COLLECTION NAVIGATION
// ============================================================

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen != 2) {
        return
    }

    collectionCursor += 1

    if (collectionCursor >= collection.length) {
        collectionCursor = 0
    }

    showCollectionCard()
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen != 2) {
        return
    }

    collectionCursor -= 1

    if (collectionCursor < 0) {
        collectionCursor = collection.length - 1
    }

    showCollectionCard()
})

// ============================================================
// SELL SELECTED CARD
// ============================================================

function sellSelectedCard() {

    if (collection.length == 0) {
        return
    }

    let name = collection[collectionCursor]
    let value = collectionValues[collectionCursor]

    let answer = game.ask(
        "SELL " +
        name +
        " FOR $" +
        value +
        "?"
    )

    if (answer) {

        money += value
        collectionValue -= value

        collection.removeAt(collectionCursor)
        collectionValues.removeAt(collectionCursor)
        collectionRarities.removeAt(collectionCursor)
        collectionSpecific.removeAt(collectionCursor)

        cardsOwned -= 1

        if (collection.length == 0) {

            gameScreen = 0

            game.splash(
                "COLLECTION EMPTY",
                "Cash: $" + money
            )

            showHome()

            return
        }

        if (collectionCursor >= collection.length) {
            collectionCursor = collection.length - 1
        }

        game.splash(
            "SOLD!",
            "CASH: $" + money
        )

        showCollectionCard()
    }
}

// ============================================================
// A = SELL WHEN IN COLLECTION
// ============================================================

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen == 2) {
        sellSelectedCard()
    }
})

// ============================================================
// B = EXIT COLLECTION
// ============================================================

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen == 2) {

        gameScreen = 0

        showHome()
    }
})

// ============================================================
// MENU = SHOP / STATS
// ============================================================

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {

    if (gameScreen != 0) {
        return
    }

    game.showLongText(
        "SHOP & STATS\n\n" +
        "CASH: $" + money +
        "\nPACKS OPENED: " + packsOpened +
        "\nCARDS: " + cardsOwned +
        "\nCOLLECTION: $" + collectionValue +
        "\n\nCURRENT SET:\n" +
        setNames[currentSet] +
        "\nPACK: $" +
        packPrices[currentSet] +
        "\n\n" +
        getHitRateText(),
        DialogLayout.Full
    )
})

// ============================================================
// HIT RATE TEXT
// ============================================================

function getHitRateText(): string {

    if (currentSet == 0) {

        return (
            "SIR ANY: 1/70\n" +
            "SIR SPECIFIC: 1/1533\n" +
            "MHR ANY: 1/540\n" +
            "MHR SPECIFIC: 1/1080"
        )
    }

    if (currentSet == 1) {

        return (
            "SIR ANY: 1/83\n" +
            "SIR SPECIFIC: 1/496\n" +
            "MHR ANY: 1/956\n" +
            "MHR SPECIFIC: 1/956"
        )
    }

    if (currentSet == 2) {

        return (
            "SIR ANY: 1/81\n" +
            "SIR SPECIFIC: 1/487\n" +
            "MHR ANY: 1/1786\n" +
            "MHR SPECIFIC: 1/1786"
        )
    }

    return (
        "SIR ANY: ~1/80-125\n" +
        "SIR SPECIFIC: ~1/480-750\n" +
        "MHR ANY: ~1/1260-1370\n" +
        "MHR SPECIFIC: ~1/1260-1370"
    )
}
```
