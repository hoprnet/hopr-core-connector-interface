import type HoprCoreConnector from '.'
import type * as Utils from './utils'
import type * as Types from './types'
import BN from 'bn.js'
import type { LevelUp } from 'levelup'

/**
 * This class implements the interface with no-op's and can be
 * used for unit testing.
 */
export default class MockConnector implements HoprCoreConnector {
  readonly started = true
  readonly self = {
    privateKey: new Uint8Array(),
    publicKey: new Uint8Array(),
    onChainKeyPair: {}
  }
  readonly nonce: Promise<number>
  readonly utils = new MockUtils()
  readonly types = MockTypes

  constructor(
    public db: LevelUp,
  ) {
  }

  start(): Promise<void>{
    return Promise.resolve()
  }

  stop(): Promise<void>{
    return Promise.resolve()
  }

  initOnchainValues(): Promise<void>{
    return Promise.resolve()
  }

  static async create(
    db: LevelUp,
    seed: Uint8Array,
    options?: { id?: number; provider?: string; debug?: boolean }
  ): Promise<MockConnector> {
    return Promise.resolve(new MockConnector(db));
  }

}

export class MockUtils {

  isPartyA(self: MockAccountId, counterparty: MockAccountId): boolean { return true }

  getId(self: MockAccountId, counterparty: MockAccountId, ...props: any[]): Promise<MockHash> {
    return Promise.resolve(new MockHash())
  }

  pubKeyToAccountId(pubkey: Uint8Array, ...args: any[]): Promise<MockAccountId> {
    return Promise.resolve(new MockAccountId())
  }

  hash(msg: Uint8Array): Promise<MockHash> {
    return Promise.resolve(new MockHash())
  }

  sign(msg: Uint8Array, privKey: Uint8Array, pubKey: Uint8Array): Promise<MockSignature> {
    return Promise.resolve(new MockSignature)
  }

  verify(msg: Uint8Array, signature: MockSignature, pubkey: Uint8Array): Promise<boolean>{
    return Promise.resolve(true)
  }

  convertUnit(amount: MockBalance, sourceUnit: string, targetUnit: string): MockBalance {
    return new MockBalance(amount)
  }
}


class MockBalance extends BN implements Types.Balance {
  SIZE = 100
  SYMBOL = "MOCK"
  DECIMALS = 18
}

class MockHash extends Uint8Array implements Types.Hash {}

class MockSignature extends Uint8Array implements Types.Signature{
  onChainSignature = new Uint8Array()
  signature = new Uint8Array()
  recovery = 0
  msgPrefix = new Uint8Array()
}

class MockAccountId extends Uint8Array {}

const MockTypes = {
  AccountId: MockAccountId,
  Balance: MockBalance,
  NativeBalance: MockBalance,
  Signature: MockSignature,
  Hash: MockHash
}
