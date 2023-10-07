// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.21;

import { Poseidon } from "./Poseidon.sol";

/// @author modified from tornado (https://github.com/tornadocash/tornado-core/blob/master/contracts/MerkleTreeWithHistory.sol)
abstract contract MerkleTreeWithHistory {
  uint256 public constant FIELD_SIZE = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
  uint256 public constant ZERO_VALUE = 14789368534087791069534203144842955855369356487450677079547439497078245981966; // = keccak256("receba") % FIELD_SIZE
  uint32 public constant ROOT_HISTORY_SIZE = 30;
  uint256 public immutable LEVELS;

  mapping(uint256 index => bytes32 hash) public filledSubtrees;
  mapping(uint256 index => bytes32 root) public roots;
  uint32 public currentRootIndex = 0;
  uint32 public nextIndex = 0;

  constructor(uint8 levels) {
    if (levels > 32) revert InvalidLevel();
    LEVELS = levels;
    for (uint32 i = 0; i < levels; ++i) {
      filledSubtrees[i] = zeros(i);
    }
    roots[0] = zeros(levels - 1);
  }

  function insert(bytes32 leaf) internal returns (uint32 index) {
    if (uint256(leaf) >= FIELD_SIZE) revert FieldOverflow();

    uint32 nextIndex_ = nextIndex;
    if (nextIndex_ == 2 ** LEVELS) revert FullTree();
    uint32 currentIndex = nextIndex_;
    bytes32 currentLevelHash = leaf;
    bytes32 left;
    bytes32 right;

    for (uint32 i = 0; i < LEVELS; ++i) {
      if (currentIndex % 2 == 0) {
        left = currentLevelHash;
        right = zeros(i);
        filledSubtrees[i] = currentLevelHash;
      } else {
        left = filledSubtrees[i];
        right = currentLevelHash;
      }
      currentLevelHash = Poseidon.hash(left, right);
      currentIndex >>= 1;
    }

    uint32 newRootIndex = (currentRootIndex + 1) % ROOT_HISTORY_SIZE;
    currentRootIndex = newRootIndex;
    nextIndex = nextIndex_ + 1;
    roots[newRootIndex] = currentLevelHash;
    return nextIndex_;
  }

  function isKnownRoot(bytes32 root) public view returns (bool) {
    if (root == 0) return false;
    uint32 currentRootIndex_ = currentRootIndex;
    uint32 i = currentRootIndex_;
    do {
      if (root == roots[i]) return true;
      if (i == 0) i = ROOT_HISTORY_SIZE;
      --i;
    } while (i != currentRootIndex_);
    return false;
  }

  function lastRoot() public view returns (bytes32) {
    return roots[currentRootIndex];
  }

  function zeros(uint256 i) public pure returns (bytes32) {
    if (i == 0) return 0x20b27c6750705c1d7d3d64d3ba12a5bbd8fd2da2c638186f8268efc44fb87f0e;
    else if (i == 1) return 0x1ff9bcd7757de41fd8ccfe79a1423535b3132a80b5193026aefd443a14667ea8;
    else if (i == 2) return 0x06477e81d01a57ad482a3aecfbedd3a84fc713f7a3b500102618b51d3e446b69;
    else if (i == 3) return 0x2bc3f870f707405f8dcf1a60037680737470570f039258caf6492b5cb1f14042;
    else if (i == 4) return 0x2a3d4a1d56795d0a8749ae2168af84347df6cdc6b68b9e0ba59ef33de8373b10;
    else if (i == 5) return 0x2d09102b12ab9bb2e4bfb16a12766137f6d92e2366e052fd29fb89394571662c;
    else if (i == 6) return 0x2271b8bcc95bfcc33d82ad6ffc88438a82ad4fa2f0b3831b84c556b059bc80fc;
    else if (i == 7) return 0x1812a5f766e048c28e0b449d322547fde7b6f328554de85c6c417318a9c688f9;
    else if (i == 8) return 0x26b7d439314c1101ccba00d997ebc316d9ea7f84e6a870f522fc3a7271f8f40f;
    else if (i == 9) return 0x28670e46e3e68da6783e88ee744148125bae04d5ff1310c297e91e9feac099c7;
    else if (i == 10) return 0x1456d91c08c49db11a3baa1b5ea2ea2ba9ab4087fcbdc9bfef5ee6c78897d371;
    else if (i == 11) return 0x05050a34f017642c04435348c44fa8a594b28052d47102534b4fae278e1dd484;
    else if (i == 12) return 0x1db004f66d9f4dbb2262dff5100127e2094b7967d4f4a727230cc72c4286329a;
    else if (i == 13) return 0x0fdce35f1c9aeb4b2f08124c6a7bb378a6a0b06468f7a6e403e43f2cdad5f397;
    else if (i == 14) return 0x2d930f785c54791032ed0a23bfc1f935e88c408dd4a1d35692bb00740f441d82;
    else if (i == 15) return 0x1a9ca3445ff82d31e7f7771a105079e9df4f67cb23615ae0b7081caecbdc5eb3;
    else if (i == 16) return 0x21f3885b2f56b8aa5c4babf2b83076308b4561a9af150adfb62e94fd56baaca0;
    else if (i == 17) return 0x2d07775565fe64cd24a2063d0cdbb8a0314e9e30e11be2fd2edb1e9bac831f2e;
    else if (i == 18) return 0x03559388471591276d58713cd692bb5a3d6939761e72899fe22a0e484a144159;
    else if (i == 19) return 0x0d820dd92ebac62c9e9a45a9965f2d74952773d95f540ef423fdbf2db15f6f10;
    else if (i == 20) return 0x013b486fdfe2458cd376ae0c6d93758d0d68497ebb8d2301f261e6ba541eaa2b;
    else if (i == 21) return 0x15f77945b225c1140db94532bb98a6e56c33bfadf1d8de46909949410590bad1;
    else if (i == 22) return 0x0f2b99784ca7f7a0b12026ada700937acc61cdcbd60015b7b98b19b419776fb0;
    else if (i == 23) return 0x125bef9fd271c7e80592f4443d4b8bca4da0e6981030f5edd053cdbc13dd3314;
    else if (i == 24) return 0x03a5f22e7657928a039bd6879aba619b46ea95b0bfc543b12a69c40f287ca50b;
    else if (i == 25) return 0x249d1550c266802254391b29f2420d4fd6de26c2852878666030c3ea15f8405f;
    else if (i == 26) return 0x02d974a7f28a27cb5c84800814eced585ba30e7ceef8cf55da5e3393053376ef;
    else if (i == 27) return 0x2bcffe57a6de4431e031917a9fe49caa34c3f2ad60f4f61530854b0611a573e9;
    else if (i == 28) return 0x2408804108b892cef0945f7091026ad757d26662192c2bb6262a4749e1acd105;
    else if (i == 29) return 0x01b9687125c34c4b02adbbaea306112bebbd9c0e2f96adcdf50632a0905639e3;
    else if (i == 30) return 0x1eacb24c41bbddadfe0feab68a196f4525c1b5512359825680ec527eed62b1a5;
    else if (i == 31) return 0x246c192ae53614a9a4fcf4dc24f2e198fca7539ae3d779cd592360fc0ea9d479;
    else revert InvalidLevel();
  }
}

error FullTree();
error InvalidLevel();
error FieldOverflow();
