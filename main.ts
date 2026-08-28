```typescript
namespace SpriteKind {
    export const Booster = SpriteKind.create()
    export const Card = SpriteKind.create()
}

// ============================================================
// CARD PACK SHOP
// ============================================================

let money = 100
let packsOpened = 0
let cardsOwned = 0
let collectionValue = 0

let currentSet = 0

let currentCardName = ""
let currentCardRarity = ""
let currentCardValue = 0
let currentCardIsSpecific = false

let collection: string[] = []
let collectionValues: number[] = []
let collectionRarities: string[] = []

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
// HIT RATES
//
// SIR ANY:
// Ascended Heroes = 1/70
// Chaos Rising   = 1/83
// Perfect Order  = 1/81
// Pitch Black    = approximately 1/80-125
//
// SIR SPECIFIC:
// Ascended Heroes = 1/1533
// Chaos Rising   = 1/496
// Perfect Order  = 1/487
// Pitch Black    = approximately 1/480-750
//
// MHR ANY:
// Ascended Heroes = 1/540
// Chaos Rising   = 1/956
// Perfect Order  = 1/1786
// Pitch Black    = approximately 1/1260-1370
//
// MHR SPECIFIC:
// Ascended Heroes = 1/1080
// Chaos Rising   = 1/956
// Perfect Order  = 1/1786
// Pitch Black    = approximately 1/1260-1370
// ============================================================

// ============================================================
// CARD NAMES
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
    "Open • Collect • Sell"
)

showHome()

// ============================================================
// HOME
// ============================================================

function showHome() {
    scene.setBackgroundColor(9)

    game.showLongText(
        "CARD PACK SHOP\n\n" +
        "CASH: $" + money + "\n\n" +
        "SET: " + setNames[currentSet] + "\n" +
        "PACK: $" + packPrices[currentSet] + "\n\n" +
        "A = OPEN PACK\n" +
        "LEFT/RIGHT = CHANGE SET\n" +
        "B = COLLECTION\n" +
        "MENU = STATS",
        DialogLayout.Full
    )
}

// ============================================================
// CREATE PIXEL ART BOOSTER PACK
// ============================================================

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
    `, SpriteKind.Booster)

    pack.setPosition(80, 60)

    return pack
}

// ============================================================
// PACK CRINKLE ANIMATION
// ============================================================

function crinklePack(pack: Sprite) {
    // Shake left
    pack.x -= 4
    pause(70)

    // Shake right
    pack.x += 8
    pause(70)

    // Shake left
    pack.x -= 8
    pause(70)

    // Shake right
    pack.x += 6
    pause(70)

    // Shake left
    pack.x -= 4
    pause(70)

    // Little "crinkle" bounce
    pack.y -= 3
    pause(60)

    pack.y += 6
    pause(60)

    pack.y -= 3
    pause(60)

    // Return to center
    pack.setPosition(80, 60)
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
// OPENING SEQUENCE
// ============================================================

function openPack() {
    scene.setBackgroundColor(1)

    let pack = makePack()

    game.splash(
        "NEW PACK!",
        setNames[currentSet]
    )

    crinklePack(pack)

    game.splash(
        "RIP!",
        "Opening..."
    )

    pack.destroy()

    // Reveal five cards
    for (let i = 0; i < 5; i++) {
        revealCard()
        pause(700)
    }

    game.splash(
        "PACK COMPLETE!",
        "5 cards collected!"
    )

    showHome()
}

// ============================================================
// REVEAL CARD
// ============================================================

function revealCard() {
    let rarity = determineRarity()
    let specific = false

    // Check whether this is a specific chase hit
    if (rarity == SIR) {
        specific = rollSpecificSIR()
    }

    if (rarity == MHR) {
        specific = rollSpecificMHR()
    }

    let name = chooseCardName(rarity, specific)
    let value = getCardValue(rarity, specific)

    currentCardName = name
    currentCardRarity = rarity
    currentCardValue = value
    currentCardIsSpecific = specific

    collection.push(name)
    collectionValues.push(value)
    collectionRarities.push(rarity)

    cardsOwned += 1
    collectionValue += value

    showCard(name, rarity, value, specific)
}

// ============================================================
// DETERMINE RARITY
//
// SIR and MHR are checked independently using the supplied
// hit-rate information.
//
// IR / UR / Rare / Uncommon / Common fill the remaining slots.
// ============================================================

function determineRarity(): string {

    // MHR first because it is the rarest category.
    if (rollMHR()) {
        return MHR
    }

    // SIR next.
    if (rollSIR()) {
        return SIR
    }

    // Remaining rarities.
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
// SIR HIT RATE
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
        // Pitch Black range: 1/80-125
        denominator = randint(80, 125)
    }

    return randint(1, denominator) == 1
}

// ============================================================
// MHR HIT RATE
// ============================================================

