new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameRunning: false,
    turns: [],
  },
  methods: {
    startGame: function () {
      this.isGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = []
    },
    attack: function () {
      this.monsterAttack();
      let damage =  this.calculateDamage(10, 3)
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hit monster by" + damage,
      });
      this.checkWin();
    },
    specialAttack: function () {
      this.monsterAttack();
      let damage = this.calculateDamage(20, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hit monster hard by' + damage,
      });
      this.checkWin();
    },
    heal: function () {
      this.monsterAttack();
      if (this.playerHealth <= 94) {
        this.playerHealth += 6;
      } else this.playerHealth = 100;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heal by 10',
      });
      this.checkWin();
    },
    giveUp: function () {
      this.startGame();
      this.isGameRunning = false;
    },
    calculateDamage: function (max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    monsterAttack: function () {
      let damage = this.calculateDamage(12, 5);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hit player by' + damage,
      });

    },
    checkWin: function () {
      if (this.playerHealth <= 0) {
        confirm('You lose, New game ?');
        this.startGame()
      } else if (this.monsterHealth <= 0) {
        confirm('You won, New game ?');
        this.startGame();
        this.isGameRunning = false;
      }
    },
  },
});
