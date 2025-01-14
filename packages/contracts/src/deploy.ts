import { ethers } from 'ethers'
import {
    MAX_USERS,
    MAX_ATTESTERS,
    NUM_EPOCH_KEY_NONCE_PER_EPOCH,
    MAX_REPUTATION_BUDGET,
    EPOCH_LENGTH,
    GLOBAL_STATE_TREE_DEPTH,
    USER_STATE_TREE_DEPTH,
    EPOCH_TREE_DEPTH,
    NUM_ATTESTATIONS_PER_PROOF,
} from '@unirep/circuits'

const ATTESTING_FEE = 0

import {
    VerifyEpochKeyVerifier,
    VerifyEpochKeyVerifier__factory,
    ProcessAttestationsVerifier,
    ProcessAttestationsVerifier__factory,
    ProveReputationVerifier,
    ProveReputationVerifier__factory,
    StartTransitionVerifier,
    StartTransitionVerifier__factory,
    Unirep,
    Unirep__factory as UnirepFactory,
    ProveUserSignUpVerifier,
    ProveUserSignUpVerifier__factory,
    UserStateTransitionVerifier,
    UserStateTransitionVerifier__factory,
} from '../typechain'

export { Unirep, UnirepFactory }

export const deployUnirep = async (
    deployer: ethers.Signer,
    _settings?: any
): Promise<Unirep> => {
    let EpochKeyValidityVerifierContract: VerifyEpochKeyVerifier
    let StartTransitionVerifierContract: StartTransitionVerifier
    let ProcessAttestationsVerifierContract: ProcessAttestationsVerifier
    let UserStateTransitionVerifierContract: UserStateTransitionVerifier
    let ReputationVerifierContract: ProveReputationVerifier
    let UserSignUpVerifierContract: ProveUserSignUpVerifier

    console.log('Deploying EpochKeyValidityVerifier')
    EpochKeyValidityVerifierContract =
        await new VerifyEpochKeyVerifier__factory(deployer).deploy()
    await EpochKeyValidityVerifierContract.deployTransaction.wait()

    console.log('Deploying StartTransitionVerifier')
    StartTransitionVerifierContract =
        await new StartTransitionVerifier__factory(deployer).deploy()
    await StartTransitionVerifierContract.deployTransaction.wait()

    console.log('Deploying ProcessAttestationsVerifier')
    ProcessAttestationsVerifierContract =
        await new ProcessAttestationsVerifier__factory(deployer).deploy()
    await ProcessAttestationsVerifierContract.deployTransaction.wait()

    console.log('Deploying UserStateTransitionVerifier')
    UserStateTransitionVerifierContract =
        await new UserStateTransitionVerifier__factory(deployer).deploy()
    await UserStateTransitionVerifierContract.deployTransaction.wait()

    console.log('Deploying ReputationVerifier')
    ReputationVerifierContract = await new ProveReputationVerifier__factory(
        deployer
    ).deploy()
    await ReputationVerifierContract.deployTransaction.wait()

    console.log('Deploying UserSignUpVerifier')
    UserSignUpVerifierContract = await new ProveUserSignUpVerifier__factory(
        deployer
    ).deploy()
    await UserSignUpVerifierContract.deployTransaction.wait()

    console.log('Deploying Unirep')
    const _maxUsers = _settings?.maxUsers ?? MAX_USERS
    const _maxAttesters = _settings?.maxAttesters ?? MAX_ATTESTERS
    const _epochLength = _settings?.epochLength ?? EPOCH_LENGTH
    const _attestingFee = _settings?.attestingFee ?? ATTESTING_FEE

    const c: Unirep = await new UnirepFactory(deployer).deploy(
        {
            globalStateTreeDepth: GLOBAL_STATE_TREE_DEPTH,
            userStateTreeDepth: USER_STATE_TREE_DEPTH,
            epochTreeDepth: EPOCH_TREE_DEPTH,
            numEpochKeyNoncePerEpoch: NUM_EPOCH_KEY_NONCE_PER_EPOCH,
            maxReputationBudget: MAX_REPUTATION_BUDGET,
            numAttestationsPerProof: NUM_ATTESTATIONS_PER_PROOF,
            epochLength: _epochLength,
            attestingFee: _attestingFee,
            maxUsers: _maxUsers,
            maxAttesters: _maxAttesters,
        },
        EpochKeyValidityVerifierContract.address,
        StartTransitionVerifierContract.address,
        ProcessAttestationsVerifierContract.address,
        UserStateTransitionVerifierContract.address,
        ReputationVerifierContract.address,
        UserSignUpVerifierContract.address
    )

    await c.deployTransaction.wait()

    // Print out deployment info
    console.log(
        '-----------------------------------------------------------------'
    )
    console.log(
        'Bytecode size of Unirep:',
        Math.floor(UnirepFactory.bytecode.length / 2),
        'bytes'
    )
    let receipt = await c.provider.getTransactionReceipt(
        c.deployTransaction.hash
    )
    console.log('Gas cost of deploying Unirep:', receipt.gasUsed.toString())
    console.log(
        '-----------------------------------------------------------------'
    )

    return c
}

export const getUnirepContract = (
    addressOrName: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
): Unirep => {
    return UnirepFactory.connect(addressOrName, signerOrProvider)
}
