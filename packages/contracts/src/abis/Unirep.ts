export const UnirepABI = [
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint8',
                        name: 'globalStateTreeDepth',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint8',
                        name: 'userStateTreeDepth',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint8',
                        name: 'epochTreeDepth',
                        type: 'uint8',
                    },
                ],
                internalType: 'struct UnirepTypes.TreeDepths',
                name: '_treeDepths',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'maxUsers',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'maxAttesters',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct UnirepTypes.MaxValues',
                name: '_maxValues',
                type: 'tuple',
            },
            {
                internalType: 'contract IVerifier',
                name: '_epkValidityVerifier',
                type: 'address',
            },
            {
                internalType: 'contract IVerifier',
                name: '_startTransitionVerifier',
                type: 'address',
            },
            {
                internalType: 'contract IVerifier',
                name: '_processAttestationsVerifier',
                type: 'address',
            },
            {
                internalType: 'contract IVerifier',
                name: '_userStateTransitionVerifier',
                type: 'address',
            },
            {
                internalType: 'contract IVerifier',
                name: '_reputationVerifier',
                type: 'address',
            },
            {
                internalType: 'contract IVerifier',
                name: '_userSignUpVerifier',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_numEpochKeyNoncePerEpoch',
                type: 'uint8',
            },
            {
                internalType: 'uint8',
                name: '_maxReputationBudget',
                type: 'uint8',
            },
            { internalType: 'uint256', name: '_epochLength', type: 'uint256' },
            { internalType: 'uint256', name: '_attestingFee', type: 'uint256' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epoch',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epochKey',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'attester',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'enum IUnirep.AttestationEvent',
                name: 'attestationEvent',
                type: 'uint8',
            },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'posRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'negRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'graffiti',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'signUp',
                        type: 'uint256',
                    },
                ],
                indexed: false,
                internalType: 'struct UnirepTypes.Attestation',
                name: 'attestation',
                type: 'tuple',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'toProofIndex',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'fromProofIndex',
                type: 'uint256',
            },
        ],
        name: 'AttestationSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epoch',
                type: 'uint256',
            },
        ],
        name: 'EpochEnded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'proofIndex',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epoch',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epochKey',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                indexed: false,
                internalType: 'struct UnirepTypes.EpochKeyProof',
                name: 'proof',
                type: 'tuple',
            },
        ],
        name: 'IndexedEpochKeyProof',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'proofIndex',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'inputBlindedUserState',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'outputBlindedUserState',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'outputBlindedHashChain',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256[8]',
                name: 'proof',
                type: 'uint256[8]',
            },
        ],
        name: 'IndexedProcessedAttestationsProof',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'proofIndex',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epoch',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epochKey',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'uint256[]',
                        name: 'repNullifiers',
                        type: 'uint256[]',
                    },
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'proveReputationAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'minRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'proveGraffiti',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'graffitiPreImage',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                indexed: false,
                internalType: 'struct UnirepTypes.ReputationProof',
                name: 'proof',
                type: 'tuple',
            },
        ],
        name: 'IndexedReputationProof',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'proofIndex',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'blindedUserState',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'globalStateTree',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'blindedHashChain',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256[8]',
                name: 'proof',
                type: 'uint256[8]',
            },
        ],
        name: 'IndexedStartedTransitionProof',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'proofIndex',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epoch',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epochKey',
                type: 'uint256',
            },
            {
                components: [
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'userHasSignedUp',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                indexed: false,
                internalType: 'struct UnirepTypes.SignUpProof',
                name: 'proof',
                type: 'tuple',
            },
        ],
        name: 'IndexedUserSignedUpProof',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'proofIndex',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'newGlobalStateTreeLeaf',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'epkNullifiers',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'transitionFromEpoch',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'blindedUserStates',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fromGlobalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'blindedHashChains',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fromEpochTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                indexed: false,
                internalType: 'struct UnirepTypes.UserTransitionProof',
                name: 'proof',
                type: 'tuple',
            },
            {
                indexed: false,
                internalType: 'uint256[]',
                name: 'proofIndexRecords',
                type: 'uint256[]',
            },
        ],
        name: 'IndexedUserStateTransitionProof',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epoch',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'enum IUnirep.Event',
                name: 'userEvent',
                type: 'uint8',
            },
        ],
        name: 'Sequencer',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epoch',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'identityCommitment',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'attesterId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'airdropAmount',
                type: 'uint256',
            },
        ],
        name: 'UserSignedUp',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'epoch',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'hashedLeaf',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'proofIndex',
                type: 'uint256',
            },
        ],
        name: 'UserStateTransitioned',
        type: 'event',
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'airdropAmount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'userHasSignedUp',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.SignUpProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'airdropEpochKey',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'attesterSignUp',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'attester', type: 'address' },
            { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        name: 'attesterSignUpViaRelayer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'attesters',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'attestingFee',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'beginEpochTransition',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'burnAttestingFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'collectEpochTransitionCompensation',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'collectedAttestingFee',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'currentEpoch',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'epochLength',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'epochTransitionCompensation',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        name: 'getProofIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'hasUserSignedUp',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.EpochKeyProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'hashEpochKeyProof',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'outputBlindedUserState',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputBlindedHashChain',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'inputBlindedUserState',
                type: 'uint256',
            },
            { internalType: 'uint256[8]', name: 'proof', type: 'uint256[8]' },
        ],
        name: 'hashProcessAttestationsProof',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256[]',
                        name: 'repNullifiers',
                        type: 'uint256[]',
                    },
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'proveReputationAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'minRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'proveGraffiti',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'graffitiPreImage',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.ReputationProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'hashReputationProof',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'userHasSignedUp',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.SignUpProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'hashSignUpProof',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'blindedUserState',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'blindedHashChain',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'globalStateTree',
                type: 'uint256',
            },
            { internalType: 'uint256[8]', name: 'proof', type: 'uint256[8]' },
        ],
        name: 'hashStartTransitionProof',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'newGlobalStateTreeLeaf',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'epkNullifiers',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'transitionFromEpoch',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'blindedUserStates',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fromGlobalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'blindedHashChains',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fromEpochTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.UserTransitionProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'hashUserStateTransitionProof',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [],
        name: 'latestEpochTransitionTime',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxAttesters',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxEpochKey',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxReputationBudget',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxUsers',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'nextAttesterId',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'numEpochKeyNoncePerEpoch',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'numUserSignUps',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'outputBlindedUserState',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputBlindedHashChain',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'inputBlindedUserState',
                type: 'uint256',
            },
            { internalType: 'uint256[8]', name: 'proof', type: 'uint256[8]' },
        ],
        name: 'processAttestations',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        name: 'setAirdropAmount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256[]',
                        name: 'repNullifiers',
                        type: 'uint256[]',
                    },
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'proveReputationAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'minRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'proveGraffiti',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'graffitiPreImage',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.ReputationProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'spendReputation',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'blindedUserState',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'blindedHashChain',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'globalStateTree',
                type: 'uint256',
            },
            { internalType: 'uint256[8]', name: 'proof', type: 'uint256[8]' },
        ],
        name: 'startUserStateTransition',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'posRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'negRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'graffiti',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'signUp',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct UnirepTypes.Attestation',
                name: 'attestation',
                type: 'tuple',
            },
            { internalType: 'uint256', name: 'epochKey', type: 'uint256' },
            { internalType: 'uint256', name: 'toProofIndex', type: 'uint256' },
            {
                internalType: 'uint256',
                name: 'fromProofIndex',
                type: 'uint256',
            },
        ],
        name: 'submitAttestation',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'attester', type: 'address' },
            { internalType: 'bytes', name: 'signature', type: 'bytes' },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'posRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'negRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'graffiti',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'signUp',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct UnirepTypes.Attestation',
                name: 'attestation',
                type: 'tuple',
            },
            { internalType: 'uint256', name: 'epochKey', type: 'uint256' },
            { internalType: 'uint256', name: 'toProofIndex', type: 'uint256' },
            {
                internalType: 'uint256',
                name: 'fromProofIndex',
                type: 'uint256',
            },
        ],
        name: 'submitAttestationViaRelayer',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.EpochKeyProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'submitEpochKeyProof',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'treeDepths',
        outputs: [
            {
                internalType: 'uint8',
                name: 'globalStateTreeDepth',
                type: 'uint8',
            },
            {
                internalType: 'uint8',
                name: 'userStateTreeDepth',
                type: 'uint8',
            },
            { internalType: 'uint8', name: 'epochTreeDepth', type: 'uint8' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256[8]', name: 'proof', type: 'uint256[8]' },
        ],
        name: 'unpackProof',
        outputs: [
            { internalType: 'uint256[2]', name: '', type: 'uint256[2]' },
            { internalType: 'uint256[2][2]', name: '', type: 'uint256[2][2]' },
            { internalType: 'uint256[2]', name: '', type: 'uint256[2]' },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'newGlobalStateTreeLeaf',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'epkNullifiers',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'transitionFromEpoch',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'blindedUserStates',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fromGlobalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'blindedHashChains',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fromEpochTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.UserTransitionProof',
                name: 'proof',
                type: 'tuple',
            },
            {
                internalType: 'uint256[]',
                name: 'proofIndexRecords',
                type: 'uint256[]',
            },
        ],
        name: 'updateUserStateRoot',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'identityCommitment',
                type: 'uint256',
            },
        ],
        name: 'userSignUp',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.EpochKeyProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'verifyEpochKeyValidity',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'outputBlindedUserState',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputBlindedHashChain',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'inputBlindedUserState',
                type: 'uint256',
            },
            { internalType: 'uint256[8]', name: '_proof', type: 'uint256[8]' },
        ],
        name: 'verifyProcessAttestationProof',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256[]',
                        name: 'repNullifiers',
                        type: 'uint256[]',
                    },
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'proveReputationAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'minRep',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'proveGraffiti',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'graffitiPreImage',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.ReputationProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'verifyReputation',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'blindedUserState',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'blindedHashChain',
                type: 'uint256',
            },
            { internalType: 'uint256', name: 'GSTRoot', type: 'uint256' },
            { internalType: 'uint256[8]', name: '_proof', type: 'uint256[8]' },
        ],
        name: 'verifyStartTransitionProof',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    { internalType: 'uint256', name: 'epoch', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'epochKey',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'globalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'attesterId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'userHasSignedUp',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.SignUpProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'verifyUserSignUp',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'newGlobalStateTreeLeaf',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'epkNullifiers',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'transitionFromEpoch',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'blindedUserStates',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fromGlobalStateTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'blindedHashChains',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fromEpochTree',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256[8]',
                        name: 'proof',
                        type: 'uint256[8]',
                    },
                ],
                internalType: 'struct UnirepTypes.UserTransitionProof',
                name: 'input',
                type: 'tuple',
            },
        ],
        name: 'verifyUserStateTransition',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
]