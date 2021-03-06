var MersenneTwister = function(a) {
    void 0 == a && (a = (new Date).getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(a)
};
MersenneTwister.prototype.init_genrand = function(a) {
    for (this.mt[0] = a >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
        var a = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
        this.mt[this.mti] = (1812433253 * ((4294901760 & a) >>> 16) << 16) + 1812433253 * (65535 & a) + this.mti, this.mt[this.mti] >>>= 0
    }
}, MersenneTwister.prototype.init_by_array = function(a, b) {
    var c, d, e;
    for (this.init_genrand(19650218), c = 1, d = 0, e = this.N > b ? this.N : b; e; e--) {
        var f = this.mt[c - 1] ^ this.mt[c - 1] >>> 30;
        this.mt[c] = (this.mt[c] ^ (1664525 * ((4294901760 & f) >>> 16) << 16) + 1664525 * (65535 & f)) + a[d] + d, this.mt[c] >>>= 0, c++, d++, c >= this.N && (this.mt[0] = this.mt[this.N - 1], c = 1), d >= b && (d = 0)
    }
    for (e = this.N - 1; e; e--) {
        var f = this.mt[c - 1] ^ this.mt[c - 1] >>> 30;
        this.mt[c] = (this.mt[c] ^ (1566083941 * ((4294901760 & f) >>> 16) << 16) + 1566083941 * (65535 & f)) - c, this.mt[c] >>>= 0, c++, c >= this.N && (this.mt[0] = this.mt[this.N - 1], c = 1)
    }
    this.mt[0] = 2147483648
}, MersenneTwister.prototype.genrand_int32 = function() {
    var a, b = new Array(0, this.MATRIX_A);
    if (this.mti >= this.N) {
        var c;
        for (this.mti == this.N + 1 && this.init_genrand(5489), c = 0; c < this.N - this.M; c++) a = this.mt[c] & this.UPPER_MASK | this.mt[c + 1] & this.LOWER_MASK, this.mt[c] = this.mt[c + this.M] ^ a >>> 1 ^ b[1 & a];
        for (; c < this.N - 1; c++) a = this.mt[c] & this.UPPER_MASK | this.mt[c + 1] & this.LOWER_MASK, this.mt[c] = this.mt[c + (this.M - this.N)] ^ a >>> 1 ^ b[1 & a];
        a = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ a >>> 1 ^ b[1 & a], this.mti = 0
    }
    return a = this.mt[this.mti++], a ^= a >>> 11, a ^= a << 7 & 2636928640, a ^= a << 15 & 4022730752, a ^= a >>> 18, a >>> 0
}, MersenneTwister.prototype.genrand_int31 = function() {
    return this.genrand_int32() >>> 1
}, MersenneTwister.prototype.genrand_real1 = function() {
    return this.genrand_int32() * (1 / 4294967295)
}, MersenneTwister.prototype.random = function() {
    return this.genrand_int32() * (1 / 4294967296)
}, MersenneTwister.prototype.genrand_real3 = function() {
    return (this.genrand_int32() + .5) * (1 / 4294967296)
}, MersenneTwister.prototype.genrand_res53 = function() {
    var a = this.genrand_int32() >>> 5,
        b = this.genrand_int32() >>> 6;
    return (67108864 * a + b) * (1 / 9007199254740992)
};
MersenneTwister.prototype.nextInt = function(a) {
    if (0 >= a) return null;
    if ((a & -a) == a) {
        var b = Math.log(a) / Math.log(2);
        return this.genrand_int31() >> 31 - b
    }
    var c, d = 0;
    do c = this.genrand_int31(), d = c % a; while (0 > c - d + (a - 1));
    return d
};
