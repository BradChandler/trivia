import easy from "../assets/easy-difficulty.svg";
import hard from "../assets/hard-difficulty.svg";
import medium from "../assets/medium-difficulty.svg";

export const defaultPlayers = [
  {
    id: new Date().getTime(), 
    name: "", 
    score: 0
  }, 
  {
    id: new Date().getTime() + 1, 
    name: "", 
    score: 0
  }
]

export const createPlayer = (index) => {
  return {
    id: new Date().getTime() + index, 
    name: "", 
    score: 0
  }
}

export const gamePresets = [
  {
    id: "easy-game",
    name: "preset-selection",
    heading: "Easy Game", 
    img: easy,
    config: {
      questionCount: 10, 
      categories: "Any Category", 
      timer: 20
    }, 
    value: "easy"
  }, 
  {
    id: "medium-game",
    name: "preset-selection",
    heading: "Medium Game", 
    img: medium,
    config: {
      questionCount: 10, 
      categories: "Any Categories", 
      timer: 10
    }, 
    value: "medium"
  }, 
  {
    id: "hard-game",
    name: "preset-selection",
    heading: "Hard Game", 
    img: hard,
    config: {
      questionCount: 20, 
      categories: "Any Categories", 
      timer: 10
    }, 
    value: "hard"
  }
]

export const gameRules = {
  easy: {
    id: "easy", 
    timerOn: true, 
    timerLength: 20000, 
    questionCount: 10, 
    category: "", 
    difficulty: "easy"
  },
  medium: {
    id: "medium", 
    timerOn: true, 
    timerLength: 10000, 
    questionCount: 10, 
    category: "", 
    difficulty: "medium"
  },
  hard: {
    id: "hard", 
    timerOn: true, 
    timerLength: 10000, 
    questionCount: 20, 
    category: "", 
    difficulty: "hard"
  }, 
  custom: {
    id: "custom", 
    timerOn: true, 
    timerLength: 10000, 
    questionCount: 10, 
    category: "", 
    difficulty: ""
  }, 
}

export const openTBCategories = [
  {
    text: "General Knowledge", 
    value: 9
  },
  {
    text: "Entertainment: Books", 
    value: 10
  },
  {
    text: "Entertainment: Film", 
    value: 11
  },
  {
    text: "Entertainment: Music", 
    value: 12
  },
  {
    text: "Entertainment: Musicals & Theatre", 
    value: 13
  },
  {
    text: "Entertainment: Television", 
    value: 14
  },
  {
    text: "Entertainment: Video Games", 
    value: 15
  },
  {
    text: "Entertainment: Board Games", 
    value: 16
  },
  {
    text: "Entertainment: Comics", 
    value: 29
  },
  {
    text: "Entertainment: Japanese Anime & Manga", 
    value: 31
  },
  {
    text: "Entertainment: Cartoon & Animations", 
    value: 32
  },
  {
    text: "Science & Nature", 
    value: 17
  },
  {
    text: "Science: Computers", 
    value: 18
  },
  {
    text: "Science: Mathematics", 
    value: 19
  },
  {
    text: "Science: Gadgets", 
    value: 30
  },
  {
    text: "Mythology", 
    value: 20
  },
  {
    text: "Sports", 
    value: 21
  },
  {
    text: "Geography", 
    value: 22
  },
  {
    text: "History", 
    value: 23
  },
  {
    text: "Politics", 
    value: 24
  },
  {
    text: "Art", 
    value: 25
  },
  {
    text: "Celebrities", 
    value: 26
  },
  {
    text: "Animals", 
    value: 27
  },
  {
    text: "Vehicles", 
    value: 28
  },
]