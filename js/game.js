class Game {
    constructor() {
        // 游戏元素
        this.container = document.querySelector('.game-container');
        this.player = new Player();
        this.obstacles = [];
        
        // 游戏状态
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.gameSpeed = 5;
        this.isRunning = false;
        this.animationId = null;
        
        // UI 元素
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highscore');
        this.gameStartElement = document.getElementById('game-start');
        this.gameOverElement = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.restartBtn = document.getElementById('restart-btn');
        
        // 初始化
        this.highScoreElement.textContent = this.highScore;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // 统一事件处理函数
        const handleAction = (e) => {
            // 排除不需要的元素
            if (e.target.id === 'restart-btn') return;
            
            // 阻止默认行为（特别是触摸事件）
            e.preventDefault();
            
            if (!this.isRunning) {
                this.startGame();
            } else {
                this.player.jump();
            }
        };

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                handleAction(e);
            }
        });

        // 鼠标/触摸控制
        this.container.addEventListener('click', handleAction);
        this.container.addEventListener('touchstart', handleAction);
        
        // 重启按钮单独处理
        this.restartBtn.addEventListener('click', () => this.resetGame());
    }
    
    startGame() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.score = 0;
        this.gameSpeed = 5;
        this.scoreElement.textContent = this.score;
        
        // 隐藏/显示UI元素
        this.gameStartElement.style.display = 'none';
        this.gameOverElement.style.display = 'none';
        
        // 清除现有障碍物
        this.obstacles.forEach(obstacle => obstacle.remove());
        this.obstacles = [];
        
        // 重置玩家
        this.player.reset();
        
        // 开始游戏循环
        this.spawnObstacle();
        this.gameLoop();
    }
    
    gameLoop() {
        if (!this.isRunning) return;
        
        // 更新玩家状态
        this.player.update();
        
        // 更新障碍物
        this.updateObstacles();
        
        // 继续循环
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    
    updateObstacles() {
        this.obstacles.forEach((obstacle, index) => {
            obstacle.updatePosition();
            
            // 碰撞检测
            if (this.checkCollision(this.player.getRect(), obstacle.getRect())) {
                this.gameOver();
                return;
            }
            
            // 计分
            if (!obstacle.passed && obstacle.getRect().right < this.player.getRect().left) {
                obstacle.passed = true;
                this.score++;
                this.scoreElement.textContent = this.score;
                
                // 每5分增加难度
                if (this.score % 5 === 0) {
                    this.gameSpeed += 0.5;
                }
            }
            
            // 移除屏幕外的障碍物
            if (obstacle.isOutOfScreen()) {
                obstacle.remove();
                this.obstacles.splice(index, 1);
            }
        });
    }
    
    spawnObstacle() {
        if (!this.isRunning) return;
        
        this.obstacles.push(new Obstacle(this.gameSpeed));
        
        // 随机间隔生成障碍物 (1-2.5秒)
        const randomInterval = Math.random() * 1500 + 1000;
        setTimeout(() => this.spawnObstacle(), randomInterval);
    }
    
    checkCollision(playerRect, obstacleRect) {
        return (
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.top < obstacleRect.bottom
        );
    }
    
    gameOver() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
        
        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreElement.textContent = this.highScore;
            localStorage.setItem('highScore', this.highScore);
        }
        
        // 显示结束界面
        this.finalScoreElement.textContent = this.score;
        this.gameOverElement.style.display = 'block';
    }
    
    resetGame() {
        this.gameOverElement.style.display = 'none';
        this.startGame();
    }
}

// 初始化游戏
const game = new Game();