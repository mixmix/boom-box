// import Player from './components/player.js'

// export default async function App () {
//   var player = await Player()

//   const view = yo`
//     <div id='app'>
//       <h1>Boom box</h1>
//       <input type='text' onkeyup=${updateCassette}/>

//       ${player}
//     </div>
//   `

//   async function updateCassette (ev) {
//     const link = ev.target.value
//     // TODO validate
//     yo.update(player, await Player(link))
//   }

//   return view
// }
