```typescript
namespace SpriteKind {
    export const Booster = SpriteKind.create()
    export const Card = SpriteKind.create()
    export const Sparkle = SpriteKind.create()
}

// ============================================================
// CARD PACK SHOP
// ============================================================

let money = 100
let packsOpened = 0
let cardsOwned = 0
let collectionValue = 0

let currentSet = 0

let collection: string[] = []
let collectionValues: number[] = []
let collectionRarities: string[] = []

let lastCardName = ""
let lastCardRarity = ""
let lastCardValue = 0
let lastCardSpecific = false

// ============================================================
// SET INFORMATION
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
// CARD LISTS
// Original/fan-made names
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
// HOME SCREEN
// ============================================================

function showHome() {

    scene.setBackgroundColor(9)

    game.showLongText(
        "CARD PACK SHOP\n\n" +
        "CASH: $" + money +
        "\n\nSET: " + setNames[currentSet] +
        "\nPACK: $" + packPrices[currentSet] +
        "\n\n" +
        "A = OPEN PACK\n" +
        "LEFT/RIGHT = CHANGE SET\n" +
        "B = COLLECTION\n" +
        "MENU = SHOP / ODDS",
        DialogLayout.Full
    )
}

// ============================================================
// SHOP / SET SELECTION
// ============================================================

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {

    game.showLongText(
        "SET SHOP\n\n" +
        "LEFT/RIGHT: CHANGE SET\n" +
        "A: OPEN PACK\n\n" +
        "CURRENT:\n" +
        setNames[currentSet] +
        "\nPACK: $" +
        packPrices[currentSet] +
        "\n\n" +
        getHitRateText(),
        DialogLayout.Full
    )
})

// ============================================================
// CHANGE SET
// ============================================================

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {

    currentSet -= 1

    if (currentSet < 0) {
        currentSet = setNames.length - 1
    }

    showSetCard()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {

    currentSet += 1

    if (currentSet >= setNames.length) {
        currentSet = 0
    }

    showSetCard()
})

function showSetCard() {

    game.splash(
        setNames[currentSet],
        "PACK $" + packPrices[currentSet]
    )
}

// ============================================================
// HIT RATE DISPLAY
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

// ============================================================
// OPEN PACK
// ============================================================

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {

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
// PIXEL ART BOOSTER
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
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Booster)

    pack.setPosition(80, 60)

    return pack
}

// ============================================================
// CRINKLE ANIMATION
// ============================================================

function crinkle(pack: Sprite) {

    music.playTone(262, music.beat(1))

    pack.x -= 5
    pause(70)

    music.playTone(330, music.beat(1))

    pack.x += 10
    pause(70)

    music.playTone(262, music.beat(1))

    pack.x -= 10
    pause(70)

    music.playTone(392, music.beat(1))

    pack.x += 10
    pause(70)

    music.playTone(330, music.beat(1))

    pack.x -= 5
    pause(70)

    // Little bounce

    pack.y -= 4
    pause(70)

    pack.y += 8
    pause(70)

    pack.y -= 4

    pause(100)

    pack.setPosition(80, 60)
}

// ============================================================
// TEAR PACK
// ============================================================

function tearPack(pack: Sprite) {

    music.playTone(523, music.beat(1))
    pause(100)

    music.playTone(659, music.beat(1))
    pause(100)

    music.playTone(784, music.beat(1))
    pause(100)

    pack.destroy()

    // Sparkle burst
    for (let i = 0; i < 8; i++) {

        let sparkle = sprites.create(img`
            . . 5 . .
            . 5 5 5 .
            5 5 5 5 5
            . 5 5 5 .
            . . 5 . .
        `, SpriteKind.Sparkle)

        sparkle.setPosition(
            30 + randint(0, 100),
            30 + randint(0, 60)
        )

        sparkle.lifespan = 400
    }

    music.playTone(988, music.beat(1))
}

// ============================================================
// FULL PACK OPENING
// ============================================================

function openPack() {

    scene.setBackgroundColor(1)

    game.splash(
        setNames[currentSet],
        "GET READY!"
    )

    let pack = makeBooster()

    pause(500)

    game.showLongText(
        "A = RIP OPEN!",
        DialogLayout.Bottom
    )

    crinkle(pack)

    pause(200)

    tearPack(pack)

    game.splash(
        "PACK OPEN!",
        "5 CARDS!"
    )

    pause(500)

    // Five cards
    for (let i = 0; i < 5; i++) {

        revealCard(i + 1)

        pause(700)
    }

    game.splash(
        "PACK COMPLETE!",
        "Cards: " + cardsOwned
    )

    showHome()
}

// ============================================================
// RARITY ROLL
// ============================================================
//
// MHR and SIR are rolled first.
// The remaining cards use ordinary rarity categories.
// ============================================================

function determineRarity(): string {

    // MHR
    if (rollMHR()) {
        return MHR
    }

    // SIR
    if (rollSIR()) {
        return SIR
    }

    // Other rarities
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
// SIR HIT
// ============================================================

function rollSIR(): boolean {

    let denominator = 80

    if (currentSet == 0) {
        denominator = 70
    }

    if (currentSet == 1) {
        denominator = 83
    }

    if (currentSet == 2) {
        denominator = 81
    }

    if (currentSet == 3) {
        denominator = randint(80, 125)
    }

    return randint(1, denominator) == 1
}

// ============================================================
// MHR HIT
// ============================================================

function rollMHR(): boolean {

    let denominator = 1000

    if (currentSet == 0) {
        denominator = 540
    }

    if (currentSet == 1) {
        denominator = 956
    }

    if (currentSet == 2) {
        denominator = 1786
    }

    if (currentSet == 3) {
        denominator = randint(1260, 1370)
    }

    return randint(1, denominator) == 1
}

// ============================================================
// SPECIFIC SIR
// ============================================================

function rollSpecificSIR(): boolean {

    let denominator = 500

    if (currentSet == 0) {
        denominator = 1533
    }

    if (currentSet == 1) {
        denominator = 496
    }

    if (currentSet == 2) {
        denominator = 487
    }

    if (currentSet == 3) {
        denominator = randint(480, 750)
    }

    return randint(1, denominator) == 1
}

// ============================================================
// SPECIFIC MHR
// ============================================================

function rollSpecificMHR(): boolean {

    let denominator = 1000

    if (currentSet == 0) {
        denominator = 1080
    }

    if (currentSet == 1) {
        denominator = 956
    }

    if (currentSet == 2) {
        denominator = 1786
    }

    if (currentSet == 3) {
        denominator = randint(1260, 1370)
    }

    return randint(1, denominator) == 1
}

// ============================================================
// CARD REVEAL
// ============================================================

function revealCard(number: number) {

    let rarity = determineRarity()

    let specific = false

    if (rarity == SIR) {
        specific = rollSpecificSIR()
    }

    if (rarity == MHR) {
        specific = rollSpecificMHR()
    }

    let name = chooseCard(
        rarity,
        specific
    )

    let value = getValue(
        rarity,
        specific
    )

    lastCardName = name
    lastCardRarity = rarity
    lastCardValue = value
    lastCardSpecific = specific

    collection.push(name)
    collectionValues.push(value)
    collectionRarities.push(rarity)

    cardsOwned += 1
    collectionValue += value

    displayCard(
        name,
        rarity,
        value,
        specific,
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

    // Specific MHR chase
    if (rarity == MHR && specific) {
        return cards[9]
    }

    // Other MHR
    if (rarity == MHR) {
        return cards[8]
    }

    // Specific SIR chase
    if (rarity == SIR && specific) {
        return cards[8]
    }

    // Other SIR
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
// VALUES
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
// CARD DISPLAY
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

    // Rare animation
    if (rarity == IR ||
        rarity == SIR ||
        rarity == MHR) {

        for (let i = 0; i < 3; i++) {

            music.playTone(
                392 + i * 120,
                music.beat(1)
            )

            pause(80)
        }
    }

    let extra = ""

    if (specific) {
        extra = "\n\n*** CHASE HIT! ***"
    }

    game.showLongText(
        "CARD " + number + " / 5\n\n" +
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

    if (collection.length == 0) {

        game.splash(
            "COLLECTION EMPTY",
            "Open a pack!"
        )

        return
    }

    showCollection()
})

function showCollection() {

    let text = "COLLECTION\n\n"

    let start = Math.max(
        0,
        collection.length - 10
    )

    for (let i = start; i < collection.length; i++) {

        text += collection[i]
        text += "\n"
        text += collectionRarities[i]
        text += "  $"
        text += collectionValues[i]
        text += "\n\n"
    }

    text +=
        "CARDS: " +
        cardsOwned +
        "\nVALUE: $" +
        collectionValue +
        "\nCASH: $" +
        money

    game.showLongText(
        text,
        DialogLayout.Full
    )
}

// ============================================================
// SELL MOST RECENT CARD
//
// Pressing down from the collection screen isn't available
// in this simple version, so the last card can be sold from
// the sell option below.
// ============================================================

function sellLastCard() {

    if (collection.length == 0) {

        game.splash(
            "NOTHING TO SELL",
            "Open some packs!"
        )

        return
    }

    let index = collection.length - 1

    let answer = game.ask(
        "SELL " +
        collection[index] +
        " FOR $" +
        collectionValues[index] +
        "?"
    )

    if (answer) {

        money += collectionValues[index]

        collectionValue -=
            collectionValues[index]

        collection.removeAt(index)
        collectionValues.removeAt(index)
        collectionRarities.removeAt(index)

        cardsOwned -= 1

        game.splash(
            "SOLD!",
            "CASH: $" + money
        )
    }
}

// ============================================================
// SELL LAST CARD WITH DOWN BUTTON
// ============================================================

controller.down.onEvent(
    ControllerButtonEvent.Pressed,
    function () {

        sellLastCard()
    }
)
```
