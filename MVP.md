// WHACK A MOLE MVP //

Elements:
- mole
- hole
- score counter
- timer

Layout:
- 4x4 CSS GRID

Rules:
- hit as many moles as possible in 1 minute (1 mole = X points)
- the moles appear and disappear faster and faster

Javascript logic todo:

- an array of moles?
- display characters (moles, holes) on a random grid square for a given time (ex: 2sec)
- reduce moles display time gradually && increase nb of moles displayed gradually?
- on click on a mole => counter += Xpts
- one minute timer:
    - setInterval 1000ms => currentTime += 1
    - when currentTime >= 60 => end game
