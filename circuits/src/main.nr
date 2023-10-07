// SPDX-License-Identifier: AGPL-3.0
use dep::std::hash::poseidon::bn254::{hash_1, hash_2};
use crate::merkle::compute_root;
mod merkle;

fn main(
  recipient: pub Field,
  relayer: pub Field,
  fee: pub Field,
  root: pub Field,
  nullifier_hash: pub Field,
  nullifier: Field,
  secret: Field,
  index: Field,
  hash_path: [Field; 8],
) -> pub [Field; 3] {
  let commitment = hash_2([nullifier, secret]);
  assert(nullifier_hash == hash_1([nullifier]));
  assert(root == compute_root(commitment, index, hash_path));
  [recipient, relayer, fee]
}

#[test]
fn test_main() {
  let secret = 420;
  let nullifier = 69;
  let index = 0;
  let hash_path = [0x20b27c6750705c1d7d3d64d3ba12a5bbd8fd2da2c638186f8268efc44fb87f0e, 0x1ff9bcd7757de41fd8ccfe79a1423535b3132a80b5193026aefd443a14667ea8, 0x06477e81d01a57ad482a3aecfbedd3a84fc713f7a3b500102618b51d3e446b69, 0x2bc3f870f707405f8dcf1a60037680737470570f039258caf6492b5cb1f14042, 0x2a3d4a1d56795d0a8749ae2168af84347df6cdc6b68b9e0ba59ef33de8373b10, 0x2d09102b12ab9bb2e4bfb16a12766137f6d92e2366e052fd29fb89394571662c, 0x2271b8bcc95bfcc33d82ad6ffc88438a82ad4fa2f0b3831b84c556b059bc80fc, 0x1812a5f766e048c28e0b449d322547fde7b6f328554de85c6c417318a9c688f9];
  let commitment = hash_2([nullifier, secret]);
  let nullifier_hash = hash_1([nullifier]);
  let root = compute_root(commitment, index, hash_path);
  let result = main(0x11, 0x22, 33, root, nullifier_hash, nullifier, secret, index, hash_path);
  assert(result[0] == 0x11);
  assert(result[1] == 0x22);
  assert(result[2] == 33);
}
