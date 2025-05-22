class Obstacle {
    constructor(speed) {
        this.element = document.createElement('div');
        this.element.className = 'obstacle';
        
        // 随机高度和宽度
        this.width = Math.random() * 10 + 30;
        this.height = Math.random() * 20 + 60;
        
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        
        // 随机颜色
        const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
        this.element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        this.position = {
            x: 800,
            y: 0
        };
        
        this.speed = speed;
        this.passed = false;
        
        document.querySelector('.game-container').appendChild(this.element);
        this.updatePosition();
    }
    
    updatePosition() {
        this.position.x -= this.speed;
        this.element.style.right = (800 - this.position.x) + 'px';
    }
    
    getRect() {
        return this.element.getBoundingClientRect();
    }
    
    isOutOfScreen() {
        return this.position.x + this.width < 0;
    }
    
    remove() {
        this.element.remove();
    }
}