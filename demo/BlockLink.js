"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sha256_1 = require("./sha256");
var util = new sha256_1.StringUtil; // 类型断言
/**
 * 区块
 */
var Block = /** @class */ (function () {
    function Block(data, previousHash) {
        this.data = data;
        this.previousHash = previousHash;
        this.timeStamp = new Date().getTime();
        this.hash = this.calculatedHash();
    }
    Block.prototype.mineBlock = function (difficulty) {
        var target = (Math.pow(10, difficulty) + "").substr(1);
        while (this.hash.substr(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculatedHash();
        }
        console.log("block mined!" + this.hash);
    };
    /**
     * 计算hash
     */
    Block.prototype.calculatedHash = function () {
        return util.applySha256(this.previousHash + this.timeStamp + this.data);
    };
    return Block;
}());
// let genesisBlock = new Block("Hi im the first block", "0")
// console.log("Hash for block 1 : " + genesisBlock.hash)
// let secondBlock = new Block("Yo im the second block", genesisBlock.hash);
// console.log("Hash for block 2 : " + secondBlock.hash);
// let thirdBlock = new Block("Hey im the third block", secondBlock.hash);
// console.log("Hash for block 3 : " + thirdBlock.hash);
var NoobChain = /** @class */ (function () {
    function NoobChain() {
        this.blockChain = [];
    }
    NoobChain.prototype.peek = function (lastIdx) {
        if (lastIdx === void 0) { lastIdx = 1; }
        return this.blockChain[this.blockChain.length - lastIdx];
    };
    /**
     * 区块完整性检查
     */
    NoobChain.prototype.isChainValid = function () {
        for (var i in this.blockChain) {
            var currentBlock = this.peek();
            var previousBlock = this.peek(2);
            if (currentBlock.hash !== currentBlock.calculatedHash()) {
                return false;
            }
            if (previousBlock.hash !== currentBlock.previousHash) {
                return false;
            }
        }
    };
    NoobChain.prototype.main = function () {
        var difficulty = 2;
        this.blockChain.push(new Block("Yo im the second block", "0"));
        console.log("Trying to Mine block 1... ");
        this.blockChain[0].mineBlock(difficulty);
        this.blockChain.push(new Block("Yo im the second block", this.peek().hash));
        console.log("Trying to Mine block 2... ");
        this.blockChain[1].mineBlock(difficulty);
        this.blockChain.push(new Block("Hey im the third block", this.peek().hash));
        console.log("Trying to Mine block 3... ");
        this.blockChain[2].mineBlock(difficulty);
        console.log(JSON.stringify(this.blockChain, null, 4));
    };
    return NoobChain;
}());
new NoobChain().main();
