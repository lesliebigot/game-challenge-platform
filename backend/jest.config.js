export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest", // désactive Babel, utile avec "type": "module"
  },
};