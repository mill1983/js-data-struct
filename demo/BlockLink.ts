import { StringUtil } from './sha256'

/**
 * 为StringUtil定义类型
 */
declare interface IStringUtil {
    applySha256(input: string): string
}
let util = new StringUtil as IStringUtil // 类型断言

/**
 * 区块
 */
class Block {

    hash: string
    previousHash: string
    private data: string
    private timeStamp: number
    private nonce: number

    public mineBlock(difficulty: number): void {
        let target = (Math.pow(10, difficulty) + "").substr(1)
        while (this.hash.substr(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculatedHash();
        }
        console.log("block mined!" + this.hash);
    }

    /**
     * 计算hash
     */
    calculatedHash(): string {
        return util.applySha256(this.previousHash + this.timeStamp + this.data)
    }

    constructor(data: string, previousHash: string) {
        this.data = data
        this.previousHash = previousHash
        this.timeStamp = new Date().getTime()
        this.hash = this.calculatedHash()
    }
}


// let genesisBlock = new Block("Hi im the first block", "0")
// console.log("Hash for block 1 : " + genesisBlock.hash)

// let secondBlock = new Block("Yo im the second block", genesisBlock.hash);
// console.log("Hash for block 2 : " + secondBlock.hash);

// let thirdBlock = new Block("Hey im the third block", secondBlock.hash);
// console.log("Hash for block 3 : " + thirdBlock.hash);

class NoobChain {
    public blockChain: Block[] = []

    private peek(lastIdx = 1) {
        return this.blockChain[this.blockChain.length - lastIdx]
    }
    /**
     * 区块完整性检查
     */
    public isChainValid() {
        for (let i in this.blockChain) {
            let currentBlock = this.peek()
            let previousBlock = this.peek(2)
            if (currentBlock.hash !== currentBlock.calculatedHash()) {
                return false;
            }
            if (previousBlock.hash !== currentBlock.previousHash) {
                return false;
            }
        }
    }
    main() {
        let difficulty = 2
        this.blockChain.push(new Block("Yo im the second block", "0"))
        console.log("Trying to Mine block 1... ")
        this.blockChain[0].mineBlock(difficulty)

        this.blockChain.push(new Block("Yo im the second block", this.peek().hash));
        console.log("Trying to Mine block 2... ")
        this.blockChain[1].mineBlock(difficulty)

        this.blockChain.push(new Block("Hey im the third block", this.peek().hash));
        console.log("Trying to Mine block 3... ")
        this.blockChain[2].mineBlock(difficulty)

        console.log(JSON.stringify(this.blockChain, null, 4))
    }
}

new NoobChain().main()