function rollMHR(): boolean {
    let denominator = 1260

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
        // Pitch Black range: 1/1260-1370
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
        // Pitch Black range: 1/480-750
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
        // Pitch Black range: 1/1260-1370
        denominator = randint(1260, 1370)
    }

    return randint(1, denominator) == 1
}

// ============================================================
// CHOOSE CARD
// ============================================================

function chooseCardName(rarity: string, specific: boolean): string {
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
// CARD VALUE
// ============================================================

function getCardValue(rarity: string, specific: boolean): number {

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
// SHOW CARD
// ============================================================

function showCard(
    name: string,
    rarity: string,
    value: number,
    specific: boolean
) {

    let color = 1

    if (rarity == COMMON) {
        color = 1
    }

    if (rarity == UNCOMMON) {
        color = 11
    }

    if (rarity == RARE) {
        color = 9
    }

    if (rarity == ULTRA) {
        color = 5
    }

    if (rarity == IR) {
        color = 7
    }

    if (rarity == SIR) {
        color = 13
    }

    if (rarity == MHR) {
        color = 2
    }

    scene.setBackgroundColor(color)

    let extra = ""

    if (specific) {
        extra = "\n*** CHASE HIT! ***"
    }

    game.splash(
        name,
        rarity +
        "\nVALUE: $" +
        value +
        extra
    )
}

// ============================================================
// CHANGE SET
// ============================================================

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    currentSet -= 1

    if (currentSet < 0) {
        currentSet = setNames.length - 1
    }

    game.splash(
        setNames[currentSet],
        "Pack $" + packPrices[currentSet]
    )
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    currentSet += 1

    if (currentSet >= setNames.length) {
        currentSet = 0
    }

    game.splash(
        setNames[currentSet],
        "Pack $" + packPrices[currentSet]
    )
})

// ============================================================
// COLLECTION
// ============================================================

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    showCollection()
})

function showCollection() {

    if (collection.length == 0) {
        game.splash(
            "COLLECTION EMPTY",
            "Open some packs!"
        )
        return
    }

    let text = "COLLECTION\n\n"

    let start = Math.max(0, collection.length - 10)

    for (let i = start; i < collection.length; i++) {
        text += collection[i]
        text += "\n"
        text += collectionRarities[i]
        text += "  $"
        text += collectionValues[i]
        text += "\n\n"
    }

    text += "CARDS: " + cardsOwned
    text += "\nVALUE: $" + collectionValue
    text += "\nCASH: $" + money

    game.showLongText(
        text,
        DialogLayout.Full
    )
}

// ============================================================
// SELL CURRENT CARD
//
// Pressing B opens collection. The most recently pulled card
// can be sold from the sell screen.
// ============================================================

function sellLastCard() {

    if (collection.length == 0) {
        game.splash(
            "NOTHING TO SELL",
            "Open a pack!"
        )
        return
    }

    let index = collection.length - 1

    let answer = game.ask(
        "SELL " + collection[index] +
        " FOR $" +
        collectionValues[index] +
        "?"
    )

    if (answer) {

        money += collectionValues[index]

        collectionValue -= collectionValues[index]

        collection.removeAt(index)
        collectionValues.removeAt(index)
        collectionRarities.removeAt(index)

        cardsOwned -= 1

        game.splash(
            "SOLD!",
            "Cash: $" + money
        )
    }
}

// ============================================================
// MENU = STATS + HIT RATES
// ============================================================

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {

    let hitText = ""

    if (currentSet == 0) {
        hitText =
            "SIR ANY: 1/70\n" +
            "SIR SPECIFIC: 1/1533\n" +
            "MHR ANY: 1/540\n" +
            "MHR SPECIFIC: 1/1080"
    }

    if (currentSet == 1) {
        hitText =
            "SIR ANY: 1/83\n" +
            "SIR SPECIFIC: 1/496\n" +
            "MHR ANY: 1/956\n" +
            "MHR SPECIFIC: 1/956"
    }

    if (currentSet == 2) {
        hitText =
            "SIR ANY: 1/81\n" +
            "SIR SPECIFIC: 1/487\n" +
            "MHR ANY: 1/1786\n" +
            "MHR SPECIFIC: 1/1786"
    }

    if (currentSet == 3) {
        hitText =
            "SIR ANY: 1/80-125\n" +
            "SIR SPECIFIC: 1/480-750\n" +
            "MHR ANY: 1/1260-1370\n" +
            "MHR SPECIFIC: 1/1260-1370"
    }

    game.showLongText(
        "SHOP STATS\n\n" +
        "CASH: $" + money + "\n" +
        "PACKS: " + packsOpened + "\n" +
        "CARDS: " + cardsOwned + "\n" +
        "COLLECTION: $" + collectionValue +
        "\n\n" +
        setNames[currentSet] +
        "\n\n" +
        hitText,
        DialogLayout.Full
    )
})
```
