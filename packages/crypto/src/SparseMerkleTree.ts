import assert from 'assert'
import { hashLeftRight, hashOne, SnarkBigInt } from 'maci-crypto'

const newWrappedPoseidonT3Hash = (...elements: SnarkBigInt[]): SnarkBigInt => {
    let result: SnarkBigInt
    if (elements.length == 1) {
        result = hashOne(elements[0])
    } else if (elements.length == 2) {
        result = hashLeftRight(elements[0], elements[1])
    } else {
        throw new Error(
            `elements length should not greater than 2, got ${elements.length}`
        )
    }

    return result
}

export class SparseMerkleTree {
    protected _root: BigInt
    private zeroHashes!: BigInt[]
    private node: { [key: string]: string } = {}

    public readonly numLeaves: BigInt

    constructor(private _height: number, zeroHash: BigInt) {
        assert(_height > 0, 'SMT height needs to be > 0')
        // prevent get method returns undefined
        this._root = BigInt(0)
        this._height = _height
        this.init(zeroHash)

        this.numLeaves = BigInt(2 ** _height)
    }

    private init(zeroHash: BigInt): void {
        this.populateZeroHashesAndRoot(zeroHash)
    }

    get height() {
        return this._height
    }

    get root() {
        return this._root
    }

    public getZeroHash(index: number): BigInt {
        return this.zeroHashes[index]
    }

    public update(leafKey: BigInt, leafHash: BigInt): void {
        assert(
            leafKey < this.numLeaves,
            `leaf key ${leafKey} exceeds total number of leaves ${this.numLeaves}`
        )

        let nodeIndex = leafKey.valueOf() + this.numLeaves.valueOf()
        let nodeHash
        const nodeHashString = this.node[nodeIndex.toString()]
        if (nodeHashString === leafHash.toString()) return
        else nodeHash = leafHash

        this.node[nodeIndex.toString()] = nodeHash.toString()

        let isLeftNode = nodeIndex % BigInt(2) === BigInt(0) ? true : false
        let sibNodeIndex = isLeftNode
            ? nodeIndex + BigInt(1)
            : nodeIndex - BigInt(1)
        let sibNodeHash
        let parentNodeIndex, parentHash
        for (let i = 0; i < this.height; i++) {
            const sibNodeHashString = this.node[sibNodeIndex.toString()]
            if (!sibNodeHashString) sibNodeHash = this.zeroHashes[i]
            else sibNodeHash = BigInt(sibNodeHashString)

            parentNodeIndex = nodeIndex / BigInt(2)
            parentHash = isLeftNode
                ? newWrappedPoseidonT3Hash(nodeHash, sibNodeHash)
                : newWrappedPoseidonT3Hash(sibNodeHash, nodeHash)
            this.node[parentNodeIndex.toString()] = parentHash.toString()

            nodeIndex = parentNodeIndex
            nodeHash = parentHash
            isLeftNode = nodeIndex % BigInt(2) === BigInt(0) ? true : false
            sibNodeIndex = isLeftNode
                ? nodeIndex + BigInt(1)
                : nodeIndex - BigInt(1)
        }
        assert(nodeIndex === BigInt(1), 'Root node index must be 1')
        this._root = parentHash
    }

    public createProof(leafKey: BigInt): BigInt[] {
        assert(
            leafKey < this.numLeaves,
            `leaf key ${leafKey} exceeds total number of leaves ${this.numLeaves}`
        )

        const siblingNodeHashes: BigInt[] = []
        let nodeIndex = leafKey.valueOf() + this.numLeaves.valueOf()
        let isLeftNode = nodeIndex % BigInt(2) === BigInt(0) ? true : false
        let sibNodeIndex = isLeftNode
            ? nodeIndex + BigInt(1)
            : nodeIndex - BigInt(1)
        let sibNodeHash
        for (let i = 0; i < this.height; i++) {
            const sibNodeHashString = this.node[sibNodeIndex.toString()]
            if (!sibNodeHashString) sibNodeHash = this.zeroHashes[i]
            else sibNodeHash = BigInt(sibNodeHashString)
            siblingNodeHashes.push(sibNodeHash)

            nodeIndex = nodeIndex / BigInt(2)
            isLeftNode = nodeIndex % BigInt(2) === BigInt(0) ? true : false
            sibNodeIndex = isLeftNode
                ? nodeIndex + BigInt(1)
                : nodeIndex - BigInt(1)
        }
        assert(
            siblingNodeHashes.length == this.height,
            'Incorrect number of proof entries'
        )
        return siblingNodeHashes
    }

    public verifyProof(leafKey: BigInt, proof: BigInt[]): boolean {
        assert(
            leafKey < this.numLeaves,
            `leaf key ${leafKey} exceeds total number of leaves ${this.numLeaves}`
        )
        assert(proof.length == this.height, 'Incorrect number of proof entries')

        let nodeIndex = leafKey.valueOf() + this.numLeaves.valueOf()
        let nodeHash
        const nodeHashString = this.node[nodeIndex.toString()]
        if (!nodeHashString) nodeHash = this.zeroHashes[0]
        else nodeHash = BigInt(nodeHashString)
        let isLeftNode = nodeIndex % BigInt(2) === BigInt(0) ? true : false
        for (let sibNodeHash of proof) {
            nodeHash = isLeftNode
                ? newWrappedPoseidonT3Hash(nodeHash, sibNodeHash)
                : newWrappedPoseidonT3Hash(sibNodeHash, nodeHash)

            nodeIndex = nodeIndex / BigInt(2)
            isLeftNode = nodeIndex % BigInt(2) === BigInt(0) ? true : false
        }
        if (nodeHash === this.root) return true
        else return false
    }

    private populateZeroHashesAndRoot(zeroHash: BigInt): void {
        const hashes: BigInt[] = [zeroHash]

        for (let i = 1; i < this.height; i++) {
            hashes[i] = newWrappedPoseidonT3Hash(hashes[i - 1], hashes[i - 1])
        }

        this.zeroHashes = hashes

        this._root = newWrappedPoseidonT3Hash(
            hashes[this.height - 1],
            hashes[this.height - 1]
        )
    }
}
