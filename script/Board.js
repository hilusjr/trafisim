const LANE_1 = document.querySelector('.lane1')
const LANE_2 = document.querySelector('.lane2')
const LANE_3 = document.querySelector('.lane3')
const LANE_4 = document.querySelector('.lane4')
const LANE_5 = document.querySelector('.lane5')
const LANE_6 = document.querySelector('.lane6')
const LANE_7 = document.querySelector('.lane7')
const LANE_8 = document.querySelector('.lane8')

function createBoard() {
  //lane 1
  for (let i = 0; i <= 45; i++) {
    const tile = new Tile(i)
    tile.appendToLane(LANE_1)
    tiles.push(tile)
  }

  //lane2
  for (let i = 46; i <= 91; i++) {
    const tile = new Tile(i)
    tile.appendToLane(LANE_2)
    tiles.push(tile)
  }

  //lane3
  for (let i = 92; i <= 145; i++) {
    const tile = new Tile(i)
    tile.appendToLane(LANE_3)
    tiles.push(tile)
  }

  //lane4
  for (let i = 146; i <= 199; i++) {
    const tile = new Tile(i)
    tile.appendToLane(LANE_4)
    tiles.push(tile)
  }

  //lane5
  for (let i = 200; i <= 245; i++) {
    const tile = new Tile(i)
    tile.appendToLane(LANE_5)
    tiles.push(tile)
  }

  //lane6
  for (let i = 246; i <= 291; i++) {
    const tile = new Tile(i)
    tile.appendToLane(LANE_6)
    tiles.push(tile)
  }

  //lane7
  for (let i = 292; i <= 323; i++) {
    const tile = new Tile(i)
    tile.appendToLane(LANE_7)
    tiles.push(tile)
  }

  //lane8
  for (let i = 324; i <= 355; i++) {
    const tile = new Tile(i)
    tile.appendToLane(LANE_8)
    tiles.push(tile)
  }
}
