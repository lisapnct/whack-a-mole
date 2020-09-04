// WHACK A MOLE GAME //

Elements:
- mole
- hole
- coin
- rabbit
- hammer (pointer)

Layout:
- 4x4 CSS grid
- kind of navbar at the top including:
    - score = count # of clicks on moles
    - health bar = count # of clicks on the good guy and deduct from total
    - timer
    - coins = count # of clicks on coins and run mode super hammer when > x coins
- pop up start game at the beginning + rules
- pop up with score and restart at the end

Rules: 
- hit as many moles as possible in 1 minutes (1 mole hit = X points)
- the moles appear and disappear faster and faster
- collect coins to buy a "super hammer" (mode score x2)
- if you click on the rabbit => - x points

HINTS:
- think everything as array of objects (not a single object at the beginning...)