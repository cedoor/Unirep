# Unirep v1.0.0
UniRep is a private and nonrepudiable repuation system. Users can receive positive and negative reputation from attesters, and voluntarily prove that they have at least certain amount of reputation without revealing the exact amount. Moreover, users cannot refuse to receive reputation from an attester.

For more information, refer to the [documentation](https://unirep.gitbook.io/unirep/)

## Install

```
yarn install
```

## Goerli Testnet

- The address of Unirep smart contract on goerli testnet
    ```
    0x3d04278f609Ec95559f626a2be9877311ba165b0
    ```
    See [Etherscan](https://goerli.etherscan.io/address/0x3d04278f609Ec95559f626a2be9877311ba165b0)
- Apply for an account from [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/), change the `DEFAULT_ETH_PROVIDER` to the given provider url
    For example
    ```
    const DEFAULT_ETH_PROVIDER = https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}
    ```
- Get ether on the goerli testnet from [Goerli Faucet](https://faucet.goerli.mudit.blog/)

## Local Test

```
yarn test && yarn test-cli
```

## Example flow using cli commands


### 1. Spin up the testing chain

```
npx hardhat node
```
NOTE: a list of default accounts will be printed, choose one of them to be user's account and one to be attester's. User's and attester's private key will be referred to as `userPrivateKey` and `attesterPrivateKey` respectively.
- For example, choose `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` as the user's private key and `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` as the attester's private key
- Export both keys to the environment:

```bash
export USER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
export ATTESTER_PRIVATE_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

### 2. Deploy Unirep contract
```bash
npx ts-node cli/index.ts deploy -d $USER_PRIVATE_KEY
```
- NOTE: `-d` is the user's private key
```
Unirep: 0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6
```
- Then we use the Unirep contract's address to interact with. 
- Export contract address to the environment:

```bash
export UNIREP_CONTRACT_ADDRESS=0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6
```

### 3. User generates Unirep identity
```
npx ts-node cli/index.ts genUnirepIdentity
```
- base64url encoded identity and identity commitment will be printed, For example,
```
Unirep.identity.WyIzZDJlYTc1YjcxOWI1YzJiOGI2NWFmZjVjZDNjMzZkMmJiNTc3YzAwNmUzYzI3YzViNDY4NzI0MjFhMjUxYmUzIiwiYmM1ZjhlZTlmYjBkMWNhZDE4OWQyNTY0MzVlNmNmNjcyOWYxMWM1OWEzZDE3NjgwMzBmMDIxMWE2MmQ4ODgiLCJiODRiOTQzZWM3MzE2Y2IwNDhiMDdlOGQzNjIzMTMzMTM4Yjc0YzFlNWUzZTYzM2RiNTVkMjc5ODU3Njk5MCJd
Unirep.identityCommitment.MjI0NWRhYWRiOWIzMjA5OWFiMzgyODVkYWRkOTkxOTRiNGI2MzE2MTkyYjJkODAyNWVjNTE0NTlhMGNjOTY5Nw
```
- Export both identity text to the environment:

```bash
export USER_IDENTITY=Unirep.identity.WyIzZDJlYTc1YjcxOWI1YzJiOGI2NWFmZjVjZDNjMzZkMmJiNTc3YzAwNmUzYzI3YzViNDY4NzI0MjFhMjUxYmUzIiwiYmM1ZjhlZTlmYjBkMWNhZDE4OWQyNTY0MzVlNmNmNjcyOWYxMWM1OWEzZDE3NjgwMzBmMDIxMWE2MmQ4ODgiLCJiODRiOTQzZWM3MzE2Y2IwNDhiMDdlOGQzNjIzMTMzMTM4Yjc0YzFlNWUzZTYzM2RiNTVkMjc5ODU3Njk5MCJd

export IDENTITY_COMMITMENT=Unirep.identityCommitment.MjI0NWRhYWRiOWIzMjA5OWFiMzgyODVkYWRkOTkxOTRiNGI2MzE2MTkyYjJkODAyNWVjNTE0NTlhMGNjOTY5Nw
```
### 4. User signs up
- Sign up user's semaphore identity with identity commitment with the prefix `Unirep.identityCommitment`.
```bash
npx ts-node cli/index.ts userSignUp \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -d $USER_PRIVATE_KEY \
    -c $IDENTITY_COMMITMENT

```
- NOTE: `-x` is the contract address of Unirep contract, `-c` is the identity commitment

### 5. Attester signs up
```bash
npx ts-node cli/index.ts attesterSignUp \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -d $ATTESTER_PRIVATE_KEY
```
- NOTE: `-d` is attester's private key, this private key is to be used only by this attester hereafter
- The attester ID will be printed, for example
```
Attester sign up with attester id: 1
```
Export Attester Id to the environment:
```bash
export ATTESTER_ID=1
```
### 6. User generates epoch key and epoch key proof
```bash
npx ts-node cli/index.ts genEpochKeyAndProof \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -id $USER_IDENTITY  \
    -n 0
```
- NOTE: `-id` is user's identity and `-n`  is epoch key nonce which should be less than the system parameter `maxEpochKeyNonce`
- NOTE: epoch key and base64url encoded epoch key proof and public signals will be printed and they should be handed to attester to be verified, for example:
```
Epoch key of epoch 1 and nonce 0: 1255863141
Unirep.epk.proof.WyI1Mjc1ODYyNTY3NzYwNDM4ODI5NjE2OTcxMzgyNTE3MDIzODgzMDc3MDI3MzExOTE5ODQwMTQyNDQyODg4ODM4OTcwNjc0MTcyMzMyIiwiOTc2NTA4NTY3MTY4MjkzOTMzODc0MzQ0OTM5MjAyNjY1NjcxOTUyNzE1MjA2NDc5ODc3MzMxNDAyNjM0NzUxODM1NTExNjk2MTM4OSIsIjE3NzU1NzE2ODYxMjgzMzM5MzA4NzY0NDA2NDA1MjMxNjcwNjAzNDUzMTA1NTQzNzE3NjE5MjEwOTM1MTg2MTE5MDkwOTc5OTU3OTcxIiwiNzIzMTA0NDkwMzk5MzQ0MzM0NDM0MTY1NTkyOTAzNjE2MjEzNTgwOTQxNzQ2NDA1NTcyMjc5MjYzODQyNTc2NDE1MDM1MzE4MzQwOCIsIjc3Mjk3NzExNjMwNTEzOTYxNzczMjg1NjczMTc3NDA3MTAwMTI0NzEwOTI1NTAxNzIyMzU0OTc3NjgyMzI5MzUwNjExNzUzODgyIiwiMTExOTk3MjI0NDM0MzMxMDkwNTY0NjYzMTQzMzQ3MTYxNjMzODMyNTcyOTIzMjkwMDA1NTg3ODQxMTE0OTA3NDAzMTEzMTMyNzM5NzMiLCIyMTU4OTE5NTA4NjYzODY4MzY2MDMwNTAzOTgzNTk1MTA5NzMwMDE2MDA0MjI5NzUxODgwOTE2OTA3MzMwNjQ2ODMyNjM5NTczNTEyMyIsIjMxNTA1OTE3NjczNDI4NzcxMTI2OTQxMDY0NjYxNTg3NDM4NzcyOTkyMzk1MzY5ODc4MjcxMjkwMzQ2MTU5MjgxMTIyOTAwMTE2NTYiXQ
Unirep.epk.publicSignals.WyIxMDU0Njc5NTYwMzE4NjkzMzI2MTU5NTQ5NjA3ODAwMDE3MTc0NDQ4OTE0NDIwMDg2MzY0ODU4NTM4ODQxMzIzNTg5MDc5NzcyNDIyOSIsIjEiLCIxMjU1ODYzMTQxIl0
```
Export those values to the environment:

```bash
export EPOCH_KEY=1255863141
export EPOCH_KEY_PROOF=Unirep.epk.proof.WyI1Mjc1ODYyNTY3NzYwNDM4ODI5NjE2OTcxMzgyNTE3MDIzODgzMDc3MDI3MzExOTE5ODQwMTQyNDQyODg4ODM4OTcwNjc0MTcyMzMyIiwiOTc2NTA4NTY3MTY4MjkzOTMzODc0MzQ0OTM5MjAyNjY1NjcxOTUyNzE1MjA2NDc5ODc3MzMxNDAyNjM0NzUxODM1NTExNjk2MTM4OSIsIjE3NzU1NzE2ODYxMjgzMzM5MzA4NzY0NDA2NDA1MjMxNjcwNjAzNDUzMTA1NTQzNzE3NjE5MjEwOTM1MTg2MTE5MDkwOTc5OTU3OTcxIiwiNzIzMTA0NDkwMzk5MzQ0MzM0NDM0MTY1NTkyOTAzNjE2MjEzNTgwOTQxNzQ2NDA1NTcyMjc5MjYzODQyNTc2NDE1MDM1MzE4MzQwOCIsIjc3Mjk3NzExNjMwNTEzOTYxNzczMjg1NjczMTc3NDA3MTAwMTI0NzEwOTI1NTAxNzIyMzU0OTc3NjgyMzI5MzUwNjExNzUzODgyIiwiMTExOTk3MjI0NDM0MzMxMDkwNTY0NjYzMTQzMzQ3MTYxNjMzODMyNTcyOTIzMjkwMDA1NTg3ODQxMTE0OTA3NDAzMTEzMTMyNzM5NzMiLCIyMTU4OTE5NTA4NjYzODY4MzY2MDMwNTAzOTgzNTk1MTA5NzMwMDE2MDA0MjI5NzUxODgwOTE2OTA3MzMwNjQ2ODMyNjM5NTczNTEyMyIsIjMxNTA1OTE3NjczNDI4NzcxMTI2OTQxMDY0NjYxNTg3NDM4NzcyOTkyMzk1MzY5ODc4MjcxMjkwMzQ2MTU5MjgxMTIyOTAwMTE2NTYiXQ
export EPOCH_PUBLIC_SIGNALS=Unirep.epk.publicSignals.WyIxMDU0Njc5NTYwMzE4NjkzMzI2MTU5NTQ5NjA3ODAwMDE3MTc0NDQ4OTE0NDIwMDg2MzY0ODU4NTM4ODQxMzIzNTg5MDc5NzcyNDIyOSIsIjEiLCIxMjU1ODYzMTQxIl0
```


### 7. Attesters/Users verify epoch key proof
```bash
npx ts-node cli/index.ts verifyEpochKeyProof \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -pf $EPOCH_KEY_PROOF  \
    -p $EPOCH_PUBLIC_SIGNALS
```
- NOTE: `-p` is the public signals of the epoch key proof, and `-pf` is the epoch key proof


### 8. Submit epoch key proof to Unirep smart contract
```bash
npx ts-node cli/index.ts submitEpochKeyProof \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -d $USER_PRIVATE_KEY  \
    -pf $EPOCH_KEY_PROOF  \
    -p $EPOCH_PUBLIC_SIGNALS
```
- NOTE: `-d` is the user's private key here
- The proof index will be printed, for example:
```
Proof index:  2
```
- Then the epoch key with the proof index should be handed to attester to be attested.

### 9. Attester attest to epoch key
```bash
npx ts-node cli/index.ts attest \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -d $ATTESTER_PRIVATE_KEY  \
    -epk $EPOCH_KEY  \
    -i 2  \
    -pr 5  \
    -nr 4  \
    -gf 2098f5fb9e239eab3ceac3f27b81e481dc3124d55ffed523a839ee8446b64864  \
    -s 1
```
- NOTE: 
  `-d` is the attester's private key here, 
  `-epk` is the epoch key of the receiver,
  `-i` is the proof index of the epoch key,
  `-pr` (optional) is the positive reputation given to the user, 
  `-nr` (optional) is the negative reputation given to the user, 
  `-gf` (optional) is the graffiti for the reputation given to the user, 
  `-s` (optional) is the sign up flag to give to the user to indicate the attester authenticates the user's membership.

### 10. Epoch transition
```bash
npx ts-node cli/index.ts epochTransition \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -d $USER_PRIVATE_KEY  \
    -t 
```
- NOTE: `-d` private key could be anyone's private key and `-t` indicates it's testing environment so it will fast forward to the end of epoch

### 11. User state transition
```bash
npx ts-node cli/index.ts userStateTransition \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -d $USER_PRIVATE_KEY  \
    -id $USER_IDENTITY 
```

### 12. User generates reputation proof
```bash
npx ts-node cli/index.ts genReputationProof \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -id $USER_IDENTITY  \
    -a $ATTESTER_ID  \
    -mr 0  \
    -n 0
```
- NOTE: `-a` is attester's id, `-mr` is the minimum reputation score, i.e, user wants to prove that the attester gave the user a (positive reputation - negative reputation) score that's larger than the minimum reputation score, and `-gp` is the pre-image of the graffiti for the reputation
- NOTE: `-n` is the nonce of the output epoch key, it can be used to receive attestation
- NOTE: `gp` in this case, `0` being the hash pre-image of `176ff05d9c7c4528b04553217098a71cd076d52623dab894a7f7ee34116ca170`
- NOTE: proof will be printed and it should be handed to the receiver of this proof, for example,
```
Proof of reputation from attester 1:
Epoch key of the user: 3352703605
Unirep.reputation.proof.WyI4MTMwNzMxMDQ4MjgyNTkzMjc5ODE2NDYwMzA4NzYxMTU2MjYyNDU2NDk5NjA1MzY4MDc1OTIxMDgyMjcyNTAxNjE1MjI2Mzc4NDgyIiwiODE3NzgxMzU1NDIyMTg2NDYwMjYzMDU4OTI2MjQwNzY1NDc5MjczNjkwNDMzODIzMDgxMTc2MDU3MDE3MDgxNzQxMjUwNjE4MDY3MyIsIjE0NjQ5NTYxNTU4MTA5NDE1MTU5MDQ0NjM4MjYxMTEyMzE2OTU2ODkzMzE2MDI2MjExNTM4MDYxNzkwMTcxNjg1NzEzODgxNDk2NTUzIiwiNzc2NDQ3NzI3NjUzNTk4ODA3NTY4NTIzNjMzNDcxMDYyMDgyMzk2MTQxMzE0MTUzODYzMDczNTc1NTg0NjU2Mzk4NTI2MDE0NDk3MCIsIjEwNDcyNDQwNDM0MzE5NTgyMTk3ODk3ODM4MTI5NjA4OTAxNzE5MjEwMjIzOTc2NTAwMDkyMzg4NDE0NjUxNzM2Mjg4ODIxMTQ5MTYxIiwiMTU0OTE1OTEwODI1MTQ1NDIyNTUzNzQyNjY5MjA4MzU1NjUwODE2NjE4OTk1Mzc5Nzk0ODg4NzU1NTY3MDYwMzc0OTI5NTMwNTc0NDEiLCI5MTEwNTgxMjU3OTUwMTkyNDQwMzU1NTA3NjkxNTkwOTY0NDI3MzY4OTMzMzcyOTQ1MDA1MDcyMDk0NTY2NzE2NzYyNjQyMzYzNjg0IiwiMTU5MTQzNTc2ODU2NjAxMzM3NDkzMDkzNjgwMTM1MjU5MTQ2NTg2ODc4NjA5NjcxNDgwMzI2NDI4OTg3ODY0MTU5NTE4MzI4NDU5NjEiXQ
Unirep.reputation.publicSignals.WyIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMiIsIjMzNTI3MDM2MDUiLCIyMDA1MTI4MzE2MzY1MTMyMDgxODcwMDA5MzcwNzAyMjAyMDUyMDYxNDQ5NTgzNDU2Mjc5Mjc4ODg3MDQ1MDY0NjI5MjY0MTQxMzgwMCIsIjEiLCIwIiwiMCIsIjAiLCIwIl0
```

- Export those values to the environment: 
```bash
export REPUTATION_PROOF=Unirep.reputation.proof.WyI4MTMwNzMxMDQ4MjgyNTkzMjc5ODE2NDYwMzA4NzYxMTU2MjYyNDU2NDk5NjA1MzY4MDc1OTIxMDgyMjcyNTAxNjE1MjI2Mzc4NDgyIiwiODE3NzgxMzU1NDIyMTg2NDYwMjYzMDU4OTI2MjQwNzY1NDc5MjczNjkwNDMzODIzMDgxMTc2MDU3MDE3MDgxNzQxMjUwNjE4MDY3MyIsIjE0NjQ5NTYxNTU4MTA5NDE1MTU5MDQ0NjM4MjYxMTEyMzE2OTU2ODkzMzE2MDI2MjExNTM4MDYxNzkwMTcxNjg1NzEzODgxNDk2NTUzIiwiNzc2NDQ3NzI3NjUzNTk4ODA3NTY4NTIzNjMzNDcxMDYyMDgyMzk2MTQxMzE0MTUzODYzMDczNTc1NTg0NjU2Mzk4NTI2MDE0NDk3MCIsIjEwNDcyNDQwNDM0MzE5NTgyMTk3ODk3ODM4MTI5NjA4OTAxNzE5MjEwMjIzOTc2NTAwMDkyMzg4NDE0NjUxNzM2Mjg4ODIxMTQ5MTYxIiwiMTU0OTE1OTEwODI1MTQ1NDIyNTUzNzQyNjY5MjA4MzU1NjUwODE2NjE4OTk1Mzc5Nzk0ODg4NzU1NTY3MDYwMzc0OTI5NTMwNTc0NDEiLCI5MTEwNTgxMjU3OTUwMTkyNDQwMzU1NTA3NjkxNTkwOTY0NDI3MzY4OTMzMzcyOTQ1MDA1MDcyMDk0NTY2NzE2NzYyNjQyMzYzNjg0IiwiMTU5MTQzNTc2ODU2NjAxMzM3NDkzMDkzNjgwMTM1MjU5MTQ2NTg2ODc4NjA5NjcxNDgwMzI2NDI4OTg3ODY0MTU5NTE4MzI4NDU5NjEiXQ
export REPUTATION_PUBLIC_SIGNALS=Unirep.reputation.publicSignals.WyIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMiIsIjMzNTI3MDM2MDUiLCIyMDA1MTI4MzE2MzY1MTMyMDgxODcwMDA5MzcwNzAyMjAyMDUyMDYxNDQ5NTgzNDU2Mjc5Mjc4ODg3MDQ1MDY0NjI5MjY0MTQxMzgwMCIsIjEiLCIwIiwiMCIsIjAiLCIwIl0
``` 
### 13. Attesters/ Users verify the reputation proof
```bash
npx ts-node cli/index.ts verifyReputationProof \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -pf $REPUTATION_PROOF  \
    -p $REPUTATION_PUBLIC_SIGNALS
```
- NOTE: `-p` is the public signals of the reputation proof, and `-pf` is the reputation proof

### 14. User generates sign up proof
```bash
npx ts-node cli/index.ts genUserSignUpProof \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -id $USER_IDENTITY  \
    -a $ATTESTER_ID
```
- NOTE: `-a` is attester's id. If the attester gives the attestation with a sign up flag, the user can generate a sign up proof to prove the membership from the attester
- NOTE: proof will be printed and it should be handed to the receiver of this proof, for example,
```
Proof of user sign up from attester 1:
Epoch key of the user: 3352703605
Unirep.signUp.proof.WyIxNTcwMzA4NjQyNjMwMDIxNjA0MjkyMzgyODQ1NjUxODE0MDkwMDE1NDU0MjQ2MzMyMTk4NTE2OTYwMzI0NjQ0NzM2ODM1NTM1MjM2MSIsIjE2NTY2MDA2ODM1NDY5NTE2NzczMzQ1NDA5OTQ5NjgxMzg0OTk0ODE5MTU0Mzk0MTQ3NjI3MzUyMTM1MjE4MjY5Mzk4MzQ5MDMwMzU0IiwiNzg2MDAzNDQ3NzIyMDMzNjk2MzE0OTk1NDIwOTgzNzY3MzgwOTc2ODUzMjA3MzgwOTM4MzUwNzQ1NzMyNDgyNzQzOTQ5NzA3NzM3NyIsIjc5NTE1NTE3OTQ1NjAxODg2NDUzOTAwODc2Mzk1NTAxMTA4NTQ0Nzc2MzU0OTYxNTA5MzAxODA1OTE5Nzk0NjIyNjk2NTA5NjM2MTgiLCIxMjk0ODU1OTI0ODU3NjI4MDgxMjMyMzIyNjkyNjQzODcyMDU5Mzg5MTA5NzgyNjA0NDc1NTYyNzExMTQ3MzA4NDQ0NDAxODQ0MDgzNCIsIjY0MjIwNDEwMzI2NDMxMTg0NzQ0Njk2MjI1NDI2MjQyOTYyMjE2MDcwMDc2OTAyMTQ3NjAzMzk0MzQyMjI5MzkxNTgzOTcyNjg0MjUiLCIxNTU2ODI4NDc2OTIzOTYzMTQ2ODk4ODQxNTU2ODg0NDY2ODA5MTM4Njc3NDMxMzE3NzIwODA1NjQ5OTQ0ODM3NDQyMDIxNDk1Njc1MyIsIjIxODE2OTY4NjQ1MzgyMDA4MjU3ODc2NTM0OTMyODE5Nzk4MTU0NDQ3NjY1MzUwODIzNzkxOTczMzk0MDU0ODMyNDkwMzA4MDY0MzUxIl0
Unirep.signUp.publicSignals.WyIyIiwiMzM1MjcwMzYwNSIsIjIwMDUxMjgzMTYzNjUxMzIwODE4NzAwMDkzNzA3MDIyMDIwNTIwNjE0NDk1ODM0NTYyNzkyNzg4ODcwNDUwNjQ2MjkyNjQxNDEzODAwIiwiMSJd
```

Export those values to the environment:
```bash
export SIGNUP_PROOF=Unirep.signUp.proof.WyIxNTcwMzA4NjQyNjMwMDIxNjA0MjkyMzgyODQ1NjUxODE0MDkwMDE1NDU0MjQ2MzMyMTk4NTE2OTYwMzI0NjQ0NzM2ODM1NTM1MjM2MSIsIjE2NTY2MDA2ODM1NDY5NTE2NzczMzQ1NDA5OTQ5NjgxMzg0OTk0ODE5MTU0Mzk0MTQ3NjI3MzUyMTM1MjE4MjY5Mzk4MzQ5MDMwMzU0IiwiNzg2MDAzNDQ3NzIyMDMzNjk2MzE0OTk1NDIwOTgzNzY3MzgwOTc2ODUzMjA3MzgwOTM4MzUwNzQ1NzMyNDgyNzQzOTQ5NzA3NzM3NyIsIjc5NTE1NTE3OTQ1NjAxODg2NDUzOTAwODc2Mzk1NTAxMTA4NTQ0Nzc2MzU0OTYxNTA5MzAxODA1OTE5Nzk0NjIyNjk2NTA5NjM2MTgiLCIxMjk0ODU1OTI0ODU3NjI4MDgxMjMyMzIyNjkyNjQzODcyMDU5Mzg5MTA5NzgyNjA0NDc1NTYyNzExMTQ3MzA4NDQ0NDAxODQ0MDgzNCIsIjY0MjIwNDEwMzI2NDMxMTg0NzQ0Njk2MjI1NDI2MjQyOTYyMjE2MDcwMDc2OTAyMTQ3NjAzMzk0MzQyMjI5MzkxNTgzOTcyNjg0MjUiLCIxNTU2ODI4NDc2OTIzOTYzMTQ2ODk4ODQxNTU2ODg0NDY2ODA5MTM4Njc3NDMxMzE3NzIwODA1NjQ5OTQ0ODM3NDQyMDIxNDk1Njc1MyIsIjIxODE2OTY4NjQ1MzgyMDA4MjU3ODc2NTM0OTMyODE5Nzk4MTU0NDQ3NjY1MzUwODIzNzkxOTczMzk0MDU0ODMyNDkwMzA4MDY0MzUxIl0
export SIGNUP_PUBLIC_SIGNALS=Unirep.signUp.publicSignals.WyIyIiwiMzM1MjcwMzYwNSIsIjIwMDUxMjgzMTYzNjUxMzIwODE4NzAwMDkzNzA3MDIyMDIwNTIwNjE0NDk1ODM0NTYyNzkyNzg4ODcwNDUwNjQ2MjkyNjQxNDEzODAwIiwiMSJd
```
### 15. Attesters/ Users verify the sign up proof
```bash
npx ts-node cli/index.ts verifyUserSignUpProof \
    -x $UNIREP_CONTRACT_ADDRESS  \
    -pf $SIGNUP_PROOF  \
    -p $SIGNUP_PUBLIC_SIGNALS
```
- NOTE: `-p` is the public signals of the sign up proof, and `-pf` is the sign up proof
## Computation happens off-chain

After you read through the introduction above, you should have a picture of how Unirep works. User/attester registers on-chain, attester submits attestations on-chain, user submits proof to update his state and also the global state tree of current epoch in Unirep contract. These all happens on-chain, including proof verification, updating global state trees and generating epoch trees, but these computation could be very expensive!

There are no on-chain assets that required latest state of the contract in order to transfer its ownership or to apply computation on it. There's no such asset in Unirep, all you have is one's reputation and proving one's reputation does not has to be done on-chain, instead the proof is transmitted to the verifier off-chain. So there's really no need to do all these computation on-chain!

So that's why the current implementation of Unirep is taking the LazyLedger-like approach - the Unirep contract (i.e., the underlying Ethereum chain) is serving as the data availability layer and the computations including proof verification all happen on top of this data availability layer. We log every user/attester actions like register/submit attestation/submit state transition proof and the according data. Then we perform state transition off-chain according to the order of when these events took place and everyone that does the same should arrive at the exact same global state! (assuming no re-org in the underlying data availability layer)

You can take a look at [`genUserState`](https://github.com/appliedzkp/UniRep/blob/7e5cf425242134f73b6131778549b6039ea20a9b/core/utils.ts#L788) to better know how a user can fetch the events from the contract and build up the latest global state.
