const yo = require('yo-yo')

document.__modules = document.__modules || {}
if (document.__modules.yo) throw new Error('collision!')

document.__modules.yo = yo
