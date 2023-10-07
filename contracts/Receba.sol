// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.21;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { SafeTransferLib } from "solady/src/utils/SafeTransferLib.sol";
import { UltraVerifier } from "@receba/circuits/contract/receba/plonk_vk.sol";
import { MerkleTreeWithHistory, FieldOverflow } from "./MerkleTreeWithHistory.sol";

contract Receba is MerkleTreeWithHistory {
  using SafeTransferLib for address payable;

  IERC721 public immutable DELIVERABLE;
  uint256 public immutable DENOMINATION;
  UltraVerifier public immutable VERIFIER;

  mapping(bytes32 commitment => bool inserted) public commitments;
  mapping(bytes32 nullifierHash => bool spent) public nullifierHashes;

  constructor(IERC721 deliverable, uint256 denomination, UltraVerifier verifier) MerkleTreeWithHistory(8) {
    DELIVERABLE = deliverable;
    DENOMINATION = denomination;
    VERIFIER = verifier;
  }

  function deposit(bytes32 commitment) external payable {
    if (msg.value != DENOMINATION) revert InvalidValue();
    if (commitments[commitment]) revert AlreadyInserted();

    commitments[commitment] = true;
    uint32 leafIndex = insert(commitment);
    emit Deposit(commitment, leafIndex);
  }

  function withdraw(
    address payable recipient,
    address payable relayer,
    uint256 fee,
    bytes32 root,
    bytes32 nullifierHash,
    bytes calldata proof
  ) external {
    if (fee > DENOMINATION) revert InvalidValue();
    if (uint256(nullifierHash) >= FIELD_SIZE) revert FieldOverflow();
    if (nullifierHashes[nullifierHash]) revert AlreadySpent();
    if (!isKnownRoot(root)) revert InvalidRoot();

    bytes32[] memory publicInputs = new bytes32[](5);
    publicInputs[0] = bytes32(uint256(uint160(address(recipient))));
    publicInputs[1] = bytes32(uint256(uint160(address(relayer))));
    publicInputs[2] = bytes32(fee);
    publicInputs[3] = root;
    publicInputs[4] = nullifierHash;
    assert(VERIFIER.verify(proof, publicInputs));

    nullifierHashes[nullifierHash] = true;
    emit Withdraw(recipient, relayer, fee, nullifierHash);

    recipient.safeTransferETH(DENOMINATION - fee);
    if (fee != 0) relayer.safeTransferETH(fee);
  }

  event Deposit(bytes32 indexed commitment, uint32 indexed leafIndex);
  event Withdraw(address indexed recipient, address indexed relayer, uint256 fee, bytes32 indexed nullifierHash);
}

error AlreadyInserted();
error AlreadySpent();
error InvalidRoot();
error InvalidFee();
error InvalidValue();

struct Location {
  uint128 latitude;
  uint128 longitude;
}
