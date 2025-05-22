class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.jumpCount = 0;           // 当前跳跃次数
        this.maxJump = 2;             // 最大跳跃次数（二段跳）
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
        if (this.jumpCount < this.maxJump) {
            this.jumpForce = 20;
            this.jumpCount++;
            this.element.style.transform = 'translateY(-5px)';
        }
    }

    update() {
        if (this.jumpForce > 0 || this.position.y > 0) {
            this.jumpForce -= this.gravity;
            this.position.y += this.jumpForce;

            if (this.position.y <= 0) {
                this.position.y = 0;
                this.jumpForce = 0;
                this.jumpCount = 0; // 落地时重置跳跃次数
                this.element.style.transform = 'translateY(0)';
            }

            this.element.style.bottom = this.position.y + 'px';
        }
    }

    getRect() {
        return this.element.getBoundingClientRect();
    }

    reset() {
        this.jumpCount = 0;
        this.jumpForce = 0;
        this.position.y = 0;
        this.element.style.bottom = '0px';
        this.element.style.transform = 'translateY(0)';
    }
}