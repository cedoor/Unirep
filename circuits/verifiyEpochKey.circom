include "../node_modules/circomlib/circuits/comparators.circom";
include "./hasherPoseidon.circom";
include "./identityCommitment.circom";
include "./incrementalMerkleTree.circom";

template VerifyEpochKey(GST_tree_depth, epoch_tree_depth) {
    signal private input identity_pk[2];
    signal private input identity_nullifier;
    signal private input identity_trapdoor;

    signal private input user_state_root;

    signal private input path_elements[GST_tree_depth];
    signal private input path_index[GST_tree_depth];
    signal input root;

    signal private input nonce;
    signal input epoch;
    signal input epoch_key;

    /* Check if user exists in the Global State Tree */
    component identity_commitment = IdentityCommitment();
    identity_commitment.identity_pk[0] <== identity_pk[0];
    identity_commitment.identity_pk[1] <== identity_pk[1];
    identity_commitment.identity_nullifier <== identity_nullifier;
    identity_commitment.identity_trapdoor <== identity_trapdoor;

    component leaf = HashLeftRight();
    leaf.left <== identity_commitment.out;
    leaf.right <== user_state_root;

    component GST_leaf_exists = LeafExists(GST_tree_depth);
    GST_leaf_exists.leaf <== leaf.hash;
    for (var i = 0; i < GST_tree_depth; i++) {
        GST_leaf_exists.path_index[i] <== path_index[i];
        GST_leaf_exists.path_elements[i] <== path_elements[i];
    }
    GST_leaf_exists.root <== root;
    /* End of check*/


    /* Check nonce validity */
    var maxNonceInBits = 2;
    var maxEpochKeyNonce = 2;

    component lt = LessEqThan(maxNonceInBits);
    lt.in[0] <== nonce;
    lt.in[1] <== maxEpochKeyNonce;
    lt.out === 1;
    /* End of check*/


    /* Check epoch key is computed correctly */
    component epochKeyHasher = Hasher5();
    epochKeyHasher.in[0] <== identity_nullifier;
    epochKeyHasher.in[1] <== epoch;
    epochKeyHasher.in[2] <== nonce;
    epochKeyHasher.in[3] <== 0;
    epochKeyHasher.in[4] <== 0;
    // circom's best practices state that we should avoid using <-- unless
    // we know what we are doing. But this is the only way to perform the
    // modulo operation.
    signal epochKeyModed;
    epochKeyModed <-- epochKeyHasher.hash % (2 ** epoch_tree_depth);
    epoch_key === epochKeyModed;
    /* End of check*/
}