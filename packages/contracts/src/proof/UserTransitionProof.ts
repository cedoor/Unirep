import { Circuit, Prover } from '@unirep/circuits'
import { NUM_EPOCH_KEY_NONCE_PER_EPOCH } from '@unirep/circuits/config'
import { SnarkProof } from '@unirep/crypto'
import { BigNumberish } from 'ethers'
import { BaseProof } from './BaseProof'

export class UserTransitionProof extends BaseProof {
    readonly idx: any

    public newGlobalStateTreeLeaf: BigNumberish
    public epkNullifiers: BigNumberish[]
    public transitionFromEpoch: BigNumberish
    public blindedUserStates: BigNumberish[]
    public fromGlobalStateTree: BigNumberish
    public blindedHashChains: BigNumberish[]
    public fromEpochTree: BigNumberish

    private numEpochKeyNoncePerEpoch: number

    constructor(
        _publicSignals: BigNumberish[],
        _proof: SnarkProof,
        prover?: Prover,
        numEpochKeyNoncePerEpoch = NUM_EPOCH_KEY_NONCE_PER_EPOCH
    ) {
        super(_publicSignals, _proof, prover)
        this.numEpochKeyNoncePerEpoch = numEpochKeyNoncePerEpoch
        this.idx = {
            fromGlobalStateTree: 0,
            newGlobalStateTreeLeaf: 1,
            epkNullifiers: [2, this.numEpochKeyNoncePerEpoch + 2],
            transitionFromEpoch: this.numEpochKeyNoncePerEpoch + 2,
            blindedUserStates: [
                this.numEpochKeyNoncePerEpoch + 3,
                this.numEpochKeyNoncePerEpoch + 5,
            ],
            blindedHashChains: [
                5 + this.numEpochKeyNoncePerEpoch,
                5 + 2 * this.numEpochKeyNoncePerEpoch,
            ],
            fromEpochTree: 5 + 2 * this.numEpochKeyNoncePerEpoch,
        }
        this.newGlobalStateTreeLeaf =
            _publicSignals[this.idx.newGlobalStateTreeLeaf]
        this.epkNullifiers = _publicSignals.slice(
            this.idx.epkNullifiers[0],
            this.idx.epkNullifiers[1]
        )
        this.blindedUserStates = _publicSignals.slice(
            this.idx.blindedUserStates[0],
            this.idx.blindedUserStates[1]
        )
        this.blindedHashChains = _publicSignals.slice(
            this.idx.blindedHashChains[0],
            this.idx.blindedHashChains[1]
        )
        this.transitionFromEpoch = _publicSignals[this.idx.transitionFromEpoch]
        this.fromGlobalStateTree = _publicSignals[this.idx.fromGlobalStateTree]
        this.fromEpochTree = _publicSignals[this.idx.fromEpochTree]
        this.circuit = Circuit.userStateTransition
    }
}
