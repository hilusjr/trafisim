const routeTramWE = () => {
  const route = []
  for (i = 146; i <= 199; i++) route.push(i)
  return route
}

const routeTramEW = () => {
  const route = []
  for (i = 145; i >= 92; i--) route.push(i)
  return route
}

// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
const routeCarWE1 = () => {
  const route = []
  for (i = 200; i <= 245; i++) route.push(i)
  return route
}

const routeCarWE2 = () => {
  const route = []
  for (i = 246; i <= 291; i++) route.push(i)
  return route
}

const routeCarWN = () => {
  const route = []
  for (i = 200; i <= 222; i++) route.push(i)
  route.push(341, 173, 119, 338, 69, 23)
  for (i = 335; i >= 324; i--) route.push(i)
  return route
}

const routeCarWS = () => {
  const route = []
  for (i = 246; i <= 267; i++) route.push(i)
  for (i = 312; i <= 323; i++) route.push(i)
  return route
}

// EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
const routeCarEW1 = () => {
  const route = []
  for (i = 45; i >= 0; i--) route.push(i)
  return route
}

const routeCarEW2 = () => {
  const route = []
  for (i = 91; i >= 46; i--) route.push(i)
  return route
}

const routeCarEN = () => {
  const route = []
  for (i = 45; i >= 23; i--) route.push(i)
  for (i = 335; i >= 324; i--) route.push(i)
  return route
}

const routeCarES = () => {
  const route = []
  for (i = 91; i >= 69; i--) route.push(i)
  route.push(306, 118, 172, 309, 222, 268)
  for (i = 312; i <= 323; i++) route.push(i)
  return route
}

// NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
const routeCarNS = () => {
  const route = []
  for (i = 292; i <= 303; i++) route.push(i)
  route.push(22, 68, 306, 118, 172, 309, 222, 268)
  for (i = 312; i <= 323; i++) route.push(i)
  return route
}

const routeCarNW = () => {
  const route = []
  for (i = 292; i <= 303; i++) route.push(i)
  for (i = 21; i >= 0; i--) route.push(i)
  return route
}

const routeCarNE = () => {
  const route = []
  for (i = 292; i <= 303; i++) route.push(i)
  route.push(22, 68, 306, 118, 172, 309)
  for (i = 223; i <= 245; i++) route.push(i)
  return route
}

// SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
const routeCarSN = () => {
  const route = []
  for (i = 355; i >= 344; i--) route.push(i)
  route.push(269, 223, 341, 173, 119, 338, 69, 23)
  for (i = 335; i >= 324; i--) route.push(i)
  return route
}

const routeCarSW = () => {
  const route = []
  for (i = 355; i >= 344; i--) route.push(i)
  route.push(269, 223, 341, 173, 119, 338)
  for (i = 68; i >= 46; i--) route.push(i)
  return route
}

const routeCarSE = () => {
  const route = []
  for (i = 355; i >= 344; i--) route.push(i)
  for (i = 270; i <= 291; i++) route.push(i)
  return route
}
