class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(other_x, other_y) {
        /**
         * Add other_x to x and other_y to y.
         */
        this.x += other_x;
        this.y += other_y;
    }

    addVector(other_vector) {
        /**
         * Add the passed in vector to the current vector.
         */
        this.x += other_vector.x;
        this.y += other_vector.y;
    }

    sub(other_x, other_y) {
        /**
         * Subtract other_x from x and other_y from y.
         */
        this.x -= other_x;
        this.y -= other_y;
    }

    subVector(other_vector) {
        /**
         * Subtract the passed in vector from the current vector.
         */
        this.x -= other_vector.x;
        this.y -= other_vector.y;
    }

    mult(scalar) {
        /**
         * Multiply both x and y by the scalar argument.
         */
        this.x *= scalar;
        this.y *= scalar;
    }

    getMult(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    div(scalar) {
        /**
         * Divide both x and y by the scalar argument.
         */
        if (scalar != 0) {
            this.x /= scalar;
            this.y /= scalar;
        } else {
            console.log("Cannot divide vector by 0!");
        }
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
}