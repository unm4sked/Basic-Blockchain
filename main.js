const SHA256 = require('crypto-js/sha256');

class Block{

	constructor(index,timestamp,data,prevHash=''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.prevHash = prevHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(
			this.index +
			this.prevHash +
			this.timestamp +
			JSON.stringify(this.data)).toString();
	}
}

class Blockchain{

	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0,"01/01/2012","Genesis block","0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValid(){
    	for(let i = 1; i <this.chain.length; i++){
    		const currentBlock = this.chain[i];
    		const prevBlock = this.chain[i - 1];

    		if(currentBlock.hash !== currentBlock.calculateHash()){
    			return false;
    		}

    		if(currentBlock.prevHash !== prevBlock.hash){
    			return false
    		}

    	}

    	return true;
    }
}


let coin = new Blockchain();
coin.addBlock(new Block(1,"10/07/2017",{amount: 4}));
coin.addBlock(new Block(2,"11/07/2017",{amount: 41}));

console.log(JSON.stringify(coin, null, 4))

console.log("Is blockchain valid? ",coin.isValid());

coin.chain[1].data = { amount: 100};
coin.chain[1].hash = coin.chain[1].calculateHash();

console.log("Is blockchain valid? ",coin.isValid());
