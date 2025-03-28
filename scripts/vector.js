class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(other_vector) {
        return new Vector(this.x + other_vector.x, this.y + other_vector.y);
    }

    sub(other_vector) {
        return new Vector(this.x - other_vector.x, this.y - other_vector.y);
    }

    mult(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    div(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    getMag() {
        /**
         * Returns the magnitude of the current vector. 
         * This is the distance from (0, 0) to (x, y).
         */
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        /**
         * Scales the vector to have a magnitude of 1, resulting in a
         * unit vector. This new vector is returned in order to keep
         * the current vector. 
         */
        const mag = this.getMag();
        return new Vector(this.x / mag, this.y / mag);
    }

    clone() {
        return new Vector(this.x, this.y);
    }
}