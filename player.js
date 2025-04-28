class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.isJumping = false;
        this.jumpCount = 0;      // 新增：跳跃次数计数器
        this.maxJumps = 2;       // 新增：最大跳跃次数
        this.jumpForce = 0;
        this.gravity = 1.2;
        this.position = {
            x: 100,
            y: 0
        };
        this.element.style.bottom = this.position.y + 'px';
        this.element.style.left = this.position.x + 'px';
    }

    jump() {
        // 修改后：允许最多2次跳跃
        if (this.jumpCount < this.maxJumps) {
            this.isJumping = true;
            this.jumpForce = 20;
            this.jumpCount++;  // 增加跳跃计数
            
            // 添加跳跃动画效果
            this.element.style.transform = 'translateY(-5px)';
            
            // 二段跳特效（可选）
            if (this.jumpCount === 2) {
                this.element.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                setTimeout(() => {
                    this.element.style.boxShadow = 'none';
                }, 200);
            }
        }
    }

    update() {
        if (this.isJumping) {
            this.jumpForce -= this.gravity;
            this.position.y += this.jumpForce;
            
            if (this.position.y <= 0) {
                this.position.y = 0;
                this.isJumping = false;
                this.jumpCount = 0;  // 落地重置跳跃计数
                this.element.style.transform = 'translateY(0)';
            }
            
            this.element.style.bottom = this.position.y + 'px';
        }
    }

    getRect() {
        return this.element.getBoundingClientRect();
    }

    reset() {
        this.isJumping = false;
        this.jumpForce = 0;
        this.position.y = 0;
        this.element.style.bottom = '0px';
        this.element.style.transform = 'translateY(0)';
    }
}