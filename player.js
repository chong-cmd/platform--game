class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.isJumping = false;
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
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpForce = 20;
            this.element.style.transform = 'translateY(-5px)';
        }
    }

    update() {
        if (this.isJumping) {
            this.jumpForce -= this.gravity;
            this.position.y += this.jumpForce;
            
            if (this.position.y <= 0) {
                this.position.y = 0;
                this.isJumping = false;
